import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-header h-22 w-full">
      <div className="ml-5">
        <Logo />
      </div>
      <div className="mr-5">
        <Link href="/seminars">Seminars</Link>
      </div>
    </header>
  );
}
