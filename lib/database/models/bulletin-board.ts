import { Document, Schema, Types, model, models } from "mongoose";

import { BulletinBoardPost } from "@/types/bullet-board-post.types";

export interface BulletinPostDocument extends Document<Types.ObjectId>, BulletinBoardPost {}

const BulletinPostSchema = new Schema<BulletinPostDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    parentId: { type: Schema.Types.ObjectId, ref: "BulletinPost", default: null },
    replies: [{ type: Schema.Types.ObjectId, ref: "BulletinPost" }],
  },
  { timestamps: true }
);

BulletinPostSchema.pre("save", async function (next) {
  if (this.parentId) {
    const parent = await models.BulletinPost.findById(this.parentId);
    if (parent) {
      if (!parent.replies.includes(this._id)) {
        parent.replies.push(this._id);
        await parent.save();
      }
    }
  }
  next();
});

const BulletinPost = models.BulletinPost || model<BulletinPostDocument>("BulletinPost", BulletinPostSchema);

export default BulletinPost;

