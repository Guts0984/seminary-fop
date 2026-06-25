"use client";

import CheckboxBadgeDemo from "@/components/ui/checkbox-badge";
import { useState } from "react";
import { SeminarCard } from "./SeminarCard";
import { SelectSeminarType } from "../schemas/seminarTable";

export function SeminarsList({ data }: { data: SelectSeminarType[] }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  return (
    <div className="max-w-screen-2xl mx-auto w-full md:px-6 lg:px-8 py-8">
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden animate-fade-in"
          onClick={() => setIsMobileFilterOpen(false)} // Fix 1: Clicking the dark backdrop closes it
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white p-6 rounded-t-2xl overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()} // Fix 2: Prevents clicks INSIDE the white drawer from closing it
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 font-medium text-blue-600"
              >
                Done
              </button>
            </div>

            <CheckboxBadgeDemo />
          </div>
        </div>
      )}

      <div className="flex gap-8">
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-6">
            <h2 className="font-semibold text-lg">Filters</h2>
            <CheckboxBadgeDemo />
          </div>
        </aside>

        {/* 3. MAIN CONTENT LAYER */}
        <main className="flex-1">
          {/* Top Bar with Mobile Filter Trigger */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {data.length} seminars
            </p>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              <span>Filters</span>
              <span className="bg-gray-200 text-xs px-1.5 py-0.5 rounded-full">
                2
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((event) => (
                <SeminarCard key={event.id} seminar={event} />
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
