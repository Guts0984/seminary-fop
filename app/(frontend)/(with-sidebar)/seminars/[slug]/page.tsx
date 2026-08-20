// app/(frontend)/speakers/[slug]/page.tsx
import { defineQuery, PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getSeminarBySlug } from "@/features/seminars/queries/getSeminarBySlug";
import { notFound } from "next/navigation";

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
  });

  if (!seminar) {
    notFound();
  }

  return (
    <div>
      <PortableText value={seminar?.title} />
      {/* rest of the seminar detail layout */}
    </div>
  );
}
