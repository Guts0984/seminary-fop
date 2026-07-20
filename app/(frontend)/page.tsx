import { Button } from "@/components/ui/button";
import { SeminarsList } from "@/features/seminars/components/SeminarsList";
import { getSeminarsQuery } from "@/features/seminars/queries/getSeminarsQuery";
import { client } from "@/sanity/lib/client";

import { Suspense } from "react";

const options = { next: { revalidate: 60 } };

export default async function Home() {
  return (
    <main className="p-6 mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight ">
          Seminars & Webinars
        </h1>
        <Button className="mt-4">Filter</Button>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <SeminarDataWrapper />
      </Suspense>
    </main>
  );
}

async function SeminarDataWrapper() {
  const seminars = await client.fetch(
    getSeminarsQuery,
    { status: null, category: null, type: null, start: 0, end: 10 },
    options,
  );
  return <SeminarsList data={seminars} />;
}
