"use client";

import Link from "next/link";
import {
  ContactRound,
  GlobeCheck,
  House,
  Menu,
  MicAudioLines,
  Speech,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            aria-label="Відкрити меню"
          >
            <Menu className="w-5 h-5" />
          </button>
        }
      />

      <DropdownMenuContent className="w-48 p-1.5 space-y-0.5">
        <DropdownMenuItem
          render={
            <Link
              href="/"
              className="flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <House className="w-5 h-5 shrink-0 text-muted-foreground" />
              <span>Головна</span>
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link
              href="/seminars"
              className="flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <MicAudioLines className="w-5 h-5 shrink-0 text-muted-foreground" />
              <span>Семінари & Вебінари</span>
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link
              href="/webinars"
              className="flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <GlobeCheck className="w-5 h-5 shrink-0 text-muted-foreground" />
              <span>Відеозаписи</span>
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link
              href="/speakers"
              className="flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <Speech className="w-5 h-5 shrink-0 text-muted-foreground" />
              <span>Експерти</span>
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link
              href="/contacts"
              className="flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <ContactRound className="w-5 h-5 shrink-0 text-muted-foreground" />
              <span>Контакти</span>
            </Link>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
