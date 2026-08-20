import { Suspense } from "react";
import {
  SeminarDataWrapper,
  SeminarSearchParams,
} from "@/features/seminars/components/SeminarDataWrapper";

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
