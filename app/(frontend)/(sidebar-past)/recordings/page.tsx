import type { Metadata } from "next";
import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";

export const metadata: Metadata = {
  title: "Записи семінарів",
  description:
    "Записи минулих семінарів і вебінарів для спеціалістів — отримайте повний доступ до матеріалів.",
  alternates: { canonical: "/recordings" },
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
        <CategoriesWrapper variant="mobile" filterType="past" />
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<SeminarsListSkeleton />}>
        <SeminarDataWrapper searchParams={params} filterType="past" />
      </Suspense>

      <header className="space-y-2 text-center md:text-left -mt-4">
        <h1 id="events-heading" className="text-3xl font-medium">
          ЗАПИСИ СЕМІНАРІВ
        </h1>
        <p className="text-secondary-foreground">
          Отримайте повний доступ до записів
        </p>
      </header>
    </section>
  );
}
