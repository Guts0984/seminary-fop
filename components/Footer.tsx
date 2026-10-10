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
    <footer className="bg-secondary text-zinc-900 border-t border-zinc-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:gap-8 md:text-left">
        {/* 1: Про нас */}
        <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center md:w-auto md:flex-1 md:items-start md:text-left">
          <Link
            href="/contacts"
            className="inline-block rounded-sm border border-zinc-900 px-6 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
          >
            Про нас
          </Link>
          <p className="max-w-xs text-[10px] leading-relaxed text-zinc-500">
            Дізнайтесь більше про нашу команду, напрямки роботи та способи
            зв&apos;язку з нами.
          </p>
        </div>

        <Separator className="bg-zinc-300 md:hidden" />
        <Separator
          orientation="vertical"
          className="hidden bg-zinc-300 md:block md:self-stretch"
        />

        {/* 2: registration numbers */}
        <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center md:w-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Телефони для реєстрації
          </p>
          <FooterRegisterNumbers contact={contact} />
        </div>

        <Separator className="bg-zinc-300 md:hidden" />
        <Separator
          orientation="vertical"
          className="hidden bg-zinc-300 md:block md:self-stretch"
        />

        {/* 3: newsletter */}
        <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center md:w-auto md:flex-1 md:items-end md:text-right">
          <NewsletterForm />
          <p className="text-[10px] text-zinc-500">
            Підпишіться на розсилку, щоб першими дізнаватись про нові події.
          </p>
        </div>
      </div>
    </footer>
  );
}
