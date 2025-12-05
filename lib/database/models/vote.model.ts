import { Document, Schema, Types, model, models } from "mongoose";

import { Vote } from "@/types/vote.types";

export interface VoteDocument extends Document<Types.ObjectId>, Vote {}

const VoteSchema = new Schema<VoteDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: false },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: false },
    value: { type: Number, enum: [1, -1], required: true },
  },
  { timestamps: true }
);

VoteSchema.index(
  { userId: 1, postId: 1 },
  { unique: true, partialFilterExpression: { postId: { $exists: true, $ne: null } } }
);

VoteSchema.index(
  { userId: 1, commentId: 1 },
  { unique: true, partialFilterExpression: { commentId: { $exists: true, $ne: null } } }
);

export default models.Vote || model<VoteDocument>("Vote", VoteSchema);

