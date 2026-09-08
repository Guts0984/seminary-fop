import { defineQuery } from "next-sanity";

export type SeminarFilterType = "upcoming" | "past" | "all";

export const getSidebarSeminarsQuery = defineQuery(`
  *[_type == "seminar"
    && defined(slug.current)
    && (
      ($filterType == "upcoming" && count(eventDates[@ >= $today]) > 0) ||
      ($filterType == "past" && count(eventDates[@ < $today]) == count(eventDates)) ||
      (!defined($filterType) || $filterType == "all")
    )
  ] | order(eventDates[0] desc) {
    _id,
    category,
    "slug": slug.current
  }
`);
