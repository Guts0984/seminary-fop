import { defineQuery } from "next-sanity";
import { seminarFields } from "./getSeminarsQuery";

export const getSeminarBySlug =
  defineQuery(`*[_type == "seminar" && slug.current == $slug][0]{
  ${seminarFields}
  }
`);
