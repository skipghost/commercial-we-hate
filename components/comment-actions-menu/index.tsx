"use client";

import { useState } from "react";

import { Ellipsis } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CommentDTOPopulatedUser } from "@/types/comment.types";

import DeleteCommentButton from "./DeleteCommentButton";
import EditCommentButton from "./EditCommentButton";

interface CommentActionsButtonProps {
  comment: CommentDTOPopulatedUser;
  username: string;
  handleShowEditComment: () => void;
}

const CommentActionsButton = ({ comment, username, handleShowEditComment }: CommentActionsButtonProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
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
          <EditCommentButton handleShowEditComment={handleShowEditComment} />
          <DeleteCommentButton
            commentId={comment._id}
            commentUserId={comment.user._id}
            username={username}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CommentActionsButton;

