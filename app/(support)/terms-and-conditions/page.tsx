import { WebPage, WithContext } from "schema-dts";

import TermsAndConditions from "@/sections/terms-and-conditions";

import { INFO } from "@/constants";
import { JSONLD, META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";

const description = "";

const jsonLd: WithContext<WebPage> = {
  ...JSONLD,
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms and Conditions",
  description,
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

export const metadata = {
  title: `Terms and Conditions | ${INFO.BUSINESS_NAME}`,
  description,
  openGraph: {
    ...META_DATA.openGraph,
    url: INFO.WEBSITE_URL + Routes.PRIVACY_POLICY,
    title: `Terms and Conditions | ${INFO.BUSINESS_NAME}`,
    description,
  },
  twitter: {
    ...META_DATA.twitter,
    title: `Terms and Conditions | ${INFO.BUSINESS_NAME}`,
    description,
  },
};

export default function terms() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsAndConditions />
    </>
  );
}

