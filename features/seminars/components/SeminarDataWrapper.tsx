import { sanityFetch } from "@/sanity/lib/live";
import { getSeminarsQuery } from "../queries/getSeminarsQuery";
import { SeminarsList } from "./SeminarsList";
import { SeminarSearchParams } from "../types";

export async function SeminarDataWrapper({
  searchParams,
}: {
  searchParams: SeminarSearchParams;
}) {
  const category = searchParams.category
    ? searchParams.category.split(",")
    : null;
  const start = searchParams.start ? Number(searchParams.start) : 0;
  const end = searchParams.end ? Number(searchParams.end) : 10;

  const { data } = await sanityFetch({
    query: getSeminarsQuery,
    params: {
      category,
      start,
      end,
      filterType: "all",
      now: new Date().toISOString(),
    },
  });
  return <SeminarsList data={data} />;
}
