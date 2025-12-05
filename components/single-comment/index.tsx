"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

import { cn, formatTimeAgo } from "@/lib/utils";

import UserAvatar from "@/components/user-avatar";

import { CommentDTOPopulatedUser } from "@/types/comment.types";
import { VoteValue } from "@/types/vote.types";

import NewCommentForm from "../../components/add-comment-button/NewCommentForm";
import CommentActionsButton from "../comment-actions-menu";
import CommentInteractionBar from "../comment-interaction-bar";

interface SingleCommentProps {
  comment: CommentDTOPopulatedUser;
  children?: React.ReactNode;
  onPostVoteComplete: (postId: string, value: VoteValue, commentId: string) => void;
  size?: "sm" | "default";
}

const SingleComment = ({ comment, children, onPostVoteComplete, size = "default" }: SingleCommentProps) => {
  const params = useParams();
  const username = params.username as string;
  const { user } = useUser();

  const [showEditCommentForm, setShowEditCommentForm] = useState(false);

  const handleCloseEditComment = () => setShowEditCommentForm(false);
  const handleShowEditComment = () => setShowEditCommentForm(true);

  return (
    <>
      <div className="flex flex-col transition-all duration-300">
        <div className={cn("flex items-center justify-between mb-4", size === "sm" && "mb-2")}>
          <div className="flex items-center max-md:flex-wrap">
            <UserAvatar
              size="sm"
              username={comment.user.username!}
              imageUrl={comment.user.photo!}
              usernameClassName="font-semibold text-sm"
            />
            <div className="text-xs+ flex text-text-title items-center gap-2 before:w-1 before:h-1 before:rounded-full before:bg-black/40 pl-2 before:flex">
              {formatTimeAgo(comment.createdAt)}
            </div>
          </div>
          {comment.user._id === user?.publicMetadata.userId && (
            <CommentActionsButton
              comment={comment}
              username={username}
              handleShowEditComment={handleShowEditComment}
            />
          )}
        </div>
        <div className="pl-3 sm:pl-5 md:pl-9">
          {!showEditCommentForm ? (
            <p className={cn("text-base mb-4", size === "sm" && "mb-1 text-sm")}>{comment.content}</p>
          ) : (
            <NewCommentForm
              comment={comment}
              onCancel={handleCloseEditComment}
            />
          )}
          <CommentInteractionBar
            comment={comment}
            onPostVoteComplete={(postId, value) => onPostVoteComplete(postId, value, "comment")}
          />
          {children || (Array.isArray(children) && children.length > 0 && <div className="mt-4">{children}</div>)}
        </div>
      </div>
    </>
  );
};

export default SingleComment;

