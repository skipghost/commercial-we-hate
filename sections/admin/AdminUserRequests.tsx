"use client";

import { format } from "date-fns";
import { File } from "lucide-react";

import Pagination from "@/components/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { RequestDTO } from "@/types/request.types";

interface AdminUserRequestsProps {
  limit: number;
  total: number;
  requests: RequestDTO[];
}

const AdminUserRequests = ({ limit, requests, total }: AdminUserRequestsProps) => {
  return (
    <div className="">
      <div className="mb-6 flex justify-between flex-wrap gap-4">
        <h2 className="text-xl max-w-md">User Requests</h2>
      </div>

      <div className="flex flex-col">
        {requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="">Message</TableHead>

                {/* <TableHead></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(request.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger className="text-left">
                        {request.message.length > 50 ? request.message.substring(0, 50) + "..." : request.message}
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="mb-4 font-bold text-xl">New Request</DialogTitle>
                          <div>
                            <h4>{request.name}</h4>
                            <p>{request.email}</p>
                          </div>
                          <div className="mt-4">
                            <span className="font-semibold mb-2 flex">Message:</span>
                            <p className="whitespace-break-spaces">{request.message}</p>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col justify-center items-center text-center min-h-[20rem]">
            <div className="border border-slate-500 rounded-full p-3 mb-2">
              <File className="text-slate-800 w-6 h-6" />
            </div>
            <p className="text-xl mb-4">No requests found</p>
          </div>
        )}

        <Pagination
          {...{
            totalCount: total,
            limit,
            data: requests,
          }}
        />
      </div>
    </div>
  );
};

export default AdminUserRequests;

