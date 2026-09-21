import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getContactQuery } from "@/features/contacts/queries/getContactQuery";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await client.fetch(getContactQuery, {}, sanityCacheOptions);

  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Header contact={contact} />
      <div className="mx-auto w-full max-w-7xl grow px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </div>
      <Footer contact={contact} />
    </div>
  );
}
