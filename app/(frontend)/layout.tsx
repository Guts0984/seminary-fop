import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Contact />
      <Header />
      <div className="mx-auto w-full max-w-7xl grow px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </div>
      <Footer />
      <SanityLive />
    </div>
  );
}
