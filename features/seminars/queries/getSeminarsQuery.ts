import { defineQuery } from "next-sanity";

export const seminarFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  eventDates,
  location,
  status,
  type,
  category[]->{
    _id,
    title,
    "slug": slug.current
  },
  googleMap,
  "image": image.asset->url,
  speakers[]->{
    _id,
    name,
    slug,
    title,
    company,
    bio,
    "photoUrl": photo.asset->url
  }
`;

export const getSeminarsQuery = defineQuery(`
  {
    "items": *[
      _type == "seminar"
      && status in ["upcoming", "recording"]
      && (!defined($category) || count((category[]->slug.current)[@ in $category]) > 0)
    ] | order(eventDates[0] desc) [$start...$end] {
      ${seminarFields}
    },
    "total": count(*[
      _type == "seminar"
      && status in ["upcoming", "recording"]
      && (!defined($category) || count((category[]->slug.current)[@ in $category]) > 0)
    ])
  }
`);
