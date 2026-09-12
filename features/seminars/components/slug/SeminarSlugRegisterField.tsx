"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { FaTelegram, FaViber } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function SeminarSlugRegisterField({
  seminar,
  registerNumbers,
  bottom = false,
}: {
  seminar: GetSeminarBySlugResult;
  registerNumbers: string[];
  bottom?: boolean;
}) {
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопійовано до буферу обміну");
    } catch {
      toast.error("Не вдалося скопіювати");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex flex-col",
          bottom && "flex-row justify-center items-center gap-2",
        )}
      >
        {registerNumbers.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleCopy(item)}
            className="cursor-pointer "
          >
            <span className="font-bold text-xs text-primary hover:text-primary/75 transition-colors">
              {item}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center justify-center">
        <Link
          href="viber://chat?number=%2B380503314110"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написати у Viber"
        >
          <FaViber
            size={30}
            className="text-[#7360F2] hover:opacity-85 transition-opacity"
          />
        </Link>

        <Link
          href="https://t.me/+380503314110"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написати у Telegram"
        >
          <FaTelegram
            size={30}
            className="text-[#0088CC] hover:opacity-85 transition-opacity"
          />
        </Link>
      </div>

      <Link href={`/register/${seminar?.slug}`} className="flex justify-center">
        <Button className="group flex items-center gap-1 bg-[#008000] hover:bg-[#008000]/85 text-gray-50 text-xs px-4 cursor-pointer">
          <span>Реєстрація</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
