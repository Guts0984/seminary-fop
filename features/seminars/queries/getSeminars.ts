import { defineQuery } from "next-sanity";

export const seminarFields = `
  _id,
  title,
  slug,
  description,
  eventDates,
  price,
  location,
  status,
  type,
  category,
  thumbnail,
  speakers[]->{
    _id,
    name,
    slug,
    title,
    company,
    bio,
    photo
  }
`;

export const getSeminarsQuery = defineQuery(`
  {
    "items": *[
      _type == "seminar"
      && (!defined($status) || status == $status)
      && (!defined($category) || count(category[@ in $category]) > 0)
      && (!defined($type) || count(type[@ in $type]) > 0)
    ] | order(eventDates[0] desc) [$start...$end] {
      ${seminarFields}
    },
    "total": count(*[
      _type == "seminar"
      && (!defined($status) || status == $status)
      && (!defined($category) || count(category[@ in $category]) > 0)
      && (!defined($type) || count(type[@ in $type]) > 0)
    ])
  }
`);
