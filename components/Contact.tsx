"use client";

import { toast } from "sonner";
import NewsletterForm from "../features/newsletterEmails/components/NewsletterForm";

export default function Contact() {
  const phoneNumber = "+38 (050) 914 56 25";
  const email = "petrishina_t@ukr.net";

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопійовано до буферу обміну");
    } catch {
      toast.error("Не вдалось скопійовати");
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-between bg-[#3C3C3C] h-8 px-2 md:px-4 flex-nowrap gap-4">
      <div className="text-white flex flex-row items-center gap-3 md:gap-8 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start">
        <p className="text-[11px] md:text-sm flex items-center">
          Телефон:
          <button
            type="button"
            onClick={() => handleCopy(phoneNumber)}
            className="font-bold ml-1 text-highlight hover:text-highlight/85 transition-colors cursor-pointer"
          >
            {phoneNumber}
          </button>
        </p>
        <p className="text-[11px] md:text-sm flex items-center">
          E-mail:
          <button
            type="button"
            onClick={() => handleCopy(email)}
            className="font-bold ml-1 text-highlight hover:text-highlight/85 transition-colors cursor-pointer"
          >
            {email}
          </button>
        </p>
      </div>
      <NewsletterForm />
    </div>
  );
}
