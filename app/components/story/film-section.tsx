"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ScrollScrub } from "./scroll-scrub";

const FRAMES = 96;
const DIR = "/frames/story";

/**
 * Cinematic closer: an AI-generated film of glass sheets converging, scrubbed
 * by scroll. Under reduced motion it collapses to a single static poster frame.
 */
export function FilmSection() {
  const reducedMotion = useReducedMotion();

  // The film is dark footage in every theme, so this copy is always light —
  // wiring it to --text would render near-black on black under Daylight.
  const overlay = (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end gap-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pb-24 text-center text-white">
      <h2 className="max-w-xl text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
        Every page, in one place
      </h2>
      <p className="max-w-sm text-[15px] leading-relaxed text-white/70">
        Processed entirely on your device. Nothing is uploaded.
      </p>
      <Link
        href="/pdf-merger"
        className="clay pointer-events-auto cursor-pointer px-7 py-3 text-sm font-medium"
      >
        Merge a PDF
      </Link>
    </div>
  );

  if (reducedMotion) {
    return (
      <section aria-label="Product film" className="relative min-h-screen overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DIR}/frame_${String(FRAMES).padStart(3, "0")}.webp`}
          alt="Document pages gathered into a single stack"
          className="h-screen w-full object-cover"
        />
        {overlay}
      </section>
    );
  }

  return (
    <section aria-label="Product film" className="relative">
      <ScrollScrub dir={DIR} count={FRAMES} className="h-[280vh]">
        {overlay}
      </ScrollScrub>
    </section>
  );
}
