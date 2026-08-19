"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FrameLoop } from "./frame-loop";
import { TrustStats } from "./trust-stats";

/** Closing statement — reprises the merger clip as the page's final beat, not a static mockup. */
export function InteractiveGlassFilm() {
  return (
    <div className="relative w-full py-8 sm:py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
        >
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          <span>Local Engine · Zero Latency</span>
        </motion.div>

        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]">
          Every page, in{" "}
          <span className="animated-gradient-text inline-block font-serif text-base font-normal italic">
            one place.
          </span>
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--text-dim)]">
          Processed entirely on your device, right inside this browser tab. Nothing is ever uploaded.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className="mt-12 w-full max-w-lg sm:max-w-xl"
        >
          <FrameLoop dir="/frames/merger" count={120} className="w-full" />
        </motion.div>

        <TrustStats />

        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/pdf-merger"
            className="clay flex h-12 items-center gap-2 px-8 text-[14.5px] font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
          >
            <span>Launch PDF Merger</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
