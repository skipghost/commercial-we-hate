import NotFound from "@/sections/not-found";

import PostsFeedPage from "@/components/posts-feed";
import BulletinBoardPage from "@/components/posts-feed/BulletinBoardPage";

import { INFO } from "@/constants";
import { JSONLD } from "@/constants/meta";
import postCategories from "@/constants/postCategories";

import { PostCategoryEnum } from "@/types/enums";

type Props = {
  params: Promise<{
    slug: PostCategoryEnum & "popular";
  }>;
};

const jsonLd = {
  ...JSONLD,
  name: INFO.BUSINESS_NAME,
};

const LIMIT = 10;
const validCategories = new Set(postCategories.map((item) => item.value));

export default async function HomePage({ params }: Props) {
  const { slug } = await params;

  const isPopular = slug === "popular";
  const isAdminCreated = slug === "admin-selections";
  const isBulletinBoard = slug === "bulletin-board";
  const isValidCategory = validCategories.has(slug);

  if (!isPopular && !isValidCategory && !isAdminCreated && !isBulletinBoard) {
    return <NotFound />;
  }

  try {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {isBulletinBoard ? (
          <BulletinBoardPage limit={LIMIT} />
        ) : (
          <PostsFeedPage
            limit={LIMIT}
            hideCategory={!isPopular}
            slug={slug}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return <NotFound />;
  }
}

