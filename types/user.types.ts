import { Types } from "mongoose";

import { UserRoleEnum } from "./enums";

export interface User {
  _id: Types.ObjectId;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo?: string;
  phone?: string;
  role?: UserRoleEnum;
}

export type UserCreateInput = Omit<User, "_id">;

export type UserUpdateInput = Partial<Omit<User, "_id">>;

export interface UserDTO {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo?: string;
  phone?: string;
  role?: UserRoleEnum;
}

export function toUserDTO(user: User): UserDTO {
  return {
    _id: user._id.toString(),
    clerkId: user.clerkId,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    photo: user.photo,
    phone: user.phone,
    role: user.role,
  };
}

