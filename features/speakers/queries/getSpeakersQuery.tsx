import { defineQuery } from "next-sanity";

export const speakerFields = `
  _id,
  name,
  "slug": slug.current,
  title,
  bio,
  "photo": photo.asset->url,
  "seminars": *[_type == "seminar" && references(^._id)] | order(eventDates[0] desc) {
    _id,
    title,
    "slug": slug.current,
    eventDates,
    "image": image.asset->url
  }
`;

export const getSpeakersQuery = defineQuery(`
  {
    "items": *[_type == "speaker"] | order(name asc) [$start...$end] {
      ${speakerFields}
    },
    "total": count(*[_type == "speaker"])
  }
`);
