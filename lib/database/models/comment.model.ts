import { Document, Schema, Types, model, models } from "mongoose";

import { Comment } from "@/types/comment.types";

export interface CommentDocument extends Document<Types.ObjectId>, Comment {}

const CommentSchema = new Schema<CommentDocument>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentId: { type: Types.ObjectId, ref: "Comment" },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Comment || model<CommentDocument>("Comment", CommentSchema);

