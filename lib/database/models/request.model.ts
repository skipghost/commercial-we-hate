import { Document, Schema, Types, model, models } from "mongoose";

import { RequestStatus } from "@/types/enums";
import { Request } from "@/types/request.types";

export interface RequestDocument extends Document<Types.ObjectId>, Request {}

const RequestSchema = new Schema<RequestDocument>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: Object.values(RequestStatus), default: RequestStatus.Pending },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.Request || model<RequestDocument>("Request", RequestSchema);

