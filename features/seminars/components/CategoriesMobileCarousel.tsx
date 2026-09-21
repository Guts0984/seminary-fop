// @/features/seminars/components/CategoriesMobileCarousel.tsx
"use client";

import { GetSidebarSeminarsQueryResult } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface CategoriesMobileCarouselProps {
  categories: GetSidebarSeminarsQueryResult;
}

export default function CategoriesMobileCarousel({
  categories,
}: CategoriesMobileCarouselProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !drag.current.isDown) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = () => {
    drag.current.isDown = false;
  };

  // swallow the click that follows a drag, so links don't fire
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="w-full overflow-x-auto py-1 px-4 cursor-grab select-none [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
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
