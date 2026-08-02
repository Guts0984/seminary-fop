import { defineQuery } from "next-sanity";
import { speakerFields } from "./getSpeakersQuery";

export const getSpeakerBySlug = defineQuery(`
  *[_type == "speaker" && slug.current == $slug][0]{
    ${speakerFields}
  }
`);
