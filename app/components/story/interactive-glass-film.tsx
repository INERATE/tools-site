"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { InteractiveCenterpiece } from "./interactive-centerpiece";
import { TrustStats } from "./trust-stats";

/** Centerpiece stage featuring the bright, interactive multi-mode Liquid Studio and spatial glass badges. */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const meshScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const filmY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const chipLeftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const chipRightY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={containerRef} className="relative w-full py-12 sm:py-20">
      {/* Dynamic ambient aurora background mesh */}
      <motion.div
        aria-hidden
        style={{ scale: meshScale, rotate: meshRotate }}
        className="pointer-events-none absolute inset-x-0 -inset-y-12 z-0 flex items-center justify-center opacity-50 blur-3xl"
      >
        <div
          className="h-[360px] w-[580px] rounded-full sm:h-[460px] sm:w-[780px]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow) 0%, rgba(217,70,239,0.25) 40%, rgba(34,211,238,0.2) 70%, transparent 80%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase shadow-md"
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

        {/* Central Interactive Glass Stage */}
        <motion.div
          style={{ y: filmY }}
          className="relative mt-10 w-full max-w-xl md:max-w-2xl"
        >
          <InteractiveCenterpiece />

          {/* Floating spatial glass badges */}
          <motion.div
            style={{ y: chipLeftY }}
            className="glass pointer-events-none absolute -left-8 top-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-2xl backdrop-blur-2xl lg:flex"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-left">
              <div className="text-[12.5px] font-bold text-[var(--text)]">0 Bytes Uploaded</div>
              <div className="text-[11px] text-[var(--text-dim)]">100% Private Client-Side</div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: chipRightY }}
            className="glass pointer-events-none absolute -right-8 bottom-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-2xl backdrop-blur-2xl lg:flex"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
              <Zap className="size-5" strokeWidth={2.2} />
            </div>
            <div className="text-left">
              <div className="text-[12.5px] font-bold text-[var(--text)]">Instant WASM Engine</div>
              <div className="text-[11px] text-[var(--text-dim)]">Zero Network Latency</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: statsY }} className="w-full">
          <TrustStats />
        </motion.div>

        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/pdf-merger"
            className="clay flex h-12 items-center gap-2 px-8 text-[14.5px] font-bold tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            <span>Launch PDF Merger</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
