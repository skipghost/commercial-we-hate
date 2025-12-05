import { WebPage, WithContext } from "schema-dts";

import Disclaimer from "@/sections/disclaimer";

import { INFO } from "@/constants";
import { JSONLD, META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";

const description = "";

const jsonLd: WithContext<WebPage> = {
  ...JSONLD,
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer",
  description,
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

export const metadata = {
  title: `Disclaimer | ${INFO.BUSINESS_NAME}`,
  description,
  openGraph: {
    ...META_DATA.openGraph,
    url: INFO.WEBSITE_URL + Routes.PRIVACY_POLICY,
    title: `Disclaimer | ${INFO.BUSINESS_NAME}`,
    description,
  },
  twitter: {
    ...META_DATA.twitter,
    title: `Disclaimer | ${INFO.BUSINESS_NAME}`,
    description,
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Disclaimer />
    </>
  );
}

