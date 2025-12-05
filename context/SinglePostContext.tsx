"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";

import { getPostComments } from "@/lib/actions/comment.actions";
import { isActionError } from "@/lib/utils";

import { CommentDTOPopulatedUser } from "@/types/comment.types";
import { PostDTOPopulatedUser } from "@/types/post.types";
import { VoteValue } from "@/types/vote.types";

interface SinglePostContextType {
  post: PostDTOPopulatedUser;
  onVoteComplete: (target: "post" | "comment", id: string, value: VoteValue) => void;
  loadMoreComments: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  addNewComment: (comment: CommentDTOPopulatedUser) => void;
  onDeleteComplete: (commentId: string) => void;
  onUpdateCommentComplete: (updatedComment: CommentDTOPopulatedUser) => void;
  comments: CommentDTOPopulatedUser[];
}

export const SinglePostContext = createContext<SinglePostContextType | null>(null);

export const SinglePostProvider = ({
  children,
  post: initialPost,
  comments: initialComments,
  limit,
}: {
  children: ReactNode;
  post: PostDTOPopulatedUser;
  comments?: CommentDTOPopulatedUser[];
  limit: number;
}) => {
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostDTOPopulatedUser>(initialPost);
  const [comments, setComments] = useState<CommentDTOPopulatedUser[]>(initialComments || []);

  const addNewComment = (newComment: CommentDTOPopulatedUser) => {
    setComments((prev) => [newComment, ...prev]);
    setPost((prevPost) => ({
      ...prevPost,
      commentsCount: (prevPost?.commentsCount || 0) + 1,
    }));
  };

  const collectDescendantIds = (targetId: string, list: CommentDTOPopulatedUser[]): Set<string> => {
    const ids = new Set<string>();
    const stack = [targetId];

    while (stack.length) {
      const current = stack.pop();
      if (!current || ids.has(current)) continue;

      ids.add(current);

      const children = list.filter((c) => c.parentId === current);

      for (const child of children) {
        stack.push(child._id);
      }
    }

    return ids;
  };

  const onDeleteComplete = (deletedCommentId: string) => {
    let idsToRemove;
    setComments((prevComments) => {
      const idsToRemoveSet = collectDescendantIds(deletedCommentId, prevComments);
      idsToRemove = Array.from(idsToRemoveSet);

      return prevComments.filter((comment) => !idsToRemoveSet.has(comment._id));
    });

    setPost((prevPost) => ({
      ...prevPost,
      commentsCount: Math.max((prevPost?.commentsCount || 0) - idsToRemove.length, 0),
    }));
  };

  const onUpdateCommentComplete = (updatedComment: CommentDTOPopulatedUser) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === updatedComment._id ? { ...comment, content: updatedComment.content } : comment
      )
    );
  };

  const onVoteComplete = (target: "post" | "comment", id: string, value: VoteValue) => {
    if (target === "post") {
      setPost((prev) => {
        if (!prev || prev._id !== id) return prev;

        const newUpVotes =
          value === 1 ? prev.upVotes + (prev.userVote === 1 ? 0 : 1) : prev.upVotes - (prev.userVote === 1 ? 1 : 0);

        const newDownVotes =
          value === -1
            ? prev.downVotes + (prev.userVote === -1 ? 0 : 1)
            : prev.downVotes - (prev.userVote === -1 ? 1 : 0);

        return {
          ...prev,
          upVotes: newUpVotes,
          downVotes: newDownVotes,
          userVote: value,
        };
      });
    }

    if (target === "comment") {
      setComments((prev) =>
        prev.map((comment) => {
          if (comment._id !== id) return comment;

          const newUpVotes =
            value === 1
              ? comment.upVotes + (comment.userVote === 1 ? 0 : 1)
              : comment.upVotes - (comment.userVote === 1 ? 1 : 0);

          const newDownVotes =
            value === -1
              ? comment.downVotes + (comment.userVote === -1 ? 0 : 1)
              : comment.downVotes - (comment.userVote === -1 ? 1 : 0);

          return {
            ...comment,
            upVotes: newUpVotes,
            downVotes: newDownVotes,
            userVote: value,
          };
        })
      );
    }
  };

  const loadMoreComments = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      const data = await getPostComments(post._id, {
        limit,
        page,
        populateUser: true,
      });

      if (
        !data ||
        (data && !isActionError(data) && data?.comments && data?.comments?.length === 0) ||
        isActionError(data)
      ) {
        setHasMore(false);
        return;
      } else {
        setComments((prev) => [...prev, ...(data.comments || [])]);
        setPage((prev) => prev + 1);
        if (data.comments.length < limit) setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  return (
    <SinglePostContext.Provider
      value={{
        post,
        onUpdateCommentComplete,
        onVoteComplete,
        loadMoreComments,
        hasMore,
        loading,
        addNewComment,
        comments,
        onDeleteComplete,
      }}
    >
      {children}
    </SinglePostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(SinglePostContext);
  if (!context) {
    throw new Error("usePost must be used within a SinglePostProvider");
  }
  return context;
};

