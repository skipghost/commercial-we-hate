import { notFound } from "next/navigation";

import { getUsers } from "@/lib/actions/user.actions";
import { isActionError } from "@/lib/utils";

import AdminUsers from "@/sections/admin/AdminUsers";
import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function adminUsers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  try {
    const results = await getUsers({
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
        <AdminUsers
          limit={LIMIT}
          users={results.users}
          total={results.total}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return <NotFound />;
  }
}

