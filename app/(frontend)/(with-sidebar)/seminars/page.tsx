import { Suspense } from "react";
import { SeminarDataWrapper } from "@/features/seminars/components/SeminarDataWrapper";
import { SeminarSearchParams } from "@/features/seminars/types";

export default async function SeminarPage({
  searchParams,
}: {
  searchParams: Promise<SeminarSearchParams>;
}) {
  const params = await searchParams;

  return (
    <div>
      <h1>Seminars</h1>
      <Suspense key={JSON.stringify(params)} fallback={<div>Loading...</div>}>
        <SeminarDataWrapper searchParams={params} />
      </Suspense>
    </div>
  );
}
