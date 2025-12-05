import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";

import PostDeleteButton from "./PostDeleteButton";

interface AdminPostsTableActionsProps {
  post: PostDTOPopulatedUser;
}

const AdminPostsTableActions = ({ post }: AdminPostsTableActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`${Routes.ADMIN_POSTS}/${post._id}/reports`}>
        <Button
          variant="outline"
          size="sm"
        >
          View Reports
        </Button>
      </Link>
      <PostDeleteButton postId={post._id}>Delete Post</PostDeleteButton>
    </div>
  );
};

export default AdminPostsTableActions;

