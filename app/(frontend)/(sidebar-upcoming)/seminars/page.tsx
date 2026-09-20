import type { Metadata } from "next";
import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";

export const metadata: Metadata = {
  title: "Семінари та вебінари",
  description:
    "Найближчі семінари та вебінари для спеціалістів: актуальні теми, досвідчені спікери, практичні відповіді.",
  alternates: { canonical: "/seminars" },
};
import { SeminarDataWrapper } from "@/features/seminars/components/SeminarDataWrapper";
import { SeminarsListSkeleton } from "@/features/seminars/components/SeminarsListSkeleton";
import { SeminarSearchParams } from "@/features/seminars/types";
import { Suspense } from "react";

export default async function SeminarsPage({
  searchParams,
}: {
  searchParams: Promise<SeminarSearchParams>;
}) {
  const params = await searchParams;

  return (
    <section aria-labelledby="events-heading" className="space-y-6">
      {/* Mobile Horizontal Carousel */}
      <div className="block md:hidden border-y py-3">
        <CategoriesWrapper variant="mobile" filterType="upcoming" />
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<SeminarsListSkeleton />}>
        <SeminarDataWrapper searchParams={params} filterType="upcoming" />
      </Suspense>

      <header className="space-y-2 text-center md:text-left -mt-4">
        <h1 id="events-heading" className="text-3xl font-medium">
          СЕМІНАРИ & ВЕБІНАРИ
        </h1>
        <p className="text-secondary-foreground">Найближчі події</p>
      </header>
    </section>
  );
}
