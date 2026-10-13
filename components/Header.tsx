"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import { GetContactQueryResult } from "@/sanity/types";

import ContactHeader from "./ContactHeader";

export default function Header({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="w-full bg-graybg border-b border-zinc-200 sticky top-0 z-50 ">
      <div
        className={`mx-auto flex w-full max-w-7xl flex-row items-center justify-between pr-4 transition-all duration-300 lg:pr-12 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <div className="ml-5">
          <Logo />
        </div>
        <HeaderNav />
        <ContactHeader contact={contact} />
      </div>
    </header>
  );
}
