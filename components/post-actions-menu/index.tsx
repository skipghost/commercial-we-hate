"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { PostDTOPopulatedUser } from "@/types/post.types";

import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

interface PostActionsMenuProps {
  post: PostDTOPopulatedUser;
  redirectHome?: boolean;
}

const PostActionsMenu = ({ post, redirectHome }: PostActionsMenuProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger>
        <Ellipsis className="hover:bg-neutral-200/60 text-foreground w-7 h-7 rounded-full transition-all duration-300 p-1" />
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-[200px] overflow-hidden dark:bg-ghost">
        <div className="flex flex-col divide-y-[1px] divide-border">
          {post.userId === user?.publicMetadata.userId && (
            <EditPostButton
              postId={post._id}
              postSlug={post.slug}
            />
          )}
          <DeletePostButton
            postId={post._id}
            postUserId={post?.user?._id!}
            redirectHome={redirectHome}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostActionsMenu;

