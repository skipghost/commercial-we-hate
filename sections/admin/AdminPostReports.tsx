"use client";

import { format } from "date-fns";
import { File } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getObjectLabel } from "@/lib/utils";

import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import reportReasons from "@/constants/reportReasons";
import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";
import { ReportsDTOPopulatedUser } from "@/types/report.types";

import PostDeleteButton from "./PostDeleteButton";

interface AdminPostReportsProps {
  limit: number;
  total: number;
  post: PostDTOPopulatedUser;
  reports: ReportsDTOPopulatedUser[];
}

const AdminPostReports = ({ reports, limit, total, post }: AdminPostReportsProps) => {
  const router = useRouter();
  return (
    <div className="">
      <div className="mb-6 flex justify-between flex-wrap gap-4">
        <h2 className="text-xl max-w-md">{post?.title}</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`${Routes.USER}/${post?.user?.username!}/${Routes.POSTS}/${post._id}/${post.slug}`}>
            <Button
              variant="outline"
              size="sm"
            >
              View Post
            </Button>
          </Link>
          <PostDeleteButton
            postId={post?._id}
            onDeleted={() => {
              router.push(`${Routes.ADMIN_POSTS}`);
            }}
          >
            Delete Post
          </PostDeleteButton>
        </div>
      </div>

      <div className="flex flex-col">
        {reports.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Reason</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead className="">Reporter</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report._id}>
                  <TableCell className="font-medium">{getObjectLabel(reportReasons, report.reason)}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(report.createdAt), "MMM dd, yyyy")}
                  </TableCell>

                  <TableCell>
                    {report.user?.username ? (
                      <Link
                        target="_blank"
                        className="hover:underline transition-all duration-300"
                        href={`${Routes.USER}/${report.user.username}`}
                      >
                        @{report.user?.username}
                      </Link>
                    ) : (
                      "Deleted User"
                    )}{" "}
                  </TableCell>
                  {/* 
                  <TableCell>
                    <AdminPostsTableActions {...{ post }} />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col justify-center items-center text-center min-h-[20rem]">
            <div className="border border-slate-500 rounded-full p-3 mb-2">
              <File className="text-slate-800 w-6 h-6" />
            </div>
            <p className="text-xl mb-4">No reports found</p>
          </div>
        )}

        <Pagination
          {...{
            totalCount: total,
            limit,
            data: reports,
          }}
        />
      </div>
    </div>
  );
};

export default AdminPostReports;

