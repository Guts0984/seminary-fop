import Header from "@/components/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/Footer";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: contact } = await sanityFetch({ query: getContactQuery });

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
