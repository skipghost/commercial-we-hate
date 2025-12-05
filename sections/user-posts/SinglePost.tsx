"use client";

import { useUser } from "@clerk/nextjs";

import { cn, findLabelByValue, formatTimeAgo } from "@/lib/utils";

import PostActionsMenu from "@/components/post-actions-menu";
import PostCommentsSection from "@/components/post-comments-section";
import PostInteractionBar from "@/components/post-interaction-bar";
import PostLink from "@/components/post-link";
import PostCategory from "@/components/posts-feed/PostCategory";
import UserAvatar from "@/components/user-avatar";
import VideoPlayer from "@/components/video-player";

import postCategories from "@/constants/postCategories";

import { usePost } from "@/context/SinglePostContext";
import { UserRoleEnum } from "@/types/enums";

interface SinglePostProps {}

const SinglePost = ({}: SinglePostProps) => {
  const { post, onVoteComplete } = usePost();
  const { user } = useUser();
  const categoryLabel = findLabelByValue(postCategories, post.category);

  return (
    <>
      <div className="flex justify-between">
        <div className={cn("flex gap-y-2 items-start flex-wrap", !post?.user?.username && "items-center")}>
          <UserAvatar {...{ imageUrl: post?.user?.photo!, username: post?.user?.username! }} />

          <div className="mt-1 text-xs+ flex text-gray-500 items-center gap-2 before:w-1 before:h-1 before:rounded-full before:bg-black/40 pl-2 before:flex">
            {formatTimeAgo(post.createdAt)}
          </div>
        </div>

        {(post?.user?._id === user?.publicMetadata.userId ||
          user?.publicMetadata.role === UserRoleEnum.ADMIN ||
          user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
          <PostActionsMenu {...{ post, redirectHome: true }} />
        )}
      </div>
      <div className="mt-4">
        <div className="mb-4 flex justify-between gap-x-2 gap-y-2 max-md:flex-wrap">
          <h1 className="text-lg md:text-xl leading-normal line-clamp-4 font-semibold">{post.title}</h1>

          {categoryLabel && <PostCategory category={post.category} />}
        </div>
        {post.videoUrl && (
          <VideoPlayer
            videoUrl={post.videoUrl}
            className="mb-4 lg:h-[28rem] lg:min-h-[28rem]"
          />
        )}
        {post.content && <p className="mb-5">{post.content}</p>}
        {post.url && (
          <PostLink
            url={post.url}
            className="mb-5"
          />
        )}
        <PostInteractionBar
          {...{ post, onPostVoteComplete: (postId, value) => onVoteComplete("post", postId, value) }}
        />
        <PostCommentsSection />
      </div>
    </>
  );
};

export default SinglePost;

