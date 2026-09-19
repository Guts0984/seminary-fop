import SpeakerCard from "@/features/speakers/components/SpeakerCard";
import type { Speaker } from "@/features/speakers/types";
import type { GetSpeakersQueryResult } from "@/sanity/types";

export default function SpeakerList({
  data,
}: {
  data: GetSpeakersQueryResult;
}) {
  const items: Speaker[] = data?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">
          Доповідачів не знайдено.
        </p>
      </div>
    );
  }

  function getSpeakerPlural(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // 11–14 are exceptions (11 спікерів, 12 спікерів...)
    if (mod100 >= 11 && mod100 <= 14) {
      return "спікерів";
    }
    // Ends in 1 (1, 21, 31... спікер)
    if (mod10 === 1) {
      return "спікер";
    }
    // Ends in 2, 3, 4 (2, 3, 4, 22, 23, 24... спікери)
    if (mod10 >= 2 && mod10 <= 4) {
      return "спікери";
    }
    // 0, 5-10, 15-20, 25-30... (0 спікерів, 5 спікерів)
    return "спікерів";
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((speaker) => (
          <SpeakerCard key={speaker._id} speaker={speaker} />
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm text-secondary-foreground">
          Знайдено {data.total} {getSpeakerPlural(data.total)}
        </p>
      </div>
    </div>
  );
}
