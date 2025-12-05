import { notFound } from "next/navigation";

import { getPostById } from "@/lib/actions/post.actions";
import { getAllReports } from "@/lib/actions/report.actions";
import { isActionError } from "@/lib/utils";

import AdminPostReports from "@/sections/admin/AdminPostReports";
import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function adminPosts({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ postId: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { postId } = await params;

  const postResult = await getPostById(postId);

  if (!postResult || isActionError(postResult)) {
    notFound();
  }

  const page = Number(resolvedSearchParams?.page) || 1;

  try {
    const results = await getAllReports({
      limit: LIMIT,
      page,
      postId,
      populateUser: true,
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
        <AdminPostReports
          limit={LIMIT}
          post={postResult}
          reports={results.reports}
          total={results.total}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return <NotFound />;
  }
}

