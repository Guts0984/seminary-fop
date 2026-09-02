import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getSeminarBySlug } from "@/features/seminars/queries/getSeminarBySlug";
import { notFound } from "next/navigation";
import SlugSeminarOverview from "@/features/seminars/components/slug/SlugSeminarOverview";
import SlugSeminarSpeakers from "@/features/seminars/components/slug/SlugSeminarSpeakers";
import SlugSeminarProgram from "@/features/seminars/components/slug/SlugSeminarProgram";
import SlugBottomWrapper from "@/features/seminars/components/slug/bottom/SlugBottomWrapper";

const seminarSlugsQuery = defineQuery(
  `*[_type == "seminar" && defined(slug.current)].slug.current`,
);

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(seminarSlugsQuery);

  return slugs.map((slug: string) => ({ slug }));
}

export default async function SeminarSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: seminar } = await sanityFetch({
    query: getSeminarBySlug,
    params: { slug },
    stega: false,
  });

  if (!seminar) {
    notFound();
  }

  return (
    <div>
      <SlugSeminarOverview seminar={seminar} />
      <SlugSeminarSpeakers seminar={seminar} />
      <SlugSeminarProgram seminar={seminar} />
      <SlugBottomWrapper seminar={seminar} />
    </div>
  );
}
