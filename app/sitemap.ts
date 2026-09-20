import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { sitemapQuery } from "@/sanity/lib/queries";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seminar-webinar.com.ua";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/seminars`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/speakers`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/contacts`, changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(sitemapQuery);

    const contentRoutes: MetadataRoute.Sitemap = paths.map((path) => ({
      url: `${baseUrl}${path.href}`,
      lastModified: new Date(path._updatedAt),
      changeFrequency: path._type === "seminar" ? "weekly" : "monthly",
      priority: path._type === "seminar" ? 0.8 : 0.6,
    }));

    return [...staticRoutes, ...contentRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return staticRoutes;
  }
}
