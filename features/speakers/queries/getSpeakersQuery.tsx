import { defineQuery } from "next-sanity";

export const speakerFields = `
  _id,
  name,
  "slug": slug.current,
  title,
  bio,
  "photo": photo.asset->url,
  "seo": {
    "title": coalesce(seo.title, name, ""),
    "description": coalesce(seo.description, pt::text(title), ""),
    "image": seo.image
  },
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
    "items": *[_type == "speaker"] | order(name asc) {
      ${speakerFields}
    },
    "total": count(*[_type == "speaker"])
  }
`);
