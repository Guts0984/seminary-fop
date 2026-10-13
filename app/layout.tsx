import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://seminar-webinar.com.ua",
  ),
  title: {
    default: "Seminars & Webinars",
    template: "%s | Seminars & Webinars",
  },
  description:
    "Практичні семінари, вебінари та записи тренінгів для спеціалістів",
  openGraph: {
    images: {
      url: "/api/og",
      width: 1200,
      height: 630,
    },
  },
  verification: {
    google: "BAI1kdn-59rM3jh9_2DhGJ6idUAyFfQ-tosxmSxA_bc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans bg-background"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
