"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ADDRESS, EMAIL, PHONE_NUMBER } from "@/helpers/contacts";

export default function ContactLinks() {
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопійовано до буферу обміну");
    } catch {
      toast.error("Не вдалось скопіювати");
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex flex-col gap-1.5 text-sm">
        <button
          type="button"
          onClick={() => handleCopy(PHONE_NUMBER)}
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
        >
          <Phone className="h-4 w-4 shrink-0" />
          {PHONE_NUMBER}
        </button>
        <button
          type="button"
          onClick={() => handleCopy(EMAIL)}
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
        >
          <Mail className="h-4 w-4 shrink-0" />
          {EMAIL}
        </button>
      </div>

      <Link
        href={ADDRESS.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-2 text-sm text-white/80 transition-colors hover:text-primary"
      >
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
        {ADDRESS.title}
      </Link>
    </div>
  );
}
