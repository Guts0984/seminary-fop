import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="w-full bg-primary sticky top-0 z-50">
      <div className="mx-auto flex h-20 w-full max-w-7xl flex-row items-center justify-between ">
        <div className="ml-5">
          <Logo />
        </div>
        <HeaderNav />
      </div>
    </header>
  );
}
