"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenuIcons } from "./DropdownButton";
import { NAV_LINKS } from "@/helpers/nav-links";

export default function HeaderNav() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <>
      <div className="mr-5 space-x-6 hidden md:flex md:items-center">
        {NAV_LINKS.map((link) => {
          return (
            <Link
              key={link.href}
              className={`font-normal text-sm hover:text-white/85 transition-colors text-white ${isActive(link.href) && "text-white/85"}`}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="md:hidden mr-5">
        <DropdownMenuIcons />
      </div>
    </>
  );
}
