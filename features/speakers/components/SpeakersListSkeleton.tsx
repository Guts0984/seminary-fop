import { Skeleton } from "@/components/ui/skeleton";

function SpeakerCardSkeleton() {
  return (
    <div className="block pt-2">
      <div className="rounded-xl border-2 border-muted pt-10 pb-6 px-6 flex flex-col items-center gap-3">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24 rounded-4xl" />
        <div className="w-full space-y-2 pt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-9 w-full mt-3" />
      </div>
    </div>
  );
}

export function SpeakersListSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-4 w-36" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SpeakerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
