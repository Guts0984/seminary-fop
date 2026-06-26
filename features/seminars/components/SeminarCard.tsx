// features/seminars/components/SeminarCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SelectSeminarType } from "../schemas/seminarTable";

export function SeminarCard({ seminar }: { seminar: SelectSeminarType }) {
  // 1. Initialize state with the database URL or your fallback
  const [imgSrc, setImgSrc] = useState(seminar.thumbnail || "/no-image.jpg");

  return (
    <div className="seminar-card">
      <Image
        src={imgSrc}
        alt={seminar.title}
        width={500}
        height={300}
        onError={() => setImgSrc("/no-image.jpg")}
        priority
        className="w-full h-48 object-cover"
      />
      <span className={`badge ${seminar.type}`}>
        {seminar.type[0] === "webinar" && seminar.type.length === 1
          ? "🌐 Online Webinar"
          : "🏢 Offline Seminar"}
      </span>
      <h3>{seminar.title}</h3>
      <p>{new Date(seminar.eventDate).toLocaleDateString()}</p>
      <button>View Details</button>
    </div>
  );
}
