import { notFound } from "next/navigation";

import { getAllRequests } from "@/lib/actions/request.actions";
import { isActionError } from "@/lib/utils";

import AdminUserRequests from "@/sections/admin/AdminUserRequests";
import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function adminPosts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams?.page) || 1;

  try {
    const results = await getAllRequests({
      limit: LIMIT,
      page,
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
        <AdminUserRequests
          limit={LIMIT}
          requests={results.requests}
          total={results.total}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading requests:", error);
    return <NotFound />;
  }
}

