"use client";

import { format } from "date-fns";
import { Pin, PinOff, Users } from "lucide-react";
import Link from "next/link";

import { updatePostById } from "@/lib/actions/post.actions";
import { isActionError, showToast } from "@/lib/utils";

import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";

import AdminBulletinBoardTableActions from "./AdminBulletinBoardTableActions";

interface AdminBulletinBoardProps {
  posts: PostDTOPopulatedUser[];
  limit: number;
  total: number;
  title?: string;
}

const AdminBulletinBoard = ({ posts, limit, total, title = "All Posts" }: AdminBulletinBoardProps) => {
  const handleTogglePinnedPost = async (postId: string, prevValue: boolean) => {
    try {
      const result = await updatePostById(postId, { isPinned: !prevValue }, `${Routes.POSTS}${Routes.BULLETIN_BOARD}`);

      if (!result || isActionError(result)) {
        showToast("Failed to update the post. Please try again later.", { variant: "destructive" });
        return;
      }

      showToast(`Post ${!prevValue ? "pinned" : "unpinned"} successfully.`, { variant: "success" });
    } catch (error) {
      console.log(error);

      showToast("Something went wrong. Please try again later.", { variant: "destructive" });
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex justify-between flex-wrap gap-4">
        <h2 className="text-xl">{title}</h2>
        <Link href={Routes.BULLETIN_BOARD_CREATE_POST}>
          <Button variant="secondary">Create Post</Button>
        </Link>
      </div>
      <div className="flex flex-col">
        {posts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Pinned?</TableHead>

                <TableHead>Likes</TableHead>
                <TableHead className="">Dislikes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    <Link
                      target="_blank"
                      href={`${Routes.USER}/${post.user?.username}/${Routes.POSTS}/${post._id}/${post.slug}`}
                      className="hover:underline transition-all duration-300"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {" "}
                    {format(new Date(post.createdAt), "MMM dd, yyyy")}
                  </TableCell>

                  <TableCell className="text-center justify-items-center">
                    {post.isPinned ? (
                      <Pin
                        onClick={() => handleTogglePinnedPost(post._id, !!post.isPinned)}
                        className="text-primary cursor-pointer"
                      />
                    ) : (
                      <PinOff
                        onClick={() => handleTogglePinnedPost(post._id, !!post.isPinned)}
                        className="cursor-pointer"
                      />
                    )}
                  </TableCell>

                  <TableCell>{post.upVotes ?? 0}</TableCell>
                  <TableCell>{post.downVotes ?? 0}</TableCell>
                  <TableCell>{post.commentsCount ?? 0}</TableCell>
                  <TableCell>
                    <Link
                      href={`${Routes.ADMIN_POSTS}/${post._id}/reports`}
                      className="hover:underline transition-all duration-300"
                    >
                      {post.reportsCount ?? 0}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <AdminBulletinBoardTableActions {...{ post }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col justify-center items-center text-center min-h-[20rem]">
            <div className="border border-slate-500 rounded-full p-3 mb-2">
              <Users className="text-slate-800 w-12 h-12" />
            </div>
            <p className="text-xl mb-4">No posts found</p>
          </div>
        )}

        <Pagination
          {...{
            totalCount: total,
            limit,
            data: posts,
          }}
        />
      </div>
    </div>
  );
};

export default AdminBulletinBoard;

