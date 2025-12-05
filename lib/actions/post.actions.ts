"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import Post from "@/lib/database/models/post.model";
import { handleError, isActionError } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { ServerActionResponse } from "@/types";
import { Mode, PostCategoryEnum, UserRoleEnum } from "@/types/enums";
import {
  PostCreateInput,
  PostDTO,
  PostDTOPopulatedUser,
  PostUpdateInput,
  toPostDTO,
  toPostPopulatedUserDTO,
} from "@/types/post.types";
import { Vote, VoteAction, VoteValue } from "@/types/vote.types";

import { connectToDB } from "../database";
import commentModel from "../database/models/comment.model";
import reportModel from "../database/models/report.model";
import voteModel from "../database/models/vote.model";
import { getUserByClerkId, getUserByUsername } from "./user.actions";

export async function createPost(post: PostCreateInput): Promise<ServerActionResponse<PostDTO>> {
  try {
    await connectToDB();
    const user = await currentUser();
    const userRole = user?.publicMetadata.role as UserRoleEnum;

    if (!user) {
      return handleError("You must be logged in to perform this action.");
    }

    const databaseUser = await getUserByClerkId(user.id);

    if (isActionError(databaseUser) || !databaseUser) {
      return handleError("User Not Found.");
    }

    if (!!post?.isAdminCreated && userRole !== UserRoleEnum.ADMIN && userRole !== UserRoleEnum.PRIMARY_ADMIN) {
      return handleError("You're not allowed to create this post");
    }

    const userId = post.userId;

    if (!userId) {
      return handleError("You didn't pass userId.");
    }

    if (databaseUser._id.toString() !== userId) {
      return handleError("You're not allowed to create this post.");
    }

    const newPost = await Post.create({ ...post, userId: new Types.ObjectId(userId) });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send/notifications/new-post`, {
        body: JSON.stringify({
          postId: newPost._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }

    return toPostDTO(newPost.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function getPostById(
  id: Types.ObjectId | string
): Promise<ServerActionResponse<PostDTOPopulatedUser | null>> {
  try {
    await connectToDB();

    const post = await Post.findById(id)
      .populate({
        path: "userId",
        model: "User",
        select: "_id username photo email",
      })
      .exec();

    if (!post) return handleError("Post not found.");

    const postObj = post.toObject();

    postObj.user = postObj.userId;
    postObj.userId = postObj.user?._id?.toString();

    // Add userVote
    const { sessionClaims } = await auth();
    const currentUserId = (sessionClaims?.metadata as { userId?: string })?.userId;

    if (currentUserId) {
      const vote = await voteModel
        .findOne({
          postId: post._id,
          userId: currentUserId,
        })
        .lean<Vote>();

      postObj.userVote = vote?.value ?? null;
    } else {
      postObj.userVote = null;
    }

    // Add commentsCount
    const commentsCount = await commentModel.countDocuments({
      postId: post._id,
    });

    postObj.commentsCount = commentsCount;

    return toPostPopulatedUserDTO(postObj);
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function updatePostById(
  postId: Types.ObjectId | string,
  postUpdate: PostUpdateInput,
  reloadPath?: string
): Promise<ServerActionResponse<PostDTO | null>> {
  try {
    await connectToDB();
    const user = await currentUser();
    const userRole = user?.publicMetadata.role as UserRoleEnum;

    if (!user) {
      return handleError("You must be logged in to update a post.");
    }

    const databaseUser = await getUserByClerkId(user.id);

    if (isActionError(databaseUser) || !databaseUser) {
      return handleError("Authenticated user not found in the database.");
    }

    if (!!postUpdate?.isAdminCreated && userRole !== UserRoleEnum.ADMIN && userRole !== UserRoleEnum.PRIMARY_ADMIN) {
      return handleError("You're not allowed to update this post");
    }

    const { userId, ...postData } = postUpdate;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: postData },
      { new: true, runValidators: true }
    ).exec();

    if (reloadPath) {
      revalidatePath(reloadPath);
    }

    if (!updatedPost) return handleError("Failed to update the post.");
    return toPostDTO(updatedPost.toObject());
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function deletePostById(postId: string, userId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const authUser = await currentUser();

    if (!authUser) {
      return handleError("You must be logged in to delete a post.");
    }

    const post = await Post.findById(postId).populate({ path: "userId", model: "User", select: "_id" }).exec();

    if (!post) {
      return handleError("Post not found.");
    }
    if (
      post.userId?._id?.toString() !== userId.toString() &&
      authUser.publicMetadata.role !== UserRoleEnum.ADMIN &&
      authUser.publicMetadata.role !== UserRoleEnum.PRIMARY_ADMIN
    ) {
      return handleError("You're not allowed to delete this post.");
    }

    const dbUser = await getUserByClerkId(authUser.id);
    if (isActionError(dbUser) || !dbUser) {
      return handleError("Authenticated user not found in the database.");
    }

    if (dbUser._id.toString() !== userId.toString()) {
      return handleError("You're not allowed to delete this post.");
    }

    // Find all comments for this post
    const comments = await commentModel.find({ postId }).select("_id").lean();
    const commentIds = comments.map((c) => c._id);

    // Find all replies to these comments
    const replies = await commentModel
      .find({ parentId: { $in: commentIds } })
      .select("_id")
      .lean();
    const replyIds = replies.map((r) => r._id);

    const allCommentIds = [...commentIds, ...replyIds];

    // Delete comments and replies
    await commentModel.deleteMany({ _id: { $in: allCommentIds } });

    // Delete all votes for the post
    await voteModel.deleteMany({ postId });

    await reportModel.deleteMany({ postId });

    // Delete all votes for comments and replies
    await voteModel.deleteMany({ commentId: { $in: allCommentIds } });

    // Delete the post
    const deletion = await Post.findByIdAndDelete(postId).exec();
    if (!deletion) {
      return handleError("Failed to delete the post.");
    }

    return true;
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

export async function adminDeletePostById(postId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const { sessionClaims, userId } = await auth();
    if (!userId) {
      return handleError("You must be logged in to delete a post.");
    }

    const currentUserRole = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;

    if (currentUserRole !== UserRoleEnum.ADMIN && currentUserRole !== UserRoleEnum.PRIMARY_ADMIN) {
      return handleError("You're not allowed to get users.");
    }

    const post = await Post.findById(postId).populate({ path: "userId", model: "User", select: "_id" }).exec();

    if (!post) {
      return handleError("Post not found.");
    }

    // Find all comments for this post
    const comments = await commentModel.find({ postId }).select("_id").lean();
    const commentIds = comments.map((c) => c._id);

    // Find all replies to these comments
    const replies = await commentModel
      .find({ parentId: { $in: commentIds } })
      .select("_id")
      .lean();
    const replyIds = replies.map((r) => r._id);

    const allCommentIds = [...commentIds, ...replyIds];

    // Delete comments and replies
    await commentModel.deleteMany({ _id: { $in: allCommentIds } });

    // Delete all votes for the post
    await voteModel.deleteMany({ postId });

    // Delete all votes for comments and replies
    await voteModel.deleteMany({ commentId: { $in: allCommentIds } });

    // Delete the post
    const deletion = await Post.findByIdAndDelete(postId).exec();
    if (!deletion) {
      return handleError("Failed to delete the post.");
    }

    revalidatePath(Routes.ADMIN_POSTS);

    return true;
  } catch (error) {
    return handleError(error);
  }
}

interface GetPostsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  username?: string;
}

interface GetPostsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  username?: string;
  currentUser?: string;
  populateCommentsCount?: boolean;
  popular?: boolean;
  category?: PostCategoryEnum;
  type?: Mode | null;
  isAdminCreated?: boolean;
  isBulletin?: boolean;
  populateComments?: boolean;
  query?: string;
}

export async function getAllPosts<T extends boolean = false>(
  options?: GetPostsOptions & { populateUser?: T; populateCommentsCount?: boolean }
): Promise<
  ServerActionResponse<{
    posts: T extends true ? PostDTOPopulatedUser[] : PostDTO[];
    total: number;
    page: number;
    limit: number;
  }>
> {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const limit = options?.limit && options.limit > 0 ? options.limit : 10;
  const sortBy = options?.sortBy || "createdAt";
  const sortOrder = options?.sortOrder === "asc" ? 1 : -1;
  const isBulletin = options?.isBulletin || false;

  try {
    await connectToDB();

    const filters: Record<string, any> = {};

    const { sessionClaims } = await auth();
    const currentUserId = (sessionClaims?.metadata as { userId?: string })?.userId;

    if (options?.username) {
      const user = await getUserByUsername(options.username);
      if (!user || isActionError(user)) return handleError("User not found.");
      filters.userId = new Types.ObjectId(user._id);
    }

    if (options?.type) {
      filters.type = options.type;
    }

    if (options?.category) {
      filters.category = options.category;
    }

    if (options?.isAdminCreated) {
      filters.isAdminCreated = true;
    }

    if (options?.query) {
      const queryRegex = new RegExp(options.query, "i");
      filters.$or = [{ title: { $regex: queryRegex } }, { content: { $regex: queryRegex } }];
    }

    if (isBulletin) {
      filters.isBulletin = true;
    } else {
      filters.isBulletin = { $ne: true };
    }

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filters).exec();

    const aggregation: any[] = [];

    if (Object.keys(filters).length > 0) {
      aggregation.push({ $match: filters });
    }

    aggregation.push({
      $addFields: {
        voteScore: { $subtract: ["$upVotes", "$downVotes"] },
      },
    });

    aggregation.push({
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "allComments",
      },
    });
    aggregation.push({
      $addFields: {
        commentsCount: { $size: "$allComments" },
      },
    });
    if (options?.populateComments) {
      aggregation.push({
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$postId", "$$postId"] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                content: 1,
                createdAt: 1,
                parentId: 1,
                upVotes: 1,
                downVotes: 1,
                user: { _id: 1, username: 1, photo: 1 },
              },
            },
          ],
          as: "latestComments",
        },
      });
    }

    aggregation.push({
      $lookup: {
        from: "reports",
        localField: "_id",
        foreignField: "postId",
        as: "reports",
      },
    });
    aggregation.push({
      $addFields: {
        reportsCount: { $size: "$reports" },
      },
    });

    aggregation.push({
      $project: {
        allComments: 0,
        reports: 0,
      },
    });

    if (options?.populateUser) {
      aggregation.push(
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        }
      );
    }

    if (options?.popular) {
      aggregation.push({
        $addFields: {
          popularityScore: {
            $add: [{ $subtract: ["$upVotes", "$downVotes"] }, "$commentsCount"],
          },
        },
      });

      aggregation.push({ $sort: { popularityScore: -1 } });
    } else {
      aggregation.push({ $sort: { [sortBy]: sortOrder } });
    }

    aggregation.push({ $skip: skip }, { $limit: limit });

    let posts = await Post.aggregate(aggregation);

    posts = posts.map((item) => ({
      ...item,
      _id: item._id.toString(),
      userId: item.userId?.toString(),
      latestComments: item.latestComments
        ? item.latestComments.map((item: any) => JSON.parse(JSON.stringify(item)))
        : [],
    }));

    // Attach user vote
    if (currentUserId) {
      const postIds = posts.map((p) => p._id);
      const votes = await voteModel
        .find({
          userId: currentUserId,
          postId: { $in: postIds },
        })
        .lean();

      const voteMap = new Map(votes.map((v) => [v.postId.toString(), v.value]));

      posts = posts.map((post) => ({
        ...post,
        userVote: voteMap.get(post._id) ?? null,
      }));
    }

    const postDTOs = posts.map((post) => (options?.populateUser ? toPostPopulatedUserDTO(post) : toPostDTO(post)));

    return {
      posts: postDTOs as T extends true ? PostDTOPopulatedUser[] : PostDTO[],
      total,
      page,
      limit,
    };
  } catch (error) {
    console.log("Error in getAllPosts:", error);
    return handleError(error);
  }
}

export async function voteOnPost(postId: string, voteValue: VoteValue): Promise<ServerActionResponse<VoteAction>> {
  try {
    await connectToDB();

    const authUser = await currentUser();
    if (!authUser) return handleError("You must be logged in to vote.");

    const dbUser = await getUserByClerkId(authUser.id);
    if (!dbUser || isActionError(dbUser)) {
      return handleError("User not found in the database.");
    }

    const userId = dbUser._id.toString();

    const post = await Post.findById(postId);
    if (!post) return handleError("Post not found.");

    const existingVote = await voteModel.findOne({ userId, postId });

    let action: VoteAction = "voted";

    if (!existingVote) {
      // First-time vote
      await voteModel.create({ userId, postId, value: voteValue });
      voteValue === 1 ? post.upVotes++ : post.downVotes++;
    } else if (existingVote.value === voteValue) {
      // Toggle off vote (unvote)
      await voteModel.findByIdAndDelete(existingVote._id);
      voteValue === 1 ? post.upVotes-- : post.downVotes--;
      action = "unvoted";
    } else {
      // Change vote direction
      existingVote.value = voteValue;
      await existingVote.save();

      if (voteValue === 1) {
        post.upVotes++;
        post.downVotes--;
      } else {
        post.downVotes++;
        post.upVotes--;
      }
      action = "changed";
    }

    await post.save();

    return action;
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

