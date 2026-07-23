import { SeminarsList } from "@/features/seminars/components/SeminarsList";
import { getSeminarsQuery } from "@/features/seminars/queries/getSeminarsQuery";
import { sanityFetch } from "@/sanity/lib/live";
import { Suspense } from "react";

type SearchParams = {
  category?: string;
  start?: number;
  end?: number;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  console.log("params", params);

  return (
    <main className="p-6 mx-auto w-full ">
      <section aria-labelledby="events-heading">
        <header className="my-14 md:my-20 space-y-3 flex flex-col items-center">
          <h1 className="text-3xl">НАЙБЛИЖЧІ ЗАХОДИ</h1>
          <p className="text-secondary-foreground">
            Семінари, Вебінари, Записи
          </p>
        </header>

        {/* TODO: add suspense */}
        <Suspense key={JSON.stringify(params)} fallback={<div>Loading...</div>}>
          <SeminarDataWrapper searchParams={params} />
        </Suspense>
      </section>
    </main>
  );
}

async function SeminarDataWrapper({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const category = searchParams.category
    ? searchParams.category.split(",")
    : null;
  const start = searchParams.start ? Number(searchParams.start) : 0;
  const end = searchParams.end ? Number(searchParams.end) : 10;

  console.log("category", category);
  const { data } = await sanityFetch({
    query: getSeminarsQuery,
    params: { category, start, end },
  });
  return <SeminarsList data={data} />;
}
