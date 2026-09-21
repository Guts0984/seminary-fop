export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-12";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

//TODOS:
// SEO
// optimization
// db backup
// metadata dont work
// After deploy, manual steps left (I can't do these): submit https://<domain>/sitemap.xml in Google Search Console,
// fix revalidate webhook
// info@seminar-webinar.com.ua

// docker exec -it seminary-fop-postgres-1 psql "postgresql://user:password@localhost:5432/seminars-db"
