"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenuIcons } from "./DropdownButton";

export default function HeaderNav() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <>
      <div className="mr-5 space-x-6 hidden md:flex md:items-center">
        <Link
          className={`font-medium hover:text-primary/85 transition-colors ${isActive("/") ? "text-primary" : "text-secondary-foreground"}`}
          href="/"
        >
          Головна
        </Link>
        <Link
          className={`font-medium hover:text-primary/85 transition-colors ${isActive("/seminars") ? "text-primary" : "text-secondary-foreground"}`}
          href="/seminars"
        >
          Семінари
        </Link>
        <Link
          className={`font-medium hover:text-primary/85 transition-colors ${isActive("/speakers") ? "text-primary" : "text-secondary-foreground"}`}
          href="/speakers"
        >
          Спікери
        </Link>
        <Link
          className={`font-medium hover:text-primary/85 transition-colors ${isActive("/contacts") ? "text-primary" : "text-secondary-foreground"}`}
          href="/contacts"
        >
          Контакти
        </Link>
      </div>

      <div className="md:hidden">
        <DropdownMenuIcons />
      </div>
    </>
  );
}
