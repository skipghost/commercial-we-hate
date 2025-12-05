import { Types } from "mongoose";

export type BulletinBoardPost = {
  userId: Types.ObjectId;
  title: string;
  content: string;
  isPinned: boolean;
  parentId?: Types.ObjectId | null;
  replies: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

