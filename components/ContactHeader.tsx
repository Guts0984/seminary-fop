"use client";

import { copyToClipboard } from "@/helpers/copyToClipboard";
import { GetContactQueryResult } from "@/sanity/types";
import Telegram from "./icons/Telegram";
import Viber from "./icons/Viber";

export default function ContactHeader({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  return (
    <div className="order-2 lg:order-3 ml-10 lg:ml-0 flex items-center gap-1 text-white">
      <div className="flex flex-col items-start">
        {contact?.phone && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => copyToClipboard(contact.phone)}
              className="font-bold ml-1 text-sm text-white hover:text-white/85 transition-colors cursor-pointer"
            >
              {contact.phone}
            </button>
          </div>
        )}
        {contact?.email && (
          <button
            type="button"
            onClick={() => copyToClipboard(contact.email)}
            className="font-bold ml-1 text-left text-sm text-white hover:text-white/85 transition-colors cursor-pointer"
          >
            {contact.email}
          </button>
        )}
      </div>
      <div className="flex gap-1">
        <Telegram size={24} color="white" />
        <Viber size={24} color="white" />
      </div>
    </div>
  );
}
