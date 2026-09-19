"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GetSeminarBySlugResult } from "@/sanity/types";
import { cn } from "@/lib/utils";
import Telegram from "@/components/icons/Telegram";
import Viber from "@/components/icons/Viber";

export default function SeminarSlugRegisterField({
  seminar,
  registerNumbers,
  phone,
  bottom = false,
}: {
  seminar: GetSeminarBySlugResult;
  registerNumbers: string[];
  phone?: string | null;
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

      {phone && (
        <div className="flex gap-2 items-center justify-center">
          <Viber phone={phone} size={30} />
          <Telegram phone={phone} size={30} />
        </div>
      )}

      <Link href={`/register/${seminar?.slug}`} className="flex justify-center">
        <Button className="group flex items-center gap-1 bg-[#008000] hover:bg-[#008000]/85 text-gray-50 text-xs px-4 cursor-pointer">
          <span>Реєстрація</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
