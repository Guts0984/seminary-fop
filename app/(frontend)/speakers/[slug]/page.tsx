import { defineQuery, PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { getSpeakerBySlug } from "@/features/speakers/queries/getSpeakerBySlug";
import { SpeakerSeminars } from "@/features/speakers/components/SpeakerSeminars";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";

const speakerSlugsQuery = defineQuery(
  `*[_type == "speaker" && defined(slug.current)].slug.current`,
);

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getSpeaker = async (params: RouteProps["params"]) =>
  client.withConfig({ useCdn: false }).fetch(getSpeakerBySlug, await params);

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const speaker = await getSpeaker(params);

  if (!speaker) {
    return {};
  }

  return {
    title: speaker.seo.title,
    description: speaker.seo.description,
    alternates: { canonical: `/speakers/${slug}` },
    openGraph: {
      images: {
        url: speaker.seo.image
          ? urlFor(speaker.seo.image).width(1200).height(630).url()
          : `/api/og?id=${speaker._id}`,
        width: 1200,
        height: 630,
      },
    },
  };
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(speakerSlugsQuery);

  return slugs.map((slug: string) => ({ slug }));
}

export default async function SpeakerSlugPage({ params }: RouteProps) {
  const speaker = await getSpeaker(params);

  if (!speaker) {
    notFound();
  }

  return (
    <div className="mt-1">
      <div className="flex items-center gap-4 lg:items-start lg:gap-6">
        <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg lg:h-[130px] lg:w-[130px]">
          <Image
            src={speaker.photo || "/no-image.jpg"}
            alt={speaker.name || "Speaker photo"}
            fill
            className="object-cover"
            sizes="130px"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold lg:text-3xl">{speaker.name}</h1>
          {speaker.title && speaker.title.length > 0 && (
            <div className="text-muted-foreground text-sm lg:text-base">
              <PortableText value={speaker.title} components={TextFormating} />
            </div>
          )}
        </div>
      </div>

      {speaker.bio && speaker.bio.length > 0 && (
        <div className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={speaker.bio} components={TextFormating} />
        </div>
      )}
      <SpeakerSeminars seminars={speaker.seminars ?? []} />
    </div>
  );
}
