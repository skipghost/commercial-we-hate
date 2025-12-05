"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Types } from "mongoose";

import RequestModel from "@/lib/database/models/request.model";
import { handleError, isActionError } from "@/lib/utils";

import { ServerActionResponse } from "@/types";
import { RequestStatus, UserRoleEnum } from "@/types/enums";
import { RequestCreateInput, RequestDTO, RequestUpdateInput, toRequestDTO } from "@/types/request.types";

import { connectToDB } from "../database";
import { getUserByClerkId } from "./user.actions";

export async function createRequest(request: RequestCreateInput): Promise<ServerActionResponse<RequestDTO>> {
  try {
    await connectToDB();
    const user = await currentUser();

    const newRequest = await RequestModel.create({
      ...request,
      status: request.status || RequestStatus.Pending,
    });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send/notifications/new-request`, {
        body: JSON.stringify({
          message: request.message,
          email: request.email,
          name: request.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }

    return toRequestDTO(newRequest.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function getRequestById(id: Types.ObjectId | string): Promise<ServerActionResponse<RequestDTO | null>> {
  try {
    await connectToDB();

    const request = await RequestModel.findById(id).exec();
    if (!request) return handleError("Request not found.");

    return toRequestDTO(request.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function updateRequestById(
  requestId: string,
  requestUpdate: RequestUpdateInput
): Promise<ServerActionResponse<RequestDTO | null>> {
  try {
    await connectToDB();
    const user = await currentUser();
    if (!user) return handleError("You must be logged in to update a request.");

    const dbUser = await getUserByClerkId(user.id);
    if (isActionError(dbUser) || !dbUser) return handleError("User not found.");

    const updatedRequest = await RequestModel.findByIdAndUpdate(requestId, requestUpdate, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedRequest) return handleError("Failed to update request.");

    return toRequestDTO(updatedRequest.toObject());
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteRequestById(requestId: string, userId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const authUser = await currentUser();
    if (!authUser) return handleError("You must be logged in to delete a request.");

    const request = await RequestModel.findById(requestId).exec();
    if (!request) return handleError("Request not found.");

    if (request.userId.toString() !== userId.toString()) {
      return handleError("You're not allowed to delete this request.");
    }

    await RequestModel.findByIdAndDelete(requestId).exec();
    return true;
  } catch (error) {
    return handleError(error);
  }
}

export async function adminDeleteRequestById(requestId: string): Promise<ServerActionResponse<boolean>> {
  try {
    await connectToDB();

    const { sessionClaims, userId } = await auth();
    if (!userId) return handleError("You must be logged in.");

    const currentUserRole = (sessionClaims?.metadata as { role?: UserRoleEnum })?.role;
    if (![UserRoleEnum.ADMIN, UserRoleEnum.PRIMARY_ADMIN].includes(currentUserRole!)) {
      return handleError("You're not allowed to delete requests.");
    }

    const request = await RequestModel.findById(requestId).exec();
    if (!request) return handleError("Request not found.");

    await RequestModel.findByIdAndDelete(requestId).exec();

    return true;
  } catch (error) {
    return handleError(error);
  }
}

interface GetRequestsOptions {
  page?: number;
  limit?: number;
  status?: RequestStatus;
  userId?: string;
}

export async function getAllRequests<T extends boolean = false>(
  options?: GetRequestsOptions
): Promise<
  ServerActionResponse<{
    requests: RequestDTO[];
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
    if (options?.userId) filters.userId = new Types.ObjectId(options.userId);

    const aggregation: any[] = [{ $match: filters }, { $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }];

    const requests = await RequestModel.aggregate(aggregation).exec();
    const total = await RequestModel.countDocuments(filters).exec();

    return {
      requests: JSON.parse(JSON.stringify(requests)).map((r: any) => toRequestDTO(r)),
      total,
      page,
      limit,
    };
  } catch (error) {
    return handleError(error);
  }
}

