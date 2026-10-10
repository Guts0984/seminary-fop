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
// margin from images
// fix on main seminar cards data
// speaker more gap
// sort by user, not ssytem in sidebar
// change size for program in slug semianr
// create blue text
// speaker not fat, PIB spekaer fat
// change colors on website
// fix recordings, do now show recordings
// fix revalidate webhook
// db backup

// docker exec -it seminary-fop-postgres-1 psql "postgresql://user:password@localhost:5432/seminars-db"
