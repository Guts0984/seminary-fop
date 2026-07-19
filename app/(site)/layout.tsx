import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Contact />
      <Header />
      <main className="grow">{children}</main>
      <SanityLive />
    </div>
  );
}
