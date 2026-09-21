import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getSeminarsQuery } from "../queries/getSeminarsQuery";
import { nowBucket } from "../helpers/nowBucket";
import { SeminarsList } from "./SeminarsList";
import { FilterType } from "../types";

export async function SeminarDataWrapper({
  filterType = "all",
}: {
  filterType?: FilterType;
}) {
  const data = await client.fetch(
    getSeminarsQuery,
    {
      filterType,
      today: nowBucket().slice(0, 10),
    },
    sanityCacheOptions,
  );
  return <SeminarsList data={data} />;
}
