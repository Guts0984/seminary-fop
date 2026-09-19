import { SeminarCard } from "./SeminarCard";
import { GetSeminarsQueryResult } from "@/sanity/types";

export function SeminarsList({ data }: { data: GetSeminarsQueryResult }) {
  function getSeminarPlural(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // 11–14 are exceptions (11 семінарів, 12 семінарів...)
    if (mod100 >= 11 && mod100 <= 14) {
      return "семінарів";
    }
    // Ends in 1 (1, 21, 31... семінар)
    if (mod10 === 1) {
      return "семінар";
    }
    // Ends in 2, 3, 4 (2, 3, 4, 22, 23, 24... семінари)
    if (mod10 >= 2 && mod10 <= 4) {
      return "семінари";
    }
    // 0, 5-10, 15-20, 25-30... (0 семінарів, 5 семінарів)
    return "семінарів";
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        {data.total > 0 ? (
          data.items.map((event) => (
            <SeminarCard key={event._id} seminar={event} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No seminars found.
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm text-secondary-foreground">
          Знайдено {data.total} {getSeminarPlural(data.total)}
        </p>
      </div>
    </div>
  );
}
