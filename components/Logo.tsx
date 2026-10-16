"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Logo() {
  const ampRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const el = ampRef.current;
    if (!el || el.classList.contains("amp-jump")) return;
    el.classList.add("amp-jump");
  };

  const handleAnimationEnd = () => {
    ampRef.current?.classList.remove("amp-jump");
  };

  return (
    <Link href="/" onMouseEnter={handleMouseEnter}>
      <div className="flex flex-col items-center leading-none font-montserrat">
        <p className="text-2xl font-bold tracking-[0.1em] text-white">
          SEMINARS
        </p>
        <div className="-mt-2 flex w-full items-baseline justify-end gap-1 mr-0.5">
          <span
            ref={ampRef}
            onAnimationEnd={handleAnimationEnd}
            className="inline-block text-black text-xl font-bold"
          >
            &
          </span>
          <p className="text-lg font-bold tracking-[0.1em] text-white">
            WEBINARS
          </p>
        </div>
      </div>
    </Link>
  );
}
