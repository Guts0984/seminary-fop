import { defineQuery } from "next-sanity";

export type SeminarFilterType = "future" | "past" | "all";

export const getSidebarSeminarsQuery = defineQuery(`
  *[_type == "seminar"
    && defined(slug.current)
    && (
      ($filterType == "future" && count(eventDates[dateTime(@) >= dateTime($now)]) > 0) ||
      ($filterType == "past" && count(eventDates[dateTime(@) < dateTime($now)]) == count(eventDates)) ||
      (!defined($filterType) || $filterType == "all")
    )
  ] | order(eventDates[0] desc) {
    _id,
    category,
    "slug": slug.current
  }
`);
