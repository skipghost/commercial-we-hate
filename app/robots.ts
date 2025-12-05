import type { MetadataRoute } from "next";

import { INFO } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "",
    },
    sitemap: `${INFO.WEBSITE_URL}/sitemap.xml`,
  };
}
