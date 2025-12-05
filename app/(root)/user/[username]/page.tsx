import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/actions/post.actions";
import { getUserByUsername } from "@/lib/actions/user.actions";
import { isActionError } from "@/lib/utils";

import PostsFeedPage from "@/components/posts-feed";

interface userPostProps {
  params: Promise<{ slug: string; username: string }>;
}

const LIMIT = 10;

export default async function userPosts({ params }: userPostProps) {
  const { username } = await params;

  try {
    const user = await getUserByUsername(username);

    if (!user || isActionError(user)) {
      notFound();
    }

    const data = await getAllPosts({
      username,
      populateUser: true,
      limit: LIMIT,
    });

    if (!data || isActionError(data)) {
      notFound();
    }

    return <PostsFeedPage {...{ user, posts: data.posts, limit: LIMIT, page: data.page }} />;
  } catch (error) {
    notFound();
  }
}

