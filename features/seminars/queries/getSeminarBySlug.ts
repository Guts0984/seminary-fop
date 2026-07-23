import { defineQuery } from "next-sanity";
import { seminarFields } from "./getSeminarsQuery";

export const getSeminarBySlug =
  defineQuery(`*[_type == "seminar" && slug.current == $slug][0]{
  ${seminarFields}
  }
`);

// lib/sanity/queries.ts
// import { defineQuery } from "next-sanity";
// import { sanityFetch } from "@/sanity/lib/live";

// const SEARCH_QUERY = defineQuery(`
//   *[_type in ["post", "seminar"] && (
//     title match $searchTerm + "*" ||
//     pt::text(description) match $searchTerm + "*"
//   )]
//   | score(title match $searchTerm)
//   | order(_score desc)[0..20] {
//     _id,
//     _type,
//     title,
//     "slug": slug.current,
//     // Extract a 150-character plain text preview snippet
//     "excerpt": coalesce(pt::text(description)[0..150], "")
//   }
// `);

// export async function getSearchResults(query: string) {
//   if (!query || query.trim() === "") return [];

//   const { data } = await sanityFetch({
//     query: SEARCH_QUERY,
//     params: { searchTerm: query.trim() },
//   });

//   return data;
// }
