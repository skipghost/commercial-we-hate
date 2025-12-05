"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";

import { voteOnPost } from "@/lib/actions/post.actions";
import { cn, formatNumberCompact, isActionError, showToast } from "@/lib/utils";

import { VoteValue } from "@/types/vote.types";

import VoteIconButton from "./VoteIconButton";

interface PostVoteButtonProps {
  count: number;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  postId: string;
  onPostVoteComplete: (postId: string, value: VoteValue) => void;
}

const PostVoteButton = ({
  count = 0,
  hasUpvoted = false,
  hasDownvoted = false,
  postId,
  onPostVoteComplete,
}: PostVoteButtonProps) => {
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

      const result = await voteOnPost(postId, value);

      if (isActionError(result)) {
        showToast(result.error || "Failed to vote on the post.", { variant: "destructive" });
      }

      onPostVoteComplete(postId, value);
    } catch (error) {
      console.error(error);
      showToast("Failed to vote on the post.", { variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-1.5 items-center rounded-full bg-ghost border border-black/5",
        hasUpvoted && "bg-teal-500 text-white",
        hasDownvoted && "bg-red-500 text-white"
      )}
    >
      <VoteIconButton
        onClick={() => handleVote(1)}
        ariaLabel="Upvote"
        active={hasUpvoted}
        hasVoted={hasUpvoted || hasDownvoted}
        isUpvote={true}
        disabled={loading}
      />
      <span className="font-semibold text-sm min-w-[10px] flex justify-center">{formatNumberCompact(count)}</span>
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

export default PostVoteButton;

