import { Types } from "mongoose";

import { RequestStatus } from "./enums";

export interface Request {
  _id: Types.ObjectId;
  message: string;
  email: string;
  name: string;
  status?: RequestStatus;
  createdAt: Date;
}

export type RequestCreateInput = {
  message: string;
  email: string;
  name: string;
  status?: RequestStatus;
};

export type RequestUpdateInput = Partial<RequestCreateInput>;

export interface RequestDTO {
  _id: string;
  email: string;
  name: string;
  message: string;
  createdAt: Date;
  status?: RequestStatus;
}

export function toRequestDTO(request: Request): RequestDTO {
  return {
    _id: request._id.toString(),
    message: request.message,
    email: request.email,
    name: request.name,
    createdAt: request.createdAt,
    status: request.status,
  };
}

