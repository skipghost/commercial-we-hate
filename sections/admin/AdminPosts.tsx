import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";

import { getObjectLabel } from "@/lib/utils";

import Pagination from "@/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import postCategories from "@/constants/postCategories";
import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";

import AdminPostsTableActions from "./AdminPostsTableActions";

interface AdminPostsProps {
  posts: PostDTOPopulatedUser[];
  limit: number;
  total: number;
  title?: string;
}

const AdminPosts = ({ posts, limit, total, title = "All Posts" }: AdminPostsProps) => {
  return (
    <div className="">
      <div className="mb-6 flex justify-between flex-wrap gap-4">
        <h2 className="text-xl">{title}</h2>
      </div>
      <div className="flex flex-col">
        {posts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="">Author</TableHead>
                <TableHead className="">Category</TableHead>
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

                  <TableCell>
                    {post.user?.username ? (
                      <Link
                        target="_blank"
                        className="hover:underline transition-all duration-300"
                        href={`${Routes.USER}/${post.user.username}`}
                      >
                        @{post.user?.username}
                      </Link>
                    ) : (
                      "Deleted User"
                    )}{" "}
                  </TableCell>

                  <TableCell>
                    <Link
                      target="_blank"
                      href={`${Routes.TOPICS}/${post.category}`}
                      className="hover:underline transition-all duration-300"
                    >
                      {getObjectLabel(postCategories, post.category)}
                    </Link>
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
                    <AdminPostsTableActions {...{ post }} />
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

export default AdminPosts;

