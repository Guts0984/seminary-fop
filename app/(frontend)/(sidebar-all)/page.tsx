// app/page.tsx
import type { Metadata } from "next";
import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";

export const metadata: Metadata = {
  title: { absolute: "Seminars & Webinars — семінари та вебінари для спеціалістів" },
  description:
    "Практичні семінари, вебінари та записи тренінгів для спеціалістів: актуальні зміни законодавства, податки, практичні кейси.",
  alternates: { canonical: "/" },
};
import { SeminarDataWrapper } from "@/features/seminars/components/SeminarDataWrapper";
import { SeminarsListSkeleton } from "@/features/seminars/components/SeminarsListSkeleton";
import { SeminarSearchParams } from "@/features/seminars/types";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SeminarSearchParams>;
}) {
  const params = await searchParams;

  return (
    <section aria-labelledby="events-heading" className="space-y-6">
      {/* Mobile Horizontal Carousel */}
      <div className="block md:hidden border-y py-3">
        <CategoriesWrapper variant="mobile" />
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<SeminarsListSkeleton />}>
        <SeminarDataWrapper searchParams={params} />
      </Suspense>

      <header className="space-y-2 text-center md:text-left -mt-4">
        <h1 id="events-heading" className="text-3xl font-medium">
          НАЙБЛИЖЧІ ЗАХОДИ
        </h1>
        <p className="text-secondary-foreground">Семінари, Вебінари, Записи</p>
      </header>
    </section>
  );
}
