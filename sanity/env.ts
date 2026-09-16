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
// add newsletter field to contact page
// color header
// register send email
// send email to sp urk net about registration
// speaker row or col in seminar
// fix all that ai slop in tools etc
// add tests
// Register button
// addverstisements
// archive to main page addon
// clean tailwind stuff
// speakers row col in seminar
// adds below seminars list
// fix map
// subscirbtion before adds
// about us at the bottom
// header
// SEO
// db backup

// docker exec -it seminary-fop-postgres-1 psql "postgresql://user:password@localhost:5432/seminars-db"
