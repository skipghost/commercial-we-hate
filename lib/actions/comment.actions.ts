"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";

import { connectToDB } from "@/lib/database";
import CommentModel from "@/lib/database/models/comment.model";
import voteModel from "@/lib/database/models/vote.model";
import { handleError, isActionError } from "@/lib/utils";

import { ServerActionResponse } from "@/types";
import {
  Comment,
  CommentDTO,
  CommentDTOPopulatedUser,
  CommentUserDTO,
  toCommentDTO,
  toCommentPopulatedUserDTO,
} from "@/types/comment.types";
import { VoteAction, VoteValue } from "@/types/vote.types";

import { getUserByClerkId } from "./user.actions";

export async function createComment({
  postId,
  content,
  parentId,
}: {
  postId: string;
  content: string;
  parentId?: string;
}): Promise<ServerActionResponse<CommentDTOPopulatedUser>> {
  try {
    await connectToDB();
    const user = await currentUser();
    if (!user) return handleError("You must be logged in to comment.");

    const dbUser = await getUserByClerkId(user.id);
    if (!dbUser || isActionError(dbUser)) return handleError("User not found.");

    const createdComment = await CommentModel.create({
      postId,
      userId: dbUser._id,
      content,
      parentId: parentId || null,
      upVotes: 0,
      downVotes: 0,
    });

    // Populate user info on the created comment
    const populatedComment = await CommentModel.findById(createdComment._id)
      .populate({
        path: "userId",
        model: "User",
        select: "_id username photo",
      })
      .lean();

    if (!populatedComment) return handleError("Failed to retrieve the created comment.");

    // Assert type for DTO converter safely
    const commentWithUser = populatedComment as unknown as Comment & {
      userId: CommentUserDTO;
      userVote?: VoteValue | null;
    };

    if (parentId || postId) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send/notifications/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            commentId: createdComment._id.toString(),
            commenterUsername: commentWithUser.userId?.username,
            commentText: commentWithUser.content,
          }),
        });

        await res.json();
      } catch (err) {
        console.error("Failed to send comment notification:", err);
      }
    }

    return toCommentPopulatedUserDTO({
      ...commentWithUser,
      userVote: null, // no vote yet
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function updateCommentById({
  postId,
  commentId,
  content,
}: {
  postId: string;
  commentId: string;
  content: string;
  parentId?: string;
}): Promise<ServerActionResponse<CommentDTOPopulatedUser>> {
  try {
    await connectToDB();
    const user = await currentUser();
    if (!user) return handleError("You must be logged in to comment.");

    const dbUser = await getUserByClerkId(user.id);
    if (!dbUser || isActionError(dbUser)) return handleError("User not found.");

    if (!commentId) return handleError("Comment ID not found.");
    if (!content || content.trim().length === 0) {
      return handleError("Comment content cannot be empty.");
    }

    const existingComment = await CommentModel.findById(commentId);
    if (!existingComment) return handleError("Comment not found.");

    if (existingComment.userId !== dbUser._id) {
      return handleError("You are not authorized to update this comment.");
    }

    if (existingComment.postId !== postId) {
      return handleError("Comment does not belong to the specified post.");
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true })
      .populate({
        path: "userId",
        model: "User",
        select: "_id username photo",
      })
      .lean();

    if (!updatedComment) return handleError("Failed to retrieve the updated comment.");

    const commentWithUser = updatedComment as unknown as Comment & {
      userId: CommentUserDTO;
      userVote?: VoteValue | null;
    };

    return toCommentPopulatedUserDTO({
      ...commentWithUser,
      userVote: null,
    });
  } catch (error) {
    console.error("Update comment error:", error);
    return handleError(error);
  }
}

export async function voteOnComment({
  commentId,
  voteValue,
}: {
  commentId: string;
  voteValue: VoteValue;
}): Promise<ServerActionResponse<VoteAction>> {
  try {
    await connectToDB();

    const user = await currentUser();
    if (!user) return handleError("You must be logged in to vote.");

    const dbUser = await getUserByClerkId(user.id);
    if (!dbUser || isActionError(dbUser)) return handleError("User not found.");

    const userId = dbUser._id.toString();

    const comment = await CommentModel.findById(commentId);
    if (!comment) return handleError("Comment not found.");

    const existingVote = await voteModel.findOne({ userId, commentId });
    let action: VoteAction = "voted";

    if (!existingVote) {
      await voteModel.create({ userId, commentId, value: voteValue, postId: undefined });
      voteValue === 1 ? comment.upVotes++ : comment.downVotes++;
    } else if (existingVote.value === voteValue) {
      await voteModel.findByIdAndDelete(existingVote._id);
      voteValue === 1 ? comment.upVotes-- : comment.downVotes--;
      action = "unvoted";
    } else {
      existingVote.value = voteValue;
      await existingVote.save();

      if (voteValue === 1) {
        comment.upVotes++;
        comment.downVotes--;
      } else {
        comment.downVotes++;
        comment.upVotes--;
      }
      action = "changed";
    }

    await comment.save();
    return action;
  } catch (error) {
    return handleError(error);
  }
}

export async function getPostComments<T extends boolean = false>(
  postId: string,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "upVotes" | "downVotes";
    sortOrder?: "asc" | "desc";
    populateUser?: T;
  }
): Promise<
  ServerActionResponse<{
    comments: T extends true ? CommentDTOPopulatedUser[] : CommentDTO[];
    total: number;
    page: number;
    limit: number;
  }>
> {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const limit = options?.limit && options.limit > 0 ? options.limit : 10;
  const sortBy = options?.sortBy || "createdAt";
  const sortOrder = options?.sortOrder === "asc" ? 1 : -1;

  try {
    await connectToDB();

    const { sessionClaims } = await auth();
    const currentUserId = (sessionClaims?.metadata as { userId?: string })?.userId;

    const filters = { postId: new mongoose.Types.ObjectId(postId) };
    const skip = (page - 1) * limit;

    const query = CommentModel.find(filters);

    if (options?.populateUser) {
      query.populate({
        path: "userId",
        model: "User",
        select: "username photo _id",
      });
    }

    let [comments, total] = await Promise.all([
      query
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .exec(),
      CommentModel.countDocuments(filters).exec(),
    ]);

    if (currentUserId) {
      const commentIds = comments.map((c) => c._id);
      const votes = await voteModel
        .find({
          userId: currentUserId,
          commentId: { $in: commentIds },
        })
        .lean();

      const voteMap = new Map(votes.map((v) => [v.commentId.toString(), v.value]));

      comments = comments.map((doc) => {
        const comment = doc.toObject();
        comment.userVote = voteMap.get(comment._id.toString()) ?? null;
        return comment;
      });
    } else {
      comments = comments.map((doc) => doc.toObject());
    }

    const commentDTOs = comments.map((comment) =>
      options?.populateUser ? toCommentPopulatedUserDTO(comment) : toCommentDTO(comment)
    );

    return {
      comments: commentDTOs as T extends true ? CommentDTOPopulatedUser[] : CommentDTO[],
      total,
      page,
      limit,
    };
  } catch (error) {
    handleError(error);
    return { comments: [], total: 0, page, limit };
  }
}

export async function deleteComment(commentId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const user = await currentUser();
    if (!user) return handleError("You must be logged in to delete a comment.");

    const dbUser = await getUserByClerkId(user.id);
    if (!dbUser || isActionError(dbUser)) return handleError("User not found.");

    const comment = await CommentModel.findById(commentId);
    if (!comment) return handleError("Comment not found.");

    if (comment.userId.toString() !== dbUser._id.toString()) {
      return handleError("You are not authorized to delete this comment.");
    }

    await voteModel.deleteMany({ commentId });

    // Find replies
    const replies = await CommentModel.find({ parentId: commentId });
    const replyIds = replies.map((reply) => reply._id);

    // Delete votes on replies
    if (replyIds.length > 0) {
      await voteModel.deleteMany({ commentId: { $in: replyIds } });
    }

    // Delete replies
    await CommentModel.deleteMany({ parentId: commentId });

    // Delete the main comment
    await CommentModel.findByIdAndDelete(commentId);

    return true;
  } catch (error) {
    return handleError(error);
  }
}

