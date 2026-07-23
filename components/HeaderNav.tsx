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
          className={`font-medium hover:text-primary ${isActive("/") ? "text-primary" : "text-black"}`}
          href="/"
        >
          Головна
        </Link>
        <Link
          className={`font-medium hover:text-primary ${isActive("/seminars") ? "text-primary" : "text-black"}`}
          href="/seminars"
        >
          Семінари
        </Link>
        <Link
          className={`font-medium hover:text-primary ${isActive("/speakers") ? "text-primary" : "text-black"}`}
          href="/speakers"
        >
          Спікери
        </Link>
        <Link
          className={`font-medium hover:text-primary ${isActive("/contacts") ? "text-primary" : "text-black"}`}
          href="/contacts"
        >
          Контакти
        </Link>
        <Link
          className={`font-medium hover:text-primary ${isActive("/news") ? "text-primary" : "text-black"}`}
          href="/news"
        >
          Новини
        </Link>
      </div>

      <div className="md:hidden">
        <DropdownMenuIcons />
      </div>
    </>
  );
}
