import { defineQuery } from "next-sanity";

export const seminarFields = `
  _id,
  title,
  subtitle,
  subtitle_main,
  "slug": slug.current,
  description,
  eventDates,
  eventTime,
  speakerLayout,
  location,
  type,
  category,
  schedule,
  discount,
  googleMap,
  price,
  youGet,
  youGetRight,
  "image": image.asset->url,
  "seo": {
    "title": coalesce(seo.title, pt::text(title), ""),
    "description": coalesce(seo.description, pt::text(subtitle), ""),
    "image": seo.image
  },
  speakers[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    bio,
    "photoUrl": photo.asset->url
  }
`;

const seminarDateFilter = `(
  ($filterType == "upcoming" && count(eventDates[@ >= $today]) > 0) ||
  ($filterType == "past" && count(eventDates[@ < $today]) == count(eventDates)) ||
  (!defined($filterType) || $filterType == "all")
)`;

export const getSeminarsQuery = defineQuery(`
  {
    "items": *[
      _type == "seminar"
      && defined(slug.current)
      && ${seminarDateFilter}
    ] | order(eventDates[0] desc) {
      ${seminarFields}
    },
    "total": count(*[
      _type == "seminar"
      && defined(slug.current)
      && ${seminarDateFilter}
    ])
  }
`);
