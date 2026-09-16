// @/features/seminars/components/CategoriesSidebarList.tsx
"use client";

import { cn } from "@/lib/utils";
import { GetSidebarSeminarsQueryResult } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoiesSidebarListProps {
  categories: GetSidebarSeminarsQueryResult;
}

export default function CategoriesSidebarList({
  categories,
}: CategoiesSidebarListProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full border-2 border-gray-200 rounded-xl overflow-hidden">
      {categories.map((category) => {
        if (!category.slug) return null;

        // Adjust route path if your route is /category/[slug] or /[slug]
        const href = `/seminars/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category._id}
            href={href}
            className={cn(
              "w-full text-left px-2.5 py-2  text-sm font-medium transition-all",
              isActive
                ? "bg-hover text-primary font-semibold"
                : " text-gray-700 hover:bg-gray-200 hover:text-gray-900",
            )}
          >
            {category.category}
          </Link>
        );
      })}
    </div>
  );
}
