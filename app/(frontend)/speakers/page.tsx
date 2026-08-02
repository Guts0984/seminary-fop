import SpeakerList from "@/features/speakers/components/SpeakerList";
import { getSpeakersQuery } from "@/features/speakers/queries/getSpeakersQuery";
import { sanityFetch } from "@/sanity/lib/live";
import { Suspense } from "react";

type SearchParams = {
  start?: string;
  end?: string;
};

export default async function SpeakerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div>
      <h1>Speakers</h1>
      <Suspense key={JSON.stringify(params)} fallback={<div>Loading...</div>}>
        <SpeakerDataWrapper searchParams={params} />
      </Suspense>
    </div>
  );
}

async function SpeakerDataWrapper({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const start = searchParams.start ? Number(searchParams.start) : 0;
  const end = searchParams.end ? Number(searchParams.end) : 10;

  const { data } = await sanityFetch({
    query: getSpeakersQuery,
    params: { start, end },
  });
  return <SpeakerList data={data} />;
}
