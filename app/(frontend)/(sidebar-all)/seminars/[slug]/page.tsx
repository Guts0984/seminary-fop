import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { getSeminarBySlug } from "@/features/seminars/queries/getSeminarBySlug";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import SlugSeminarOverview from "@/features/seminars/components/slug/SlugSeminarOverview";
import SlugSeminarSpeakers from "@/features/seminars/components/slug/SlugSeminarSpeakers";
import SlugSeminarProgram from "@/features/seminars/components/slug/SlugSeminarProgram";
import SlugBottomWrapper from "@/features/seminars/components/slug/bottom/SlugBottomWrapper";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";

const seminarSlugsQuery = defineQuery(
  `*[_type == "seminar" && defined(slug.current)].slug.current`,
);

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getSeminar = async (params: RouteProps["params"]) =>
  client
    .withConfig({ useCdn: false })
    .fetch(getSeminarBySlug, await params);

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const seminar = await getSeminar(params);

  if (!seminar) {
    return {};
  }

  return {
    title: seminar.seo.title,
    description: seminar.seo.description,
    alternates: { canonical: `/seminars/${slug}` },
    openGraph: {
      images: {
        url: seminar.seo.image
          ? urlFor(seminar.seo.image).width(1200).height(630).url()
          : `/api/og?id=${seminar._id}`,
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
    .fetch(seminarSlugsQuery);

  return slugs.map((slug: string) => ({ slug }));
}

export default async function SeminarSlugPage({ params }: RouteProps) {
  const [seminar, contact] = await Promise.all([
    getSeminar(params),
    client.withConfig({ useCdn: false }).fetch(getContactQuery),
  ]);

  if (!seminar) {
    notFound();
  }

  const registerNumbers = contact?.registerNumbers ?? [];

  return (
    <div className="space-y-3">
      <SlugSeminarOverview
        seminar={seminar}
        registerNumbers={registerNumbers}
        phone={contact?.phone}
      />
      <SlugSeminarSpeakers seminar={seminar} />
      <SlugSeminarProgram seminar={seminar} />
      <SlugBottomWrapper
        seminar={seminar}
        registerNumbers={registerNumbers}
        phone={contact?.phone}
      />
    </div>
  );
}
