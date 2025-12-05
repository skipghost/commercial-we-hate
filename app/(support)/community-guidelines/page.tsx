import { WebPage, WithContext } from "schema-dts";

import CommunityGuidelines from "@/sections/community-guidelines";

import { INFO } from "@/constants";
import { JSONLD, META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";

const description = "";

const jsonLd: WithContext<WebPage> = {
  ...JSONLD,
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Community Guidelines",
  description,
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

export const metadata = {
  title: `Community Guidelines | ${INFO.BUSINESS_NAME}`,
  description,
  openGraph: {
    ...META_DATA.openGraph,
    url: INFO.WEBSITE_URL + Routes.PRIVACY_POLICY,
    title: `Community Guidelines | ${INFO.BUSINESS_NAME}`,
    description,
  },
  twitter: {
    ...META_DATA.twitter,
    title: `Community Guidelines | ${INFO.BUSINESS_NAME}`,
    description,
  },
};

export default function communityGuidelines() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommunityGuidelines />
    </>
  );
}

