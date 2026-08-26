import { GetSeminarBySlugResult } from "@/sanity/types";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { PortableText } from "next-sanity";
import { MapPin } from "lucide-react";

export default function SlugSeminarMap({
  seminar,
}: {
  seminar: GetSeminarBySlugResult;
}) {
  if (!seminar || !seminar.googleMap) {
    return null;
  }

  return (
    <section className=" bg-primary/10 overflow-hidden rounded-xl border-2 border-border">
      {seminar.location && seminar.location.length > 0 && (
        <div className="flex items-center gap-4 bg-card px-4 py-3 text-sm">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <PortableText value={seminar.location} components={TextFormating} />
        </div>
      )}

      <div className="relative aspect-video w-full">
        <iframe
          src={seminar.googleMap}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Місце проведення на карті"
        />
      </div>
    </section>
  );
}
