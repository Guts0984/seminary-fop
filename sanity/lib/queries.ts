import { defineQuery } from "next-sanity";

export const sitemapQuery = defineQuery(`
  *[_type in ["seminar", "speaker"] && defined(slug.current)] {
    "href": select(
      _type == "seminar" => "/seminars/" + slug.current,
      _type == "speaker" => "/speakers/" + slug.current
    ),
    _type,
    _updatedAt
  }
`);
