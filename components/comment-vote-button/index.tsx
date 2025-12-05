"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";

import { voteOnComment } from "@/lib/actions/comment.actions";
import { cn, formatNumberCompact, isActionError, showToast } from "@/lib/utils";

import { VoteValue } from "@/types/vote.types";

import VoteIconButton from "./VoteIconButton";

interface CommentVoteButtonProps {
  count: number;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  commentId: string;
  onPostVoteComplete: (commentId: string, value: VoteValue) => void;
}

const CommentVoteButton = ({
  count = 0,
  hasUpvoted = false,
  hasDownvoted = false,
  commentId,
  onPostVoteComplete,
}: CommentVoteButtonProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string | undefined;
  const [loading, setLoading] = useState(false);

  const handleVote = async (value: VoteValue) => {
    if (!userId) {
      showToast("You must be logged in to vote.", { variant: "destructive" });
      return;
    }

    try {
      setLoading(true);

      const result = await voteOnComment({ commentId, voteValue: value });

      if (isActionError(result)) {
        showToast(result.error || "Failed to vote on the comment.", { variant: "destructive" });
      }

      onPostVoteComplete(commentId, value);
    } catch (error) {
      console.error(error);
      showToast("Failed to vote on the comment.", { variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex gap-1 items-center rounded-full -ml-2")}>
      <VoteIconButton
        onClick={() => handleVote(1)}
        ariaLabel="Upvote"
        active={hasUpvoted}
        hasVoted={hasUpvoted || hasDownvoted}
        isUpvote={true}
        disabled={loading}
      />
      <span className="font-semibold text-text-title text-sm min-w-[10px] flex justify-center">
        {formatNumberCompact(count)}
      </span>
      <VoteIconButton
        onClick={() => handleVote(-1)}
        ariaLabel="Downvote"
        active={hasDownvoted}
        hasVoted={hasUpvoted || hasDownvoted}
        isUpvote={false}
        disabled={loading}
      />
    </div>
  );
};

export default CommentVoteButton;

