"use client";

import { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  isSeminarUpcoming,
  formatEventDates,
} from "@/features/seminars/lib/seminarDate";
import { PortableText } from "next-sanity";
import { InlineTextFormating } from "@/sanity/helpers/frontend/TextFormating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

type Seminar = {
  _id: string;
  title: ComponentProps<typeof PortableText>["value"];
  slug: string;
  eventDates: string[];
  image?: string | null;
};

// Helper to get the primary comparison date (latest date in array, or far past if empty)
function getLatestSeminarDate(eventDates: string[]): number {
  if (!eventDates || eventDates.length === 0) return 0;
  const timestamps = eventDates
    .map((d) => new Date(d).getTime())
    .filter((t) => !isNaN(t));
  return timestamps.length > 0 ? Math.max(...timestamps) : 0;
}

export function SpeakerSeminars({ seminars }: { seminars: Seminar[] }) {
  if (!seminars.length) return null;

  // Sort descending: furthest future date leftmost -> oldest past date rightmost
  const sortedSeminars = [...seminars].sort((a, b) => {
    const timeA = getLatestSeminarDate(a.eventDates);
    const timeB = getLatestSeminarDate(b.eventDates);
    return timeB - timeA;
  });

  return (
    <div className="mt-10">
      <div className="mb-4 space-y-2">
        <h3 className="text-lg font-medium">Семінари спікера</h3>
        <Separator className="max-w-48 bg-primary data-horizontal:h-1" />
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        {/* -mt-2 and pt-2 provide top clearance so -translate-y-1 isn't clipped */}
        <CarouselContent className="-ml-4 -mt-2 pt-2">
          {sortedSeminars.map((seminar) => {
            const upcoming = isSeminarUpcoming(seminar.eventDates);

            return (
              <CarouselItem
                key={seminar._id}
                className="basis-[280px] pl-4 sm:basis-[320px]"
              >
                <Link
                  href={`/seminars/${seminar.slug}`}
                  className="group block rounded-lg focus-visible:outline-none pt-2"
                >
                  <div
                    className="relative overflow-hidden rounded-lg border-2 border-muted transition-all duration-300
                               group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg
                               group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary"
                  >
                    <div className="relative h-[160px] w-full">
                      <Image
                        src={seminar.image || "/no-image.jpg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 320px, 280px"
                      />
                      {/* Status Badge */}
                      <div className="absolute left-2 top-2">
                        {upcoming ? (
                          <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white shadow-sm">
                            Наближається
                          </span>
                        ) : (
                          <span className="rounded bg-slate-700/80 px-2 py-0.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                            Архів
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="line-clamp-2 font-medium transition-colors group-hover:text-primary">
                        <PortableText
                          value={seminar.title}
                          components={InlineTextFormating}
                        />
                      </div>

                      {/* whitespace-pre-line */}
                      <p className="mt-2 text-xs text-secondary-foreground ">
                        {upcoming
                          ? formatEventDates(seminar.eventDates)
                          : "Запис вебінару доступний"}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Navigation Arrows */}
        <div className="mt-4 flex justify-end gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
