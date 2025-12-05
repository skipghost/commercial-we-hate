import { Types } from "mongoose";

export type VoteValue = 1 | -1;

export type Vote = {
  userId: Types.ObjectId;
  postId?: Types.ObjectId;
  commentId?: string;
  value: VoteValue;
};

export type VoteAction = "voted" | "changed" | "unvoted";

