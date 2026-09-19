"use client";

import { copyToClipboard } from "@/helpers/copyToClipboard";
import { GetContactQueryResult } from "@/sanity/types";

export default function FooterRegisterNumbers({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {contact?.registerNumbers?.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => copyToClipboard(number)}
          className="text-sm font-semibold text-white transition-colors hover:text-white/85 cursor-pointer"
        >
          {number}
        </button>
      ))}
    </div>
  );
}
