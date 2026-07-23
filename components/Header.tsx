import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between h-22 w-full">
      <div className="ml-5">
        <Logo />
      </div>
      <HeaderNav />
    </header>
  );
}
