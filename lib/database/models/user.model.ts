import { Document, Schema, Types, model, models } from "mongoose";

import { UserRoleEnum } from "@/types/enums";
import { User } from "@/types/user.types";

export interface UserDocument extends Document<Types.ObjectId>, User {}

const UserSchema = new Schema<UserDocument>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  photo: { type: String },
  phone: { type: String, default: "" },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum) as readonly string[],
    default: UserRoleEnum.USER,
  },
});

export default models.User || model<UserDocument>("User", UserSchema);

