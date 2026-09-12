// app/(frontend)/register/[slug]/page.tsx
import { defineQuery, PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import RegistrationForm, {
  SeminarTypeOption,
} from "@/features/registration/components/RegisterForm";

const seminarRegistrationSlugsQuery = defineQuery(
  `*[_type == "seminar" && defined(slug.current)].slug.current`,
);

const seminarForRegistrationQuery = defineQuery(`
  *[_type == "seminar" && slug.current == $slug][0] {
    _id,
    title,
    type
  }
`);

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(seminarRegistrationSlugsQuery);

  return slugs.map((slug: string) => ({ slug }));
}

export default async function RegisterSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const seminar = await client
    .withConfig({ useCdn: false })
    .fetch(seminarForRegistrationQuery, { slug });

  if (!seminar) {
    notFound();
  }

  const availableTypes = (seminar.type ?? []) as SeminarTypeOption[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-primary">
          Реєстрація на семінар
        </h1>
        <div className="mt-2">
          <PortableText value={seminar.title} components={TextFormating} />
        </div>
      </div>

      <RegistrationForm
        seminarId={seminar._id}
        availableTypes={availableTypes}
      />
    </div>
  );
}
