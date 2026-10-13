"use client";

import Link from "next/link";
import { SeminarSpeaker } from "../types";

export default function SeminarSpeakersOverview({
  speakers,
}: {
  speakers: SeminarSpeaker[];
}) {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 text-sm">
      <h3 className="font-normal text-primary">
        {speakers.length === 1 ? "Спікер:" : "Спікери:"}
      </h3>
      <div className="flex flex-wrap items-center">
        {speakers.map((speaker, index) => (
          <span key={speaker._id} className="font-bold">
            {speaker?.slug ? (
              <Link
                href={`/speakers/${speaker.slug}`}
                className="hover:text-primary/80 text-primary text-sm"
              >
                {speaker.name}
              </Link>
            ) : (
              <span>{speaker.name}</span>
            )}
            {index < speakers.length - 1 && <span className="mr-1">,</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
