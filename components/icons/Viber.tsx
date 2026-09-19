import Link from "next/link";
import { FaViber } from "react-icons/fa";

export default function Viber({
  phone,
  size,
  color = "#7360F2",
}: {
  phone: string;
  size: number;
  color?: string;
}) {
  const cleanPhone = phone.replace(/[\s()-]/g, "");

  return (
    <Link
      href={`viber://chat?number=${encodeURIComponent(cleanPhone)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написати у Viber"
    >
      <FaViber
        size={size}
        color={color}
        className="hover:opacity-85 transition-opacity"
      />
    </Link>
  );
}
