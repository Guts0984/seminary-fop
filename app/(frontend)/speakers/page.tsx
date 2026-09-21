import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import SpeakerList from "@/features/speakers/components/SpeakersList";
import { SpeakersListSkeleton } from "@/features/speakers/components/SpeakersListSkeleton";
import { getSpeakersQuery } from "@/features/speakers/queries/getSpeakersQuery";
import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Спікери",
  description:
    "Наші доповідачі — практикуючі експерти з податків, права та ведення бізнесу.",
  alternates: { canonical: "/speakers" },
};

export default async function SpeakerPage() {
  return (
    <div className="space-y-2">
      <Suspense fallback={<SpeakersListSkeleton />}>
        <SpeakerDataWrapper />
      </Suspense>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Доповідачі</h3>
        <Separator className="data-horizontal:h-1 bg-primary max-w-30" />
      </div>
    </div>
  );
}

async function SpeakerDataWrapper() {
  const data = await client.fetch(getSpeakersQuery, {}, sanityCacheOptions);
  return <SpeakerList data={data} />;
}
