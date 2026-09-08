"use client";

import { toast } from "sonner";
import NewsletterForm from "../features/newsletterEmails/components/NewsletterForm";
import { EMAIL, PHONE_NUMBER } from "@/helpers/contacts";

export default function Contact() {
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопійовано до буферу обміну");
    } catch {
      toast.error("Не вдалось скопійовати");
    }
  };

  return (
    <div className="w-full bg-[#3C3C3C]">
      <div className="mx-auto flex h-8 w-full max-w-7xl flex-row items-center justify-between px-2 md:px-4 flex-nowrap gap-4">
        <div className="text-white flex flex-row items-center gap-3 md:gap-8 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start">
          <p className="text-[11px] md:text-sm flex items-center">
            Телефон:
            <button
              type="button"
              onClick={() => handleCopy(PHONE_NUMBER)}
              className="font-bold ml-1 text-primary hover:text-primary/85 transition-colors cursor-pointer"
            >
              {PHONE_NUMBER}
            </button>
          </p>
          <p className="text-[11px] md:text-sm flex items-center">
            E-mail:
            <button
              type="button"
              onClick={() => handleCopy(EMAIL)}
              className="font-bold ml-1 text-primary hover:text-primary/85 transition-colors cursor-pointer"
            >
              {EMAIL}
            </button>
          </p>
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}
