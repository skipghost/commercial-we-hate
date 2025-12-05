import NotFound from "@/sections/not-found";

import PostsFeedPage from "@/components/posts-feed";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;

export default async function HomePage() {
  try {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostsFeedPage limit={LIMIT} />
      </>
    );
  } catch (err) {
    console.error("Unexpected error in HomePage:", err);
    return <NotFound />;
  }
}

