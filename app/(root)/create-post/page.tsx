import type { Metadata } from "next";
import { WebPage, WithContext } from "schema-dts";

import SubmitPage from "@/sections/create-post";

import { INFO } from "@/constants";
import { JSONLD, META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";

const description =
  "Submit your favorite or most hated commercials on CommercialsWeHate. Join the community to post links, vote, and comment on commercials shared by others. Be part of the ultimate commercial critique platform.";

const jsonLd: WithContext<WebPage> = {
  ...JSONLD,
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Create Post",
  description,
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

export const metadata: Metadata = {
  title: `Create Post | ${INFO.BUSINESS_NAME}`,
  description,
  openGraph: {
    ...META_DATA.openGraph,
    url: INFO.WEBSITE_URL + Routes.CREATE_POST,
    title: `Create Post | ${INFO.BUSINESS_NAME}`,
    description,
  },
  twitter: {
    ...META_DATA.twitter,
    title: `Create Post | ${INFO.BUSINESS_NAME}`,
    description,
  },
};

export default function createPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubmitPage />
    </>
  );
}

