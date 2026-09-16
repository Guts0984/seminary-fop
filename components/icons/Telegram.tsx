import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

export default function Telegram({
  size,
  color = "#0088CC",
}: {
  size: number;
  color?: string;
}) {
  return (
    <Link
      href="https://t.me/+380503314110"
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
