import Link from "next/link";

import { formatNumberCompact } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import Comment from "../icons/comment";
import { Button } from "../ui/button";

interface PostTotalCommentsButtonProps {
  count: number;
  username: string;
  postId: string;
  postSlug: string;
}

const PostTotalCommentsButton = ({ count = 0, username, postId, postSlug }: PostTotalCommentsButtonProps) => {
  return (
    <Link href={`${Routes.POSTS}/${postId}/${postSlug}#comments`}>
      <Button
        variant="ghost"
        className="font-semibold h-9  border border-black/5"
        size="sm"
      >
        <Comment className="stroke-[2px] w-4 h-4 stroke-current" />
        {formatNumberCompact(count)}
      </Button>
    </Link>
  );
};

export default PostTotalCommentsButton;

