// features/seminars/components/SeminarCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetSeminarBySlugResult } from "@/sanity/types";

export function SeminarCard({ seminar }: { seminar: GetSeminarBySlugResult }) {
  const [imgSrc, setImgSrc] = useState(seminar?.image || "/no-image.jpg");
  const eventTypes = seminar?.type || [];
  const isStrictlyWebinar =
    eventTypes.includes("webinar") && eventTypes.length === 1;
  const typeClasses = eventTypes.join(" ") || "no-type";

  return (
    <div className="seminar-card">
      <Link href={`/seminars/${seminar?.slug}`}>
        <Image
          src={imgSrc}
          alt={seminar?.title || "Seminar event image"}
          width={500}
          height={300}
          onError={() => setImgSrc("/no-image.jpg")}
          priority
          className="w-full h-48 object-cover hover:cursor-pointer"
        ></Image>
      </Link>
      <span className={`badge ${typeClasses}`}>
        {isStrictlyWebinar ? "🌐 Online Webinar" : "🏢 Offline Seminar"}
      </span>
      <h3>{seminar?.title}</h3>
      <button>View Details</button>
    </div>
  );
}
