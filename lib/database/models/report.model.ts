import { Document, Schema, Types, model, models } from "mongoose";

import { ReportsStatusEnum } from "@/types/enums";
import { Reports } from "@/types/report.types";

export interface ReportsDocument extends Document<Types.ObjectId>, Reports {}

const ReportsSchema = new Schema<ReportsDocument>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ReportsStatusEnum),
      default: ReportsStatusEnum.PENDING,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.Reports || model<ReportsDocument>("Reports", ReportsSchema);

