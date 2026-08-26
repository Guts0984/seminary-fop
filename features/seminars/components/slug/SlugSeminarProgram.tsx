import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { PortableText } from "next-sanity";

export default function SlugSeminarProgram({
  seminar,
}: {
  seminar: GetSeminarBySlugResult;
}) {
  if (!seminar) {
    return null;
  }

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-center font-medium text-primary">Програма:</h3>
      <div>
        <PortableText value={seminar.description} components={TextFormating} />
      </div>
    </div>
  );
}
