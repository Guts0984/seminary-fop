import Link from "next/link";
import { FaViber } from "react-icons/fa";

export default function Viber({
  size,
  color = "#7360F2",
}: {
  size: number;
  color?: string;
}) {
  return (
    <Link
      href="viber://chat?number=%2B380503314110"
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
