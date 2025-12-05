import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import AdminPosts from "@/sections/admin/AdminPosts";
import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function adminPostsSelection({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  try {
    const results = await getAllPosts({
      limit: LIMIT,
      populateUser: true,
      populateCommentsCount: true,
      page,
      isAdminCreated: true,
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
        <AdminPosts
          limit={LIMIT}
          posts={results.posts}
          total={results.total}
          title="Admin Selections"
        />
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return <NotFound />;
  }
}

