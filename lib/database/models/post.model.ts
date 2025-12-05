import { Document, Schema, Types, model, models } from "mongoose";
import slugify from "slugify";

import { Mode, PostCategoryEnum } from "@/types/enums";
import { Post } from "@/types/post.types";

export interface PostDocument extends Document<Types.ObjectId>, Post {}

const PostSchema = new Schema<PostDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    isDraft: { type: Boolean, default: false },
    url: { type: String },
    videoUrl: { type: String },
    content: { type: String },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    type: {
      type: String,
      enum: Object.values(Mode),
      default: Mode.HATE,
    },
    category: {
      type: String,
      enum: Object.values(PostCategoryEnum),
    },

    isAdminCreated: {
      type: Boolean,
      default: false,
    },
    isBulletin: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PostSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default models.Post || model<PostDocument>("Post", PostSchema);

