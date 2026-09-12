import { getContact } from "@/features/contacts/lib/getContact";
import ContactsView from "@/features/contacts/components/ContactsView";

export default async function ContactPage() {
  const contact = await getContact();

  return <ContactsView contact={contact} />;
}
