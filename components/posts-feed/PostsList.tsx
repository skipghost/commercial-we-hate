"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { LoadingSpinner } from "@/components/loading-spinner";

import { usePosts } from "@/context/PostsContext";

import PostCard from "./PostCard";

interface PostsListProps {
  hideCategory?: boolean;
}

const PostsList = ({ hideCategory = false }: PostsListProps) => {
  const [ref, inView] = useInView();

  const { hasMore, loadMorePosts, loading, posts } = usePosts();

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePosts();
    }
  }, [inView, hasMore, loadMorePosts]);

  return (
    <div className="flex flex-col">
      {loading && posts.length === 0 ? (
        <div
          className="flex justify-center my-20"
          ref={ref}
        >
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              hideCategory={hideCategory}
            />
          ))}
        </div>
      ) : !hasMore ? (
        <div className="flex flex-col items-center justify-center text-sm my-20">
          <Image
            src="/images/not-found.png"
            alt="No posts yet"
            width={100}
            height={100}
            className="h-14 object-contain opacity-50"
          />
          <p className="mt-2">No posts yet</p>
        </div>
      ) : null}
    </div>
  );
};

export default PostsList;

