"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
          onClick={() => handleCopy("+380441234567")}
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
        >
          <Phone className="h-4 w-4 shrink-0" />
          +380 (44) 123-45-67
        </button>
        <button
          type="button"
          onClick={() => handleCopy("info@example.com")}
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
        >
          <Mail className="h-4 w-4 shrink-0" />
          info@example.com
        </button>
      </div>

      <Link
        href="https://maps.google.com/?q=м.+Київ,+вул.+Хрещатик,+1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-2 text-sm text-white/80 transition-colors hover:text-primary"
      >
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
        м. Київ, вул. Хрещатик, 1
      </Link>
    </div>
  );
}
