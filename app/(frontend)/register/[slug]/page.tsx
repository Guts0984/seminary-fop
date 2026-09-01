// app/(frontend)/register/[slug]/page.tsx
import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import RegistrationForm, {
  SeminarTypeOption,
} from "@/features/registration/components/RegisterForm";

const seminarForRegistrationQuery = defineQuery(`
  *[_type == "seminar" && slug.current == $slug][0] {
    _id,
    title,
    type
  }
`);

export default async function RegisterSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: seminar } = await sanityFetch({
    query: seminarForRegistrationQuery,
    params: { slug },
  });

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
