import { defineQuery } from "next-sanity";

export const getSidebarSeminarsQuery = defineQuery(`
  *[_type == "seminar"
    && defined(slug.current)
    && status in ["upcoming", "recording"]
  ] | order(eventDates[0] desc) {
    _id,
    category,
    "slug": slug.current
  }
`);
