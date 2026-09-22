// Shared cache options for all Sanity reads on the frontend.
// Production: responses live in the Next.js Data Cache and are purged on
// Studio changes via the /api/revalidate webhook (revalidateTag "sanity").
// Development: no caching, so local edits in Studio show up immediately
// (the webhook only points at the production domain).
export const sanityCacheOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { cache: "force-cache" as const, next: { tags: ["sanity"] as string[] } };
//
