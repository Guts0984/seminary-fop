import { Button } from "@/components/ui/button";
import { SeminarsList } from "@/features/seminars/components/SeminarsList";
import { getSeminars } from "@/features/seminars/queries/getSeminars";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="p-6 mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
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
  const seminars = await getSeminars();
  return <SeminarsList data={seminars} />;
}
