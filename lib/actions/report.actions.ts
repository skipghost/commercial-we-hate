"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Types } from "mongoose";

import Reports from "@/lib/database/models/report.model";
import { handleError, isActionError } from "@/lib/utils";

import { ServerActionResponse } from "@/types";
import { ReportsStatusEnum, UserRoleEnum } from "@/types/enums";
import {
  ReportsCreateInput,
  ReportsDTO,
  ReportsDTOPopulatedUser,
  ReportsUpdateInput,
  toReportsDTO,
  toReportsPopulatedUserDTO,
} from "@/types/report.types";

import { connectToDB } from "../database";
import { getUserByClerkId } from "./user.actions";

export async function createReport(report: ReportsCreateInput): Promise<ServerActionResponse<ReportsDTO>> {
  try {
    await connectToDB();
    const user = await currentUser();

    if (!user) return handleError("You must be logged in to report a post.");

    const dbUser = await getUserByClerkId(user.id);
    if (isActionError(dbUser) || !dbUser) return handleError("User not found.");

    if (dbUser._id.toString() !== report.reporterId.toString()) {
      return handleError("You're not allowed to create this report.");
    }

    const newReport = await Reports.create({
      ...report,
      postId: new Types.ObjectId(report.postId),
      reporterId: new Types.ObjectId(report.reporterId),
    });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send/notifications/new-report`, {
        body: JSON.stringify({
          postId: report.postId,
          reporterId: report.reporterId,
          reason: report.reason,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }

    return toReportsDTO(newReport.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function getReportById(id: Types.ObjectId | string): Promise<ServerActionResponse<ReportsDTO | null>> {
  try {
    await connectToDB();

    const report = await Reports.findById(id).exec();
    if (!report) return handleError("Report not found.");

    return toReportsDTO(report.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function updateReportById(
  reportId: string,
  reportUpdate: ReportsUpdateInput
): Promise<ServerActionResponse<ReportsDTO | null>> {
  try {
    await connectToDB();
    const user = await currentUser();
    if (!user) return handleError("You must be logged in to update a report.");

    const dbUser = await getUserByClerkId(user.id);
    if (isActionError(dbUser) || !dbUser) return handleError("User not found.");

    const { reporterId, postId, ...updateData } = reportUpdate;
    if (reporterId && dbUser._id.toString() !== reporterId.toString()) {
      return handleError("You're not allowed to update this report.");
    }

    const updatedReport = await Reports.findByIdAndUpdate(reportId, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedReport) return handleError("Failed to update report.");

    return toReportsDTO(updatedReport.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteReportById(reportId: string, userId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const authUser = await currentUser();
    if (!authUser) return handleError("You must be logged in to delete a report.");

    const report = await Reports.findById(reportId).exec();
    if (!report) return handleError("Report not found.");

    if (report.reporterId.toString() !== userId.toString()) {
      return handleError("You're not allowed to delete this report.");
    }

    await Reports.findByIdAndDelete(reportId).exec();
    return true;
  } catch (error) {
    return handleError(error);
  }
}

export async function adminDeleteReportById(reportId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const { sessionClaims, userId } = await auth();
    if (!userId) return handleError("You must be logged in.");

    const currentUserRole = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;
    if (![UserRoleEnum.ADMIN, UserRoleEnum.PRIMARY_ADMIN].includes(currentUserRole!)) {
      return handleError("You're not allowed to delete reports.");
    }

    const report = await Reports.findById(reportId).exec();
    if (!report) return handleError("Report not found.");

    await Reports.findByIdAndDelete(reportId).exec();
    // revalidatePath(Routes.ADMIN_REPORTS);

    return true;
  } catch (error) {
    return handleError(error);
  }
}

interface GetReportsOptions {
  page?: number;
  limit?: number;
  status?: ReportsStatusEnum;
  reporterId?: string;
  postId?: string;
}

export async function getAllReports<T extends boolean = false>(
  options?: GetReportsOptions & { populateUser?: T }
): Promise<
  ServerActionResponse<{
    reports: T extends true ? ReportsDTOPopulatedUser[] : ReportsDTO[];
    total: number;
    page: number;
    limit: number;
  }>
> {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const limit = options?.limit && options.limit > 0 ? options.limit : 10;
  const skip = (page - 1) * limit;

  try {
    await connectToDB();
    const filters: Record<string, any> = {};

    if (options?.status) filters.status = options.status;
    if (options?.reporterId) filters.reporterId = options.reporterId;
    if (options?.postId) filters.postId = new Types.ObjectId(options.postId);

    const aggregation: any[] = [{ $match: filters }, { $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }];

    if (options?.populateUser) {
      aggregation.push({
        $lookup: {
          from: "users",
          localField: "reporterId",
          foreignField: "_id",
          as: "user",
        },
      });
      aggregation.push({
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      });
    }

    const reports = await Reports.aggregate(aggregation).exec();
    const total = await Reports.countDocuments(filters).exec();

    return {
      reports: JSON.parse(JSON.stringify(reports)).map((r: any) =>
        options?.populateUser ? toReportsPopulatedUserDTO(r) : toReportsDTO(r)
      ),
      total,
      page,
      limit,
    };
  } catch (error) {
    return handleError(error);
  }
}

