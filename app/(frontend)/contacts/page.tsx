import { sanityFetch } from "@/sanity/lib/live";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";
import ContactsView from "@/features/contacts/components/ContactsView";

export default async function ContactPage() {
  const { data: contact } = await sanityFetch({ query: getContactQuery });

  return <ContactsView contact={contact} />;
}
