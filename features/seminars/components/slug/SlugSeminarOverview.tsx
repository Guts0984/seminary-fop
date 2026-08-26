import Image from "next/image";
import { PortableText } from "next-sanity";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { SEMINAR_TYPES } from "../../helpers/seminar-types";
import { SeminarType } from "../../types";
import { SeminarDate } from "./SeminarDate";
import SeminarSlugRegisterField from "./SeminarSlugRegisterField";

export default function SlugSeminarOverview({
  seminar,
}: {
  seminar: GetSeminarBySlugResult;
}) {
  if (!seminar) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col h-fit gap-1 space-y-2">
        <div className="relative h-21.25 w-32.5 shrink-0">
          <Image
            src={seminar.image || "/no-image.jpg"}
            alt={seminar.slug}
            fill={true}
            className="object-cover rounded-lg"
          />
        </div>

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
        <SeminarSlugRegisterField seminar={seminar} />
      </div>
      <div className="flex flex-col gap-1">
        <PortableText value={seminar.title} components={TextFormating} />
        <PortableText
          value={seminar.subtitle_main}
          components={TextFormating}
        />
      </div>
    </div>
  );
}
