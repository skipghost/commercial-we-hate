import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { notFound } from "next/navigation";

import { getPostById } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import EditAdminBulletinPostPage from "@/sections/admin/EditAdminBulletinPostPage";

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
    return <EditAdminBulletinPostPage {...{ user, post }} />;
  }
}

