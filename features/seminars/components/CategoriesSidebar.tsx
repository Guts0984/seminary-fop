import { sanityFetch } from "@/sanity/lib/live";
import { getCategoriesQuery } from "../queries/getCategoriesQuery";
import CategoriesList from "./CategoriesList";

export default async function CategoriesSidebar() {
  const { data } = await sanityFetch({
    query: getCategoriesQuery,
  });

  return <CategoriesList categories={data} />;
}
