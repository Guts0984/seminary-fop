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
// Speaker page add seminars in which participate / participated
// Logo
// Skeletons
// Footer
// Seminar page
// Delete blog
// Card component
// Redo filters
// Add image edit in filters bottom
// Finish text editor
// Make configs of text editor in their own file
// DropdownMenuIcons compoennt
// Get emails to sanity
// Registration field
// delete unused data in GROQ queries
// pagination
// 404
// for jew, for ....
// better sending emails popup
// footer rights reserved
// deployment
// proper cache
// recordings
// cleanup english names
// handle better typing and break into type files
// clean tailwind stuff
// check images compression
// client review for dates in seminar speaker slug
