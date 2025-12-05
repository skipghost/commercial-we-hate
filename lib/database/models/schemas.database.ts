import { Schema } from "mongoose";

import { AttachmentParams } from "@/types";

export interface AttachmentDocument extends AttachmentParams, Document {}

export const AttachmentSchema = new Schema<AttachmentDocument>(
  {
    url: String,
    filename: String,
    size: Number,
  },
  { _id: false }
);

