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
  registerNumbers,
  phone,
}: {
  seminar: GetSeminarBySlugResult;
  registerNumbers: string[];
  phone?: string | null;
}) {
  if (!seminar) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col h-fit gap-1 space-y-2 w-32.5 shrink-0">
        <div className="relative w-32.5 shrink-0">
          <Image
            src={seminar.image || "/no-image.jpg"}
            alt={seminar.slug}
            width={130}
            height={85}
            className="w-full h-auto rounded-md"
          />
        </div>

        <SeminarDate
          eventDates={seminar.eventDates}
          eventTime={seminar.eventTime}
        />
        <div>
          <p className="text-xs ml-1 font-bold text-center text-secondary-foreground">
            {seminar.type
              ?.map((type) => SEMINAR_TYPES[type as SeminarType])
              .join(" + ")}
          </p>
        </div>
        <SeminarSlugRegisterField
          seminar={seminar}
          registerNumbers={registerNumbers}
          phone={phone}
        />
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
