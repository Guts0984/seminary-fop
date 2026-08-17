// @/features/seminars/components/CategoriesMobileCarousel.tsx
"use client";

import { GetSidebarSeminarsQueryResult } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoriesMobileCarouselProps {
  categories: GetSidebarSeminarsQueryResult;
}

export default function CategoriesMobileCarousel({
  categories,
}: CategoriesMobileCarouselProps) {
  const pathname = usePathname();

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="w-full overflow-x-auto py-1 px-4 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-nowrap gap-1 snap-x snap-mandatory  pr-8">
          {categories.map((category) => {
            if (!category.slug) return null;

            const href = `/seminars/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category._id}
                href={href}
                className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-hover"
                }`}
              >
                {category.category}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
