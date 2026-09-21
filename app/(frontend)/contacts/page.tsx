import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";
import ContactsView from "@/features/contacts/components/ContactsView";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв'яжіться з командою Seminars & Webinars: телефон, email та соціальні мережі.",
  alternates: { canonical: "/contacts" },
};

export default async function ContactPage() {
  const contact = await client.fetch(getContactQuery, {}, sanityCacheOptions);

  return <ContactsView contact={contact} />;
}
