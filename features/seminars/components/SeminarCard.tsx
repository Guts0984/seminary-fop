"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { TextFormating } from "@/sanity/helpers/TextFormating";

const MONTHS_GENITIVE_UA = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

const TYPE_LABELS_UA: Record<string, string> = {
  seminar: "Семінар",
  webinar: "Вебінар",
  offline: "Офлайн",
};

function formatDay(date: Date) {
  return `${date.getDate()} ${MONTHS_GENITIVE_UA[date.getMonth()]}`;
}

function formatDateRange(dates: string[]) {
  if (dates.length === 0) return null;
  const sorted = [...dates]
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (sorted.length === 1 || first.getTime() === last.getTime()) {
    return formatDay(first);
  }
  return `${formatDay(first)} - ${formatDay(last)}`;
}

export function SeminarCard({ seminar }: { seminar: GetSeminarBySlugResult }) {
  const [imgSrc, setImgSrc] = useState(seminar?.image || "/no-image.jpg");
  const eventTypes = seminar?.type || [];
  const typeLabel = eventTypes.map((t) => TYPE_LABELS_UA[t] ?? t).join(", ");
  const dateLabel = formatDateRange(seminar?.eventDates || []);

  return (
    <Card className="flex flex-row gap-4 overflow-hidden p-0">
      <div className="shrink-0">
        <Link href={`/seminars/${seminar?.slug}`}>
          <Image
            src={imgSrc}
            onError={() => setImgSrc("/no-image.jpg")}
            alt={"Seminar photo"}
            width={200}
            height={200}
            className="w-[120px] rounded-lg lg:w-[130px]"
          />
        </Link>
      </div>

      <div className="flex-1 py-4 pr-4">
        <Link href={`/seminars/${seminar?.slug}`} className="group block">
          <div className="space-y-1 transition-colors group-hover:text-primary">
            <PortableText value={seminar?.title} components={TextFormating} />
          </div>
        </Link>
      </div>
    </Card>
  );
}
