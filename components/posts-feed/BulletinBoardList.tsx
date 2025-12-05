"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { Pin } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { formatTimeAgo } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { usePosts } from "@/context/PostsContext";
import { UserRoleEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";

import BulletinBoardPostActionsMenu from "../post-actions-menu/BulletinBoardPostActionsMenu";
import PostInteractionBar from "../post-interaction-bar";
import UserAvatar from "../user-avatar";

interface BulletinBoardListProps {
  hideCategory?: boolean;
}

interface PostCardProps {
  post: PostDTOPopulatedUser;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUser();
  const { onPostVoteComplete } = usePosts();

  return (
    <div className="border border-border  rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-ghost/30">
      {/* Header: Pinned + Title + User */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex">
          <UserAvatar
            size="sm"
            username={post?.user?.username!}
            imageUrl={post?.user?.photo!}
            className="font-semibold"
          />

          <div className="text-xs+ flex text-text-title items-center gap-2 before:w-1 before:h-1 before:rounded-full before:bg-black/40 pl-2 before:flex">
            {formatTimeAgo(post.createdAt)}
          </div>
        </div>

        {/* Only show actions if the user is the post owner */}
        {(post?.user?._id === user?.publicMetadata.userId ||
          user?.publicMetadata.role === UserRoleEnum.ADMIN ||
          user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
          <BulletinBoardPostActionsMenu {...{ post, username: post.user?.username }} />
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        {post.isPinned && <Pin className="text-primary w-4 h-4 mt-1 rotate-45" />}
        <Link href={`${Routes.POSTS}/${post._id}/${post.slug}`}>
          <h3 className="font-semibold text-base md:text-lg line-clamp-2">{post.title}</h3>
        </Link>
      </div>
      {/* Content */}
      {post.content && <p className="text-sm text-text-body line-clamp-4 mb-4">{post.content}</p>}

      {/* Interaction bar */}
      <PostInteractionBar {...{ post, onPostVoteComplete }} />
    </div>
  );
};

const BulletinBoardList = ({ hideCategory = false }: BulletinBoardListProps) => {
  const [ref, inView] = useInView();
  const { hasMore, loadMorePosts, loading, posts, togglePinPost } = usePosts();

  // Load more posts when in view
  useEffect(() => {
    if (inView && hasMore) {
      loadMorePosts();
    }
  }, [inView, hasMore, loadMorePosts]);

  // Sort pinned posts first
  const sortedPosts = [...posts].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="flex flex-col gap-6">
      {loading && posts.length === 0 && (
        <div
          ref={ref}
          className="flex justify-center my-20"
        >
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-500 rounded-full" />
        </div>
      )}

      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))
      ) : !hasMore ? (
        <div className="flex flex-col items-center justify-center text-sm my-20 opacity-50">
          <img
            src="/images/not-found.png"
            alt="No posts yet"
            className="h-14 object-contain"
          />
          <p className="mt-2">No posts yet</p>
        </div>
      ) : null}

      {/* Ref for infinite scroll */}
      <div ref={ref} />
    </div>
  );
};

export default BulletinBoardList;

