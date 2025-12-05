import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { RedirectType, notFound, redirect } from "next/navigation";

import { getPostById } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import EditPostPage from "@/sections/edit-post";

import { Routes } from "@/constants/routes";

interface userPostProps {
  params: Promise<{ slug: string; username: string; postId: Types.ObjectId }>;
}

export default async function editPost({ params }: userPostProps) {
  const { slug, postId } = await params;
  let post, user;
  try {
    const { sessionClaims } = await auth();
    const userId = (sessionClaims?.metadata as { userId?: string })?.userId;

    post = await getPostById(postId);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!post || isActionError(post)) {
    notFound();
  } else {
    if (slug !== post.slug) {
      redirect(`${Routes.POSTS}/${post._id}/${post.slug}/edit`, RedirectType.replace);
    }
    return <EditPostPage {...{ post }} />;
  }
}

