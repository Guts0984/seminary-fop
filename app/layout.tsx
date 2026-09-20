import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";

import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const eUkraine = localFont({
  src: [
    {
      path: "../public/fonts/e-Ukraine-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/e-Ukraine-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/e-Ukraine-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-e-ukraine",
  display: "swap",
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
  description: "Практичні семінари, вебінари та записи тренінгів для спеціалістів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body
        className={`${eUkraine.variable} ${geistMono.variable} ${montserrat.variable} min-h-full flex flex-col font-sans bg-background`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
