import Link from "next/link";
import NewsletterForm from "@/features/newsletterEmails/components/NewsletterForm";
import FooterRegisterNumbers from "./FooterRegisterNumbers";
import { Separator } from "@/components/ui/separator";
import { GetContactQueryResult } from "@/sanity/types";

export default function Footer({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-6 sm:px-6">
        {/* Left: Про нас */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <Link
            href="/contacts"
            className="inline-block rounded-sm border border-white px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
          >
            Про нас
          </Link>
          <p className="max-w-xs text-[10px] leading-relaxed text-white/50">
            Дізнайтесь більше про нашу команду, напрямки роботи та способи
            зв&apos;язку з нами.
          </p>
        </div>

        <Separator orientation="vertical" className="bg-white/20" />

        {/* Middle: registration numbers */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Телефони для реєстрації
          </p>
          <FooterRegisterNumbers contact={contact} />
        </div>

        <Separator orientation="vertical" className="bg-white/20" />

        {/* Right: newsletter */}
        <div className="flex flex-1 flex-col items-end gap-2">
          <NewsletterForm />
          <p className="text-[10px] text-white/50">
            Підпишіться на розсилку, щоб першими дізнаватись про нові події.
          </p>
        </div>
      </div>
    </footer>
  );
}
