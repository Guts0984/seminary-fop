import { defineQuery } from "next-sanity";

export const getPartnersQuery = defineQuery(`
  *[_type == "partner"] {
    "image": image.asset->url,
    link
  }
`);
