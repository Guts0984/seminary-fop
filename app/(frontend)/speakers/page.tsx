import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Спікери",
  description:
    "Наші доповідачі — практикуючі експерти з податків, права та ведення бізнесу.",
  alternates: { canonical: "/speakers" },
};
import SpeakerList from "@/features/speakers/components/SpeakersList";
import { SpeakersListSkeleton } from "@/features/speakers/components/SpeakersListSkeleton";
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
    <div className="space-y-2">
      <Suspense key={JSON.stringify(params)} fallback={<SpeakersListSkeleton />}>
        <SpeakerDataWrapper searchParams={params} />
      </Suspense>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Доповідачі</h3>
        <Separator className="data-horizontal:h-1 bg-primary max-w-30" />
      </div>
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
    stega: false,
  });
  return <SpeakerList data={data} />;
}
