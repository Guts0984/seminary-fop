import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

export default function Telegram({
  phone,
  size,
  color = "#0088CC",
}: {
  phone: string;
  size: number;
  color?: string;
}) {
  const cleanPhone = phone.replace(/[\s()-]/g, "");

  return (
    <Link
      href={`https://t.me/${cleanPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написати у Telegram"
    >
      <FaTelegram
        size={size}
        color={color}
        className="hover:opacity-85 transition-opacity"
      />
    </Link>
  );
}
