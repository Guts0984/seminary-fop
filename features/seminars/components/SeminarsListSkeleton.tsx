import { Skeleton } from "@/components/ui/skeleton";

function SeminarCardSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1 space-y-2">
        <Skeleton className="h-21.25 w-32.5 rounded-lg" />
        <Skeleton className="mx-auto h-3 w-24" />
        <Skeleton className="mx-auto h-3 w-20" />
        <Skeleton className="mx-auto h-7 w-28" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function SeminarsListSkeleton() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="h-4 w-36" />
      </div>
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <SeminarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
