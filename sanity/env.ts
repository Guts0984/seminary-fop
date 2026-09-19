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
// addverstisements
// redo footer
// archive to main page addon
// clean tailwind stuff
// speakers row col in seminar
// adds below seminars list
// fix map
// subscirbtion before adds
// about us at the bottom
// add partners
// header
// SEO
// db backup
// add tests

// docker exec -it seminary-fop-postgres-1 psql "postgresql://user:password@localhost:5432/seminars-db"
