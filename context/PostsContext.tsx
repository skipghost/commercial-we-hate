"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getAllPosts } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import postCategories from "@/constants/postCategories";

import { PostCategoryEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";
import { VoteValue } from "@/types/vote.types";

import { useMode } from "./ModeContext";

interface PostsContextType {
  posts: PostDTOPopulatedUser[];
  loadMorePosts: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  onPostVoteComplete: (postId: string, value: VoteValue, target?: "post" | "comment", commentId?: string) => void;
  togglePinPost: (postId: string) => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider = ({
  children,
  posts: initialPosts = [],
  limit = 5,
  populateComments,
}: {
  children: ReactNode;
  posts?: PostDTOPopulatedUser[];
  limit?: number;
  populateComments?: boolean;
}) => {
  const [posts, setPosts] = useState<PostDTOPopulatedUser[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { username, slug } = useParams();
  const { mode } = useMode();

  const validCategories = new Set(postCategories.map((item) => item.value));
  const isPopular = slug === "popular";
  const isAdminCreated = slug === "admin-selections";
  const isBulletin = slug === "bulletin-board";

  const isValidCategory = validCategories.has(slug as PostCategoryEnum);

  const fetchPosts = useCallback(
    async (pageToFetch: number, reset = false) => {
      setLoading(true);
      try {
        const data = await getAllPosts({
          limit,
          page: pageToFetch,
          username: username as string,
          populateUser: true,
          type: mode,
          popular: isPopular,
          category: isValidCategory ? (slug as PostCategoryEnum) : undefined,
          isAdminCreated,
          isBulletin,
          populateComments,
        });

        if (!data || isActionError(data) || data.posts.length === 0) {
          if (reset) setPosts([]);
          setHasMore(false);
          return;
        }

        setPosts((prev) => {
          const newPosts = reset ? data.posts : [...prev, ...data.posts];
          const uniquePostsMap = new Map<string, PostDTOPopulatedUser>();
          newPosts.forEach((p) => uniquePostsMap.set(p._id, p));
          return Array.from(uniquePostsMap.values());
        });

        setPage(pageToFetch + 1);
        if (data.posts.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    },
    [mode, username, slug, limit, isPopular, isValidCategory]
  );

  // Load first page whenever mode, username, or slug changes
  useEffect(() => {
    if (!mode) return;
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(1, true);
  }, [mode, username, slug, fetchPosts]);

  const loadMorePosts = useCallback(() => fetchPosts(page, false), [fetchPosts, page]);

  const onPostVoteComplete = useCallback(
    (postId: string, value: VoteValue, target: "post" | "comment" = "post", commentId?: string) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id !== postId) return post;

          // Handle post vote
          if (target === "post") {
            let upVotes = post.upVotes;
            let downVotes = post.downVotes;
            let newVote: 1 | -1 | null = value;

            if (post.userVote === value) {
              if (value === 1) upVotes -= 1;
              if (value === -1) downVotes -= 1;
              newVote = null;
            } else {
              if (value === 1) {
                upVotes += 1;
                if (post.userVote === -1) downVotes -= 1;
              } else {
                downVotes += 1;
                if (post.userVote === 1) upVotes -= 1;
              }
            }

            return { ...post, upVotes, downVotes, userVote: newVote };
          }

          // Handle comment vote
          if (target === "comment" && commentId) {
            const updatedComments = post.latestComments?.map((comment) => {
              if (comment._id !== commentId) return comment;

              let upVotes = comment.upVotes;
              let downVotes = comment.downVotes;
              let newVote: 1 | -1 | null = value;

              if (comment.userVote === value) {
                if (value === 1) upVotes -= 1;
                if (value === -1) downVotes -= 1;
                newVote = null;
              } else {
                if (value === 1) {
                  upVotes += 1;
                  if (comment.userVote === -1) downVotes -= 1;
                } else {
                  downVotes += 1;
                  if (comment.userVote === 1) upVotes -= 1;
                }
              }

              return { ...comment, upVotes, downVotes, userVote: newVote };
            });

            return { ...post, latestComments: updatedComments };
          }

          return post;
        })
      );
    },
    []
  );

  const togglePinPost = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;
        return { ...post, isPinned: !post.isPinned };
      })
    );
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loadMorePosts, hasMore, loading, onPostVoteComplete, togglePinPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context;
};

