import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getSpeakerBySlug } from "@/features/speakers/queries/getSpeakerBySlug";
import { notFound } from "next/navigation";

const speakerSlugsQuery = defineQuery(
  `*[_type == "speaker" && defined(slug.current)].slug.current`,
);

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(speakerSlugsQuery);

  return slugs.map((slug: string) => ({ slug }));
}

export default async function SpeakerSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: speaker } = await sanityFetch({
    query: getSpeakerBySlug,
    params: { slug },
  });

  if (!speaker) {
    notFound();
  }

  return (
    <div>
      <h1>{speaker.name}</h1>
      {/* rest of the speaker detail layout */}
    </div>
  );
}
