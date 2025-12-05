import { Types } from "mongoose";

import { ReportsStatusEnum } from "./enums";

export interface Reports {
  _id: Types.ObjectId;
  postId: Types.ObjectId;
  reporterId: Types.ObjectId;
  reason: string;
  status: ReportsStatusEnum;
  createdAt: Date;
}

export type ReportsCreateInput = {
  postId: string;
  reporterId: string;
  reason: string;
  status: ReportsStatusEnum;
};

export type ReportsUpdateInput = Partial<ReportsCreateInput>;

export interface ReportsDTO {
  _id: string;
  postId: string;
  reporterId: string;
  reason: string;
  status: ReportsStatusEnum;
  createdAt: Date;
}

export interface ReportsDTO {
  _id: string;
  postId: string;
  reporterId: string;
  reason: string;
  status: ReportsStatusEnum;
  createdAt: Date;
}

export interface ReportsUserDTO {
  username: string;
  photo: string;
  _id: string;
}

export type ReportsDTOPopulatedUser = {
  _id: string;
  postId: string;
  reporterId: string;
  reason: string;
  status: ReportsStatusEnum;
  createdAt: Date;
  user?: ReportsUserDTO;
};

export function toReportsDTO(report: Reports): ReportsDTO {
  return {
    _id: report._id.toString(),
    postId: report.postId.toString(),
    reporterId: report.reporterId.toString(),
    reason: report.reason,
    status: report.status,
    createdAt: report.createdAt,
  };
}

export function toReportsPopulatedUserDTO(report: ReportsDTOPopulatedUser): ReportsDTOPopulatedUser {
  return {
    _id: report._id.toString(),
    postId: report.postId.toString(),
    reporterId: report.reporterId.toString(),
    reason: report.reason,
    status: report.status,
    createdAt: report.createdAt,
    user: report.user,
  };
}

