import { defineQuery } from "next-sanity";

export const getContactQuery = defineQuery(`
  *[_type == "contact"][0] {
    phone,
    email,
    address,
    registerNumbers
  }
`);
