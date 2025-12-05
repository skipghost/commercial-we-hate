import { Types } from "mongoose";

import { VoteValue } from "./vote.types";

export type Comment = {
  _id: Types.ObjectId;
  postId: Types.ObjectId;
  userId: string | CommentUserDTO;
  content: string;
  parentId?: string;
  upVotes: number;
  downVotes: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentCreateInput = Omit<Comment, "_id" | "upVotes" | "downVotes" | "createdAt" | "updatedAt">;

export type CommentUpdateInput = Partial<Omit<Comment, "_id" | "upVotes" | "downVotes" | "createdAt" | "updatedAt">>;

export type CommentDTO = {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
  upVotes: number;
  downVotes: number;
  createdAt: Date;
  updatedAt: Date;
};

// When user is populated
export type CommentUserDTO = {
  _id: string;
  username: string;
  photo?: string;
};

// Full comment DTO with populated user and optional vote
export type CommentDTOPopulatedUser = CommentDTO & {
  user: CommentUserDTO;
  userVote?: VoteValue | null;
};

// Conversion functions
export function toCommentDTO(comment: Comment): CommentDTO {
  return {
    _id: comment._id.toString(),
    postId: comment.postId.toString(),
    userId: typeof comment.userId === "string" ? comment.userId : comment.userId._id.toString(),
    content: comment.content,
    parentId: comment.parentId?.toString(),
    upVotes: comment.upVotes,
    downVotes: comment.downVotes,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

export function toCommentPopulatedUserDTO(
  comment: Comment & { userId: CommentUserDTO; userVote?: VoteValue | null }
): CommentDTOPopulatedUser {
  return {
    _id: comment._id.toString(),
    postId: comment.postId.toString(),
    userId: comment.userId._id.toString(),
    content: comment.content,
    parentId: !!comment.parentId ? comment.parentId.toString() : comment.parentId,
    upVotes: comment.upVotes,
    downVotes: comment.downVotes,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    user: {
      _id: comment.userId._id.toString(),
      username: comment.userId.username,
      photo: comment.userId.photo,
    },
    userVote: comment.userVote ?? null,
  };
}

