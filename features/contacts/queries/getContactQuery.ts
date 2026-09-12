import { defineQuery } from "next-sanity";

export const getContactQuery = defineQuery(/* groq */ `
  *[_type == "contact"][0] {
    phone,
    email,
    address,
    registerNumbers
  }
`);
