"use client";

import Link from "next/link";
import { Seminar, SeminarType } from "../types";
import { PortableText, PortableTextComponents } from "next-sanity";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import Image from "next/image";
import { useState } from "react";
import { SeminarDate } from "./slug/SeminarDate";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SeminarSpeakersOverview from "./SeminarSpeakersOverview";
import { SEMINAR_TYPES } from "../helpers/seminar-types";

export function SeminarCard({ seminar }: { seminar: Seminar }) {
  const [image, setImage] = useState<string>(seminar.image || "/no-image.jpg");

  const titleComponents: PortableTextComponents = {
    ...TextFormating,
    block: {
      ...(TextFormating.block as Record<string, unknown>),
      h2: ({ children }) => (
        <h2 className="mt-6 mb-2 text-base font-semibold leading-snug tracking-tight first:mt-0 text-primary transition-colors duration-200 hover:text-primary/80">
          <Link href={`/seminars/${seminar.slug}`}>{children}</Link>
        </h2>
      ),
    },
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col h-fit gap-1 space-y-2">
        <Link href={`/seminars/${seminar.slug}`}>
          <div className="relative h-21.25 w-32.5 shrink-0">
            <Image
              src={image}
              onError={() => {
                setImage("/no-image.jpg");
              }}
              alt={seminar.slug}
              fill={true}
              className="object-cover rounded-lg"
            />
          </div>
        </Link>

        <div>
          <p className="text-xs ml-1 font-bold flex justify-center text-secondary-foreground">
            {seminar.type
              ?.map((type) => SEMINAR_TYPES[type as SeminarType])
              .join(" + ")}
          </p>
        </div>

        <SeminarDate
          eventDates={seminar.eventDates}
          eventTime={seminar.eventTime}
        />

        <Link
          href={`/register/${seminar.slug}`}
          className="flex justify-center"
        >
          <Button className="group flex items-center gap-1 bg-[#008000] hover:bg-[#008000]/85 text-gray-50 text-xs px-4 cursor-pointer">
            <span>Реєстрація</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <PortableText value={seminar.title} components={titleComponents} />
        {seminar.speakers?.length ? (
          <SeminarSpeakersOverview speakers={seminar.speakers ?? []} />
        ) : null}
        <PortableText value={seminar.subtitle} components={TextFormating} />
      </div>
    </div>
  );
}
