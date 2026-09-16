import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/Footer";
import { getContact } from "@/features/contacts/lib/getContact";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContact();

  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Header contact={contact} />
      <div className="mx-auto w-full max-w-7xl grow px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </div>
      <Footer contact={contact} />
      <SanityLive />
    </div>
  );
}
