import { sanityFetch } from "@/sanity/lib/live";
import { SeminarSearchParams } from "../../types";
import { getSeminarsQuery } from "../../queries/getSeminarsQuery";
import { nowBucket } from "../../helpers/nowBucket";
import { SeminarsList } from "../SeminarsList";

export async function RecordingsDataWrapper({
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
      filterType: "past",
      today: nowBucket().slice(0, 10),
    },
    stega: false,
  });
  return <SeminarsList data={data} />;
}
