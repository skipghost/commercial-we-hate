"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { formatTimeAgo } from "@/lib/utils";

import UserAvatar from "@/components/user-avatar";
import VideoPlayer from "@/components/video-player";

import { Routes } from "@/constants/routes";

import { usePosts } from "@/context/PostsContext";
import { UserRoleEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";

import PostActionsMenu from "../post-actions-menu";
import PostInteractionBar from "../post-interaction-bar";
import PostCategory from "./PostCategory";

interface PostCardProps {
  post: PostDTOPopulatedUser;
  hideCategory?: boolean;
}

const PostCard = ({ post, hideCategory = false }: PostCardProps) => {
  const { user } = useUser();
  const { onPostVoteComplete } = usePosts();

  console.log(
    post.title,
    post?.user?._id === user?.publicMetadata.userId ||
      user?.publicMetadata.role === UserRoleEnum.ADMIN ||
      user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col sm:flex-row gap-y-2">
            <UserAvatar
              size="sm"
              username={post?.user?.username!}
              imageUrl={post?.user?.photo!}
              className="font-semibold"
            />

            <div className="text-xs+ flex text-text-title items-center gap-2 sm:before:w-1 sm:before:h-1 sm:before:rounded-full sm:before:bg-black/40 sm:pl-2 sm:before:flex">
              {formatTimeAgo(post.createdAt)}
            </div>
          </div>

          {(post?.user?._id === user?.publicMetadata.userId ||
            user?.publicMetadata.role === UserRoleEnum.ADMIN ||
            user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
            <PostActionsMenu {...{ post, username: post.user?.username }} />
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-y-4 gap-x-10 transition-all duration-300">
          <div className="lg:w-[400px]">
            {post.videoUrl && (
              <VideoPlayer
                videoUrl={post.videoUrl}
                className="h-[16rem] min-h-[16rem] md:h-[20rem] md:min-h-[20rem] lg:h-[16rem] lg:min-h-[16rem]"
              />
            )}
          </div>

          <div className="flex gap-4 flex-col justify-between flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-md:flex-wrap">
                <Link
                  href={`${Routes.POSTS}/${post._id}/${post.slug}`}
                  className="w-fit"
                >
                  <h3 className="text-base md:text-lg font-medium line-clamp-3">{post.title}</h3>
                </Link>

                {!hideCategory && <PostCategory category={post.category} />}
              </div>

              {post.content && (
                <Link href={`${Routes.POSTS}/${post._id}/${post.slug}`}>
                  <p className="text-sm sm:text-sm+ text-text-title line-clamp-3 mb-4">{post.content}</p>
                </Link>
              )}
            </div>

            <PostInteractionBar {...{ post, onPostVoteComplete }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;

