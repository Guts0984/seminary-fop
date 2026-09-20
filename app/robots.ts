import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seminar-webinar.com.ua";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api", "/register"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
