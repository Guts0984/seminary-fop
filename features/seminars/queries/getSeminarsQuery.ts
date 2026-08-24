import { defineQuery } from "next-sanity";

export const seminarFields = `
  _id,
  title,
  subtitle,
  "slug": slug.current,
  description,
  eventDates,
  eventTime,
  location,
  type,
  category,
  schedule,
  discount,
  googleMap,
  "image": image.asset->url,
  speakers[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    company,
    bio,
    "photoUrl": photo.asset->url
  }
`;

const seminarDateFilter = `(
  ($filterType == "future" && count(eventDates[dateTime(@) >= dateTime($now)]) > 0) ||
  ($filterType == "past" && count(eventDates[dateTime(@) < dateTime($now)]) == count(eventDates)) ||
  (!defined($filterType) || $filterType == "all")
)`;

export const getSeminarsQuery = defineQuery(`
  {
    "items": *[
      _type == "seminar"
      && defined(slug.current)
      && ${seminarDateFilter}
    ] | order(eventDates[0] desc) [$start...$end] {
      ${seminarFields}
    },
    "total": count(*[
      _type == "seminar"
      && defined(slug.current)
      && ${seminarDateFilter}
    ])
  }
`);
