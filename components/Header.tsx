import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import { GetContactQueryResult } from "@/sanity/types";

import ContactHeader from "./ContactHeader";

export default function Header({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  return (
    <header className="w-full bg-secondary sticky top-0 z-50 ">
      <div className="mx-auto flex h-20 w-full max-w-7xl flex-row items-center justify-between pr-4 lg:pr-12">
        <div className="ml-5">
          <Logo />
        </div>
        <HeaderNav />
        <ContactHeader contact={contact} />
      </div>
    </header>
  );
}
