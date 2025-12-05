"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { LoadingSpinner } from "@/components/loading-spinner";

import { usePost } from "@/context/SinglePostContext";
import { VoteValue } from "@/types/vote.types";

import SingleComment from "../single-comment";

interface PostCommentsListProps {}

const PostCommentsList = ({}: PostCommentsListProps) => {
  const [ref, inView] = useInView();

  const { hasMore, loadMoreComments, loading, comments, onVoteComplete } = usePost();

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreComments();
    }
  }, [inView, hasMore, loadMoreComments]);

  const renderComments = (parentId: string | null = null) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((comment) => (
        <SingleComment
          key={comment._id}
          comment={comment}
          onPostVoteComplete={(postId: string, value: VoteValue, commentId: string) =>
            onVoteComplete("comment", postId, value)
          }
        >
          {renderComments(comment._id)}
        </SingleComment>
      ));
  };

  return (
    <div className="flex flex-col mt-10">
      {comments.length > 0 ? (
        <div className="flex flex-col gap-4 border-b border-border pb-4">{renderComments(null)}</div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center text-sm">
            <Image
              src="/images/not-found.png"
              alt="No comments yet"
              width={100}
              height={100}
              className="h-14 object-contain opacity-50"
            />
            <p className="mt-4">No comments yet</p>
          </div>
        )
      )}

      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center my-10"
        >
          {loading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default PostCommentsList;

