"use client";

import { copyToClipboard } from "@/helpers/copyToClipboard";
import NewsletterForm from "../features/newsletterEmails/components/NewsletterForm";
import { GetContactQueryResult } from "@/sanity/types";

export default function Contact({ contact }: { contact: GetContactQueryResult }) {
  return (
    <div className="w-full bg-[#3C3C3C]">
      <div className="mx-auto flex h-8 w-full max-w-7xl flex-row items-center justify-between px-2 md:px-4 flex-nowrap gap-4">
        <div className="text-white flex flex-row items-center gap-3 md:gap-8 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start">
          {contact?.phone && (
            <p className="text-[11px] md:text-sm flex items-center">
              Телефон:
              <button
                type="button"
                onClick={() => copyToClipboard(contact.phone)}
                className="font-bold ml-1 text-primary hover:text-primary/85 transition-colors cursor-pointer"
              >
                {contact.phone}
              </button>
            </p>
          )}
          {contact?.email && (
            <p className="text-[11px] md:text-sm flex items-center">
              E-mail:
              <button
                type="button"
                onClick={() => copyToClipboard(contact.email)}
                className="font-bold ml-1 text-primary hover:text-primary/85 transition-colors cursor-pointer"
              >
                {contact.email}
              </button>
            </p>
          )}
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}
