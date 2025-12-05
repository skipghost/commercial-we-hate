"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { connectToDB } from "@/lib/database";
import BulletinPost from "@/lib/database/models/bulletin-board";
import { handleError, isActionError } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { ServerActionResponse } from "@/types";
import { UserRoleEnum } from "@/types/enums";

import { getUserByClerkId } from "./user.actions";

export async function createBulletinPost(data: {
  userId: string;
  title: string;
  content: string;
  parentId?: string | null;
}): Promise<ServerActionResponse<any>> {
  try {
    await connectToDB();

    const user = await currentUser();
    if (!user) return handleError("You must be logged in to post.");

    const dbUser = await getUserByClerkId(user.id);
    if (isActionError(dbUser) || !dbUser) return handleError("User not found.");

    const newPost = await BulletinPost.create({
      ...data,
      userId: new Types.ObjectId(data.userId),
      parentId: data.parentId ? new Types.ObjectId(data.parentId) : null,
    });

    revalidatePath(Routes.BULLETIN_BOARD_POSTS);
    return newPost.toObject();
  } catch (error) {
    return handleError(error);
  }
}

interface GetBulletinPostsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

interface GetBulletinPostsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  pinnedOnly?: boolean; // new flag to return only pinned posts
}

export async function getBulletinPosts(
  options?: GetBulletinPostsOptions
): Promise<ServerActionResponse<{ posts: any[]; total: number; page: number; limit: number }>> {
  try {
    await connectToDB();

    const page = options?.page && options.page > 0 ? options.page : 1;
    const limit = options?.limit && options.limit > 0 ? options.limit : 10;
    const skip = (page - 1) * limit;
    const sortBy = options?.sortBy || "createdAt";
    const sortOrder = options?.sortOrder === "asc" ? 1 : -1;

    const filters: any = { parentId: null };

    if (options?.search) {
      filters.title = { $regex: options.search, $options: "i" };
    }

    if (options?.pinnedOnly) {
      filters.isPinned = true;
    }

    // Count total documents matching filters
    const total = await BulletinPost.countDocuments(filters);

    // Fetch posts
    const posts = await BulletinPost.find(filters)
      .populate("userId", "username photo")
      .sort({ isPinned: -1, [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    return { posts, total, page, limit };
  } catch (error) {
    return handleError(error);
  }
}

export async function getBulletinPostById(id: string): Promise<ServerActionResponse<any>> {
  try {
    await connectToDB();

    const post = await BulletinPost.findById(id)
      .populate("userId", "username photo")
      .populate({
        path: "replies",
        populate: { path: "userId", select: "username photo" },
      })
      .lean();

    if (!post) return handleError("Post not found.");
    return post;
  } catch (error) {
    return handleError(error);
  }
}

export async function togglePinBulletinPost(postId: string): Promise<ServerActionResponse<{ isPinned: boolean }>> {
  try {
    await connectToDB();

    const { userId, sessionClaims } = await auth();
    if (!userId) return handleError("You must be logged in.");

    const role = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;
    if (role !== UserRoleEnum.ADMIN && role !== UserRoleEnum.PRIMARY_ADMIN)
      return handleError("You are not allowed to pin posts.");

    const post = await BulletinPost.findById(postId);
    if (!post) return handleError("Post not found.");

    post.isPinned = !post.isPinned;
    await post.save();

    revalidatePath(Routes.BULLETIN_BOARD_POSTS);
    return { isPinned: post.isPinned };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteBulletinPost(postId: string, userId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const user = await currentUser();
    if (!user) return handleError("You must be logged in to delete a post.");

    const dbUser = await getUserByClerkId(user.id);
    if (isActionError(dbUser) || !dbUser) return handleError("User not found.");

    const post = await BulletinPost.findById(postId);
    if (!post) return handleError("Post not found.");

    await BulletinPost.deleteMany({
      $or: [{ _id: postId }, { parentId: postId }],
    });

    revalidatePath(Routes.BULLETIN_BOARD_POSTS);
    return true;
  } catch (error) {
    return handleError(error);
  }
}

export async function adminDeleteBulletinPost(postId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const { userId, sessionClaims } = await auth();
    if (!userId) return handleError("You must be logged in.");

    const role = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;
    if (role !== UserRoleEnum.ADMIN && role !== UserRoleEnum.PRIMARY_ADMIN)
      return handleError("You are not allowed to delete posts.");

    await BulletinPost.deleteMany({
      $or: [{ _id: postId }, { parentId: postId }],
    });

    revalidatePath(Routes.BULLETIN_BOARD_POSTS);
    return true;
  } catch (error) {
    return handleError(error);
  }
}

