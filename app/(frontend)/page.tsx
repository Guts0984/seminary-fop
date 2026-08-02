import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";
import {
  SeminarDataWrapper,
  SeminarSearchParams,
} from "@/features/seminars/components/SeminarDataWrapper";

import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SeminarSearchParams>;
}) {
  const params = await searchParams;

  return (
    <section aria-labelledby="events-heading">
      <header className="my-14 md:my-16 space-y-3 flex flex-col items-center">
        <h1 id="events-heading" className="text-3xl font-medium">
          НАЙБЛИЖЧІ ЗАХОДИ
        </h1>
        <p className="text-secondary-foreground">Семінари, Вебінари, Записи</p>
      </header>

      <div className="py-8">
        <div className="flex gap-12">
          <CategoriesWrapper />

          {/* TODO: add suspense */}
          <div className="flex-1">
            <Suspense
              key={JSON.stringify(params)}
              fallback={<div>Loading...</div>}
            >
              <SeminarDataWrapper searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
