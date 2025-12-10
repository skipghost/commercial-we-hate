import { WebPage, WithContext } from "schema-dts";

import CookiePolicy from "@/sections/cookie-policy";

import { INFO } from "@/constants";
import { JSONLD, META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";

const description =
  "Learn how Commercials We Hate uses cookies to enhance your browsing experience, personalize content, and improve site functionality.";

const jsonLd: WithContext<WebPage> = {
  ...JSONLD,
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  description,
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

export const metadata = {
  title: `Cookie Policy | ${INFO.BUSINESS_NAME}`,
  description,
  openGraph: {
    ...META_DATA.openGraph,
    url: INFO.WEBSITE_URL + Routes.PRIVACY_POLICY,
    title: `Cookie Policy | ${INFO.BUSINESS_NAME}`,
    description,
  },
  twitter: {
    ...META_DATA.twitter,
    title: `Cookie Policy | ${INFO.BUSINESS_NAME}`,
    description,
  },
};

export default function cookiePolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CookiePolicy />
    </>
  );
}

