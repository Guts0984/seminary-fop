import { defineQuery } from "next-sanity";

export const getCategoriesQuery = defineQuery(`
   *[
      _type == "category" &&
      count(*[
        _type == "seminar" &&
         status in ["upcoming", "recording"] &&
        references(^._id)
      ]) > 0
    ] {
      _id,
      title,
      "slug": slug.current
    }
`);
