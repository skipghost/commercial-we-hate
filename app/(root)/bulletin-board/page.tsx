import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import AdminBulletinBoard from "@/sections/admin/AdminBulletinBoard";
import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function adminBulletinBoard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  try {
    const results = await getAllPosts({
      limit: LIMIT,
      populateCommentsCount: true,
      page,
      populateUser: true,
      isBulletin: true,
    });

    if (!results || isActionError(results)) {
      notFound();
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AdminBulletinBoard
          limit={LIMIT}
          posts={results.posts}
          total={results.total}
          title="Admin Bulletin Board"
        />
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return <NotFound />;
  }
}

