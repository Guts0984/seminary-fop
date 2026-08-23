import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={"/logo4.png"}
        alt="Logo"
        width={300}
        height={150}
        className="hover:cursor-pointer"
      />
    </Link>
  );
}
