import { Types } from "mongoose";
import { RedirectType, notFound, redirect } from "next/navigation";

import { getPostComments } from "@/lib/actions/comment.actions";
import { getPostById } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import UserPostPage from "@/sections/user-posts/UserPostPage";

import { Routes } from "@/constants/routes";

interface userPostProps {
  params: Promise<{ slug: string; username: string; postId: Types.ObjectId }>;
}

const LIMIT = 20;

export default async function userPost({ params }: userPostProps) {
  const { slug, postId } = await params;
  let post;
  try {
    post = await getPostById(postId);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!post || isActionError(post)) {
    notFound();
  } else {
    if (slug !== post.slug) {
      redirect(`${Routes.POSTS}/${post._id}/${post.slug}`, RedirectType.replace);
    }

    const result = await getPostComments(post._id, {
      limit: LIMIT,
      page: 1,
      populateUser: true,
    });

    return <UserPostPage {...{ post, comments: !isActionError(result) ? result?.comments : [], limit: LIMIT }} />;
  }
}

