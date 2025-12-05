import { Types } from "mongoose";
import { RedirectType, notFound, redirect } from "next/navigation";

import { getPostById } from "@/lib/actions/post.actions";
import { getUserByUsername } from "@/lib/actions/user.actions";
import { isActionError } from "@/lib/utils";

import { Routes } from "@/constants/routes";

interface userPostProps {
  params: Promise<{ slug: string; username: string; postId: Types.ObjectId }>;
}

export default async function userPost({ params }: userPostProps) {
  const { username, postId } = await params;

  try {
    const user = await getUserByUsername(username);

    const post = await getPostById(postId);

    if (!post || isActionError(post)) {
      notFound();
    }

    redirect(`${Routes.POSTS}/${post._id}/${post.slug}`, RedirectType.replace);
  } catch (error) {
    console.error(error);
    notFound();
  }
}

