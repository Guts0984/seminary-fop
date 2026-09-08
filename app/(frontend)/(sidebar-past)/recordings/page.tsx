import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";
import { SeminarDataWrapper } from "@/features/seminars/components/SeminarDataWrapper";
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
      <header className="space-y-2 text-center md:text-left">
        <h1 id="events-heading" className="text-3xl font-medium">
          ЗАПИСИ СЕМІНАРІВ
        </h1>
        <p className="text-secondary-foreground">
          Отримайте повний доступ до записів
        </p>
      </header>

      {/* Mobile Horizontal Carousel */}
      <div className="block md:hidden border-y py-3">
        <CategoriesWrapper variant="mobile" filterType="past" />
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<div>Loading...</div>}>
        <SeminarDataWrapper searchParams={params} filterType="past" />
      </Suspense>
    </section>
  );
}
