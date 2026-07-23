import { SeminarCard } from "./SeminarCard";
import { GetSeminarsQueryResult } from "@/sanity/types";
import CategoriesSidebar from "./CategoriesSidebar";

export function SeminarsList({ data }: { data: GetSeminarsQueryResult }) {
  return (
    <div className="max-w-screen-2xl mx-auto w-full md:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <aside className="w-64 shrink-0 hidden md:block">
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
