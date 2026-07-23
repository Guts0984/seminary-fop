import { SeminarCard } from "./SeminarCard";
import { GetSeminarsQueryResult } from "@/sanity/types";
import CategoriesSidebar from "./CategoriesSidebar";

export function SeminarsList({ data }: { data: GetSeminarsQueryResult }) {
  return (
    <div className="py-8">
      <div className="flex gap-6">
        <aside className="w-56 shrink-0 hidden md:block space-y-6">
          <h3>Категорії семінарів</h3>
          <CategoriesSidebar />
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {data.total} seminars
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </main>
      </div>
    </div>
  );
}
