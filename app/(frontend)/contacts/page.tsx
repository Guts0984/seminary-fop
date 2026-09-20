import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";
import ContactsView from "@/features/contacts/components/ContactsView";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв'яжіться з командою Seminars & Webinars: телефон, email та соціальні мережі.",
  alternates: { canonical: "/contacts" },
};

export default async function ContactPage() {
  const { data: contact } = await sanityFetch({ query: getContactQuery });

  return <ContactsView contact={contact} />;
}
