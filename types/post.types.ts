import { Types } from "mongoose";

import { CommentDTOPopulatedUser } from "./comment.types";
import { Mode, PostCategoryEnum } from "./enums";
import { VoteValue } from "./vote.types";

export type Post = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  user?: PostUserDTO;
  commentsCount?: number;
  reportsCount?: number;
  title: string;
  category: PostCategoryEnum;
  isDraft?: boolean;
  url?: string;
  videoUrl?: string;
  content?: string;
  upVotes: number;
  downVotes: number;
  slug: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  type: Mode | null;
  isAdminCreated?: boolean;
  isBulletin?: boolean;
  isPinned?: boolean;
  latestComments?: CommentDTOPopulatedUser[];
};

export type PostCreateInput = {
  userId: string;
  user?: PostUserDTO;
  commentsCount?: number;
  reportsCount?: number;
  title: string;
  category?: PostCategoryEnum;
  isDraft?: boolean;
  url?: string;
  videoUrl?: string;
  content?: string;
  type: Mode | null;
  isAdminCreated?: boolean;
  isBulletin?: boolean;
  isPinned?: boolean;
};

export type PostUpdateInput = Partial<PostCreateInput>;

export type BasePostDTO = {
  _id: string;
  title: string;
  category: PostCategoryEnum;
  isDraft?: boolean;
  url?: string;
  videoUrl?: string;
  content?: string;
  upVotes: number;
  downVotes: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  type: Mode | null;
  isAdminCreated?: boolean;
  isPinned?: boolean;
  latestComments?: CommentDTOPopulatedUser[];
};
export type PostDTO = BasePostDTO & {
  userId: string;
};

export type PostUserDTO = {
  username: string;
  email: string;
  photo: string;
  _id: string;
};

export type PostDTOPopulatedUser = {
  _id: string;
  userId: string;
  user?: PostUserDTO;
  commentsCount?: number;
  reportsCount?: number;
  title: string;
  category: PostCategoryEnum;
  isDraft?: boolean;
  url?: string;
  videoUrl?: string;
  content?: string;
  upVotes: number;
  downVotes: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  userVote?: VoteValue | null;
  type: Mode | null;
  isAdminCreated?: boolean;
  isPinned?: boolean;
  latestComments?: CommentDTOPopulatedUser[];
  isBulletin?: boolean;
};

export function toPostDTO(post: Post): PostDTO {
  return {
    _id: post._id.toString(),
    userId: post.userId.toString(),
    title: post.title,
    category: post.category,
    isDraft: post.isDraft,
    url: post.url,
    videoUrl: post.videoUrl,
    content: post.content,
    upVotes: post.upVotes,
    downVotes: post.downVotes,
    slug: post.slug,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    type: post.type,
    isAdminCreated: post.isAdminCreated,
    isPinned: post.isPinned,
  };
}

export function toPostPopulatedUserDTO(
  post: Post & { userVote?: VoteValue | null; userId: PostUserDTO & { _id: Types.ObjectId } }
): PostDTOPopulatedUser {
  return {
    _id: post._id.toString(),
    userId: post?.user?._id?.toString() as string,
    user: {
      username: post.user?.username ?? "",
      photo: post.user?.photo ?? "",
      _id: post.user?._id?.toString() ?? "",
      email: post.user?.email ?? "",
    },
    type: post.type,
    commentsCount: post?.commentsCount,
    reportsCount: post?.reportsCount,
    title: post.title,
    category: post.category,
    isDraft: post.isDraft,
    url: post.url,
    videoUrl: post.videoUrl,
    content: post.content,
    upVotes: post.upVotes,
    downVotes: post.downVotes,
    slug: post.slug,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    userVote: post.userVote ?? null,
    isAdminCreated: post.isAdminCreated,
    isPinned: post.isPinned,
    latestComments: post.latestComments,
  };
}

