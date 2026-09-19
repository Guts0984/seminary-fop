import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export default function SlugSeminarSpeakers({
  seminar,
}: {
  seminar: GetSeminarBySlugResult;
}) {
  if (!seminar || !seminar.speakers?.length) {
    return null;
  }
  const { speakers } = seminar;

  return (
    <div className="mt-10 space-y-6">
      <div className="mb-4 space-y-2">
        <h3 className="text-center font-medium text-primary">
          {speakers?.length === 1
            ? "Спікер та консультант:"
            : "Спікери та консультанти:"}
        </h3>
      </div>
      <div
        className={
          seminar.speakerLayout === "1"
            ? "grid grid-cols-1 gap-6"
            : "grid gap-6 lg:grid-cols-2"
        }
      >
        {speakers.map((speaker) => (
          <div
            key={speaker._id}
            className="group flex flex-col gap-4 rounded-xl border-2 border-border bg-card p-4 text-card-foreground shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:flex-row hover:border-primary/40"
          >
            {/* Photo */}
            {speaker.slug ? (
              <Link
                href={`/speakers/${speaker.slug}`}
                className="relative h-28 w-28 shrink-0 self-center overflow-hidden rounded-full sm:self-start"
              >
                <Image
                  src={speaker.photoUrl || "/no-image.jpg"}
                  alt={speaker.name || "Спікер"}
                  fill
                  className="object-cover"
                />
              </Link>
            ) : (
              <div className="relative h-28 w-28 shrink-0 self-center overflow-hidden rounded-full sm:self-start">
                <Image
                  src={speaker.photoUrl || "/no-image.jpg"}
                  alt={speaker.name || "Спікер"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1">
              <h4 className="text-base font-bold">
                {speaker.slug ? (
                  <Link
                    href={`/speakers/${speaker.slug}`}
                    className="transition-colors group-hover:text-primary "
                  >
                    {speaker.name}
                  </Link>
                ) : (
                  speaker.name
                )}
              </h4>

              {speaker.title && (
                <div className="mt-2 text-sm text-foreground/90">
                  <PortableText
                    value={speaker.title}
                    components={TextFormating}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
