"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { GetContactQueryResult } from "@/sanity/types";

export default function ContactLinks({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
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
        {contact?.phone && (
          <button
            type="button"
            onClick={() => handleCopy(contact.phone)}
            className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {contact.phone}
          </button>
        )}
        {contact?.email && (
          <button
            type="button"
            onClick={() => handleCopy(contact.email)}
            className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 hover:cursor-pointer"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {contact.email}
          </button>
        )}
      </div>

      {contact?.address?.mapsUrl && (
        <Link
          href={contact.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-sm text-white/80 transition-colors hover:text-primary"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          {contact.address.title}
        </Link>
      )}
    </div>
  );
}
