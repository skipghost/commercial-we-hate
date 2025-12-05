import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";

import PostDeleteButton from "./PostDeleteButton";

interface AdminBulletinBoardTableActionsProps {
  post: PostDTOPopulatedUser;
}

const AdminBulletinBoardTableActions = ({ post }: AdminBulletinBoardTableActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`${Routes.BULLETIN_BOARD}/${post._id}/${post.slug}/edit`}>
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
        >
          Edit Post
        </Button>
      </Link>

      <PostDeleteButton postId={post._id}>Delete Post</PostDeleteButton>
      {/* <Link href={`${Routes.ADMIN_POSTS}/${post._id}/reports`}>
        <Button
          variant="outline"
          size="sm"
        >
          View Reports
        </Button>
      </Link> */}
    </div>
  );
};

export default AdminBulletinBoardTableActions;

