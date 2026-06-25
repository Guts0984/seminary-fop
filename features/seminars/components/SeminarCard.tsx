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
        // 2. If the URL returns a 404 or fails, instantly swap it to the local fallback
        onError={() => setImgSrc("/no-image.jpg")}
        // 3. This solves the LCP browser warning for elements loaded immediately on screen
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
