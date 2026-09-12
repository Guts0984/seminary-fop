import { sanityFetch } from "@/sanity/lib/live";
import { getContactQuery } from "../queries/getContactQuery";

export async function getContact() {
  const { data } = await sanityFetch({ query: getContactQuery });
  return data;
}
