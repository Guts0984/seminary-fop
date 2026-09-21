import type { Metadata } from "next";
import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";
import { SeminarDataWrapper } from "@/features/seminars/components/SeminarDataWrapper";
import { SeminarsListSkeleton } from "@/features/seminars/components/SeminarsListSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Записи семінарів",
  description:
    "Записи минулих семінарів і вебінарів для спеціалістів — отримайте повний доступ до матеріалів.",
  alternates: { canonical: "/recordings" },
};

// Upcoming/past split depends on the current date, so re-render at least
// daily even when no Studio change triggers the revalidate webhook.
export const revalidate = 86400;

export default async function RecordingsPage() {
  return (
    <section aria-labelledby="events-heading" className="space-y-6">
      {/* Mobile Horizontal Carousel */}
      <div className="block md:hidden border-y py-3">
        <CategoriesWrapper variant="mobile" filterType="past" />
      </div>

      <Suspense fallback={<SeminarsListSkeleton />}>
        <SeminarDataWrapper filterType="past" />
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
