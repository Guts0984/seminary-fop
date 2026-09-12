import Link from "next/link";
import { NAV_LINKS } from "@/helpers/nav-links";
import ContactLinks from "./FooterContactLinks";
import { GetContactQueryResult } from "@/sanity/types";

export default function Footer({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  return (
    <footer className="bg-[#3C3C3C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:pt-4">
        {/* Top row: brand */}
        <div className="border-b border-white/10 pb-4 sm:pb-6">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Семінари<span className="text-primary"> / </span>Вебінари
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">
              Знаходьте події, реєструйтесь та отримуйте знання від практиків.
            </p>
          </div>
        </div>

        {/* Middle: nav / contacts */}
        <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 sm:gap-10 sm:py-6">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Навігація
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Контакти
            </h3>
            <ContactLinks contact={contact} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-secondary-foreground">
          <p>© {new Date().getFullYear()} Усі права захищено.</p>
        </div>
      </div>
    </footer>
  );
}
