import { sanityFetch } from "@/sanity/lib/live";
import { getSeminarsQuery } from "../queries/getSeminarsQuery";
import { SeminarsList } from "./SeminarsList";

export type SeminarSearchParams = {
  category?: string;
  start?: number;
  end?: number;
};

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
    params: { category, start, end },
  });
  return <SeminarsList data={data} />;
}
