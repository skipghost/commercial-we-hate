import type { Metadata } from "next";

import { INFO } from ".";

const META_TITLE = "";
const META_DESCRIPTION = "";

export const META_DATA = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  metadataBase: new URL(INFO.WEBSITE_URL),
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: INFO.WEBSITE_URL,
    siteName: INFO.BUSINESS_NAME,
    phoneNumbers: [INFO.PHONE_NUMBER],
    images: ["/opengraph-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    card: "summary_large_image",
    site: "@",
    images: ["/twitter-image.jpg"],
  },
  keywords: [],
} as Metadata;

export const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  mainEntity: {
    "@type": "Organization",
    "@id": `${INFO.WEBSITE_URL}/#organization`,
    name: INFO.BUSINESS_NAME,
    url: INFO.WEBSITE_URL,
    logo: `${INFO.WEBSITE_URL}/logo.png`,
    email: INFO.EMAIL_ADDRESS,
    telephone: `${INFO.PHONE_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "US",
    },
    description: META_DESCRIPTION,
  },
  publisher: {
    "@type": "Organization",
    name: INFO.BUSINESS_NAME,
  },
};

