"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

import { ServerActionResponse } from "@/types";
import { UserRoleEnum } from "@/types/enums";
import { UserCreateInput, UserDTO, UserUpdateInput } from "@/types/user.types";

import { connectToDB } from "../database";
import commentModel from "../database/models/comment.model";
import postModel from "../database/models/post.model";
import voteModel from "../database/models/vote.model";

export async function createUser(user: UserCreateInput) {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getUserByClerkId(clerkId: string): Promise<ServerActionResponse<UserDTO | null>> {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId }).exec();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getUserByUserId(userId: string) {
  try {
    await connectToDB();
    const user = await User.findById(userId).exec();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getUserByUsername(username: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ username }).exec();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function updateUserByClerkId(clerkId: string, user: UserUpdateInput) {
  try {
    await connectToDB();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true }).exec();
    return updatedUser ? JSON.parse(JSON.stringify(updatedUser)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function updateUserById(userId: string, user: UserUpdateInput) {
  try {
    await connectToDB();
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: user }, { new: true }).exec();

    revalidatePath("/profile", "layout");
    return updatedUser ? JSON.parse(JSON.stringify(updatedUser)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function deleteUserByClerkId(clerkId: string) {
  try {
    await connectToDB();
    const userToDelete = await User.findOne({ clerkId }).exec();
    if (!userToDelete) return null;

    const deletedUser = await User.findByIdAndDelete(userToDelete._id).exec();
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function clearPosts() {
  try {
    await connectToDB();

    await commentModel.deleteMany({});
    await voteModel.deleteMany({});

    await postModel.updateMany(
      {},
      {
        $set: {
          upVotes: 0,
          downVotes: 0,
        },
      }
    );

    return null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getUsers({
  limit = 10,
  page = 1,
  search,
}: {
  limit?: number;
  page?: number;
  search?: string;
}): Promise<
  ServerActionResponse<{
    users: UserDTO[];
    total: number;
    page: number;
    limit: number;
  }>
> {
  try {
    await connectToDB();

    const { sessionClaims } = await auth();
    const currentUserRole = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;

    if (currentUserRole !== UserRoleEnum.ADMIN && currentUserRole !== UserRoleEnum.PRIMARY_ADMIN) {
      return handleError("You're not allowed to get users.");
    }

    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).skip(skip).limit(limit).lean();
    const total = await User.countDocuments(query);

    return {
      users: JSON.parse(JSON.stringify(users)) as UserDTO[],
      total,
      page,
      limit,
    };
  } catch (error) {
    return handleError(error);
  }
}

