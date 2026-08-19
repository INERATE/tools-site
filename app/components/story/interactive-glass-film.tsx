"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useTilt } from "../../lib/use-tilt";
import { FrameLoop } from "./frame-loop";
import { TrustStats } from "./trust-stats";

/** Closing centerpiece stage with scroll-linked parallax, interactive 3D tilt, and spatial glass badges. */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const meshScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const filmY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const chipLeftY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const chipRightY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const statsY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <div ref={containerRef} className="relative w-full py-12 sm:py-20">
      {/* Dynamic ambient aurora background mesh */}
      <motion.div
        aria-hidden
        style={{ scale: meshScale, rotate: meshRotate }}
        className="pointer-events-none absolute inset-x-0 -inset-y-12 z-0 flex items-center justify-center opacity-45 blur-3xl"
      >
        <div
          className="h-[320px] w-[540px] rounded-full sm:h-[420px] sm:w-[720px]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow) 0%, rgba(217,70,239,0.22) 40%, rgba(34,211,238,0.18) 70%, transparent 80%)",
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

        {/* Central 3D Interactive Glass Stage */}
        <motion.div
          style={{ y: filmY }}
          className="relative mt-12 w-full max-w-lg sm:max-w-xl md:max-w-2xl"
        >
          <motion.div
            onPointerMove={tilt.move}
            onPointerEnter={tilt.enter}
            onPointerLeave={tilt.leave}
            onPointerDown={tilt.down}
            style={{
              rotateX: tilt.rx,
              rotateY: tilt.ry,
              y: tilt.lift,
              transformPerspective: 1200,
            }}
            className="clay-card group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl"
          >
            {/* Dynamic specular glare tracking pointer */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
              style={{ background: tilt.glare, opacity: tilt.glow }}
            />

            {/* Inner radiant glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background: "radial-gradient(circle at center, var(--glow) 0%, transparent 65%)",
              }}
            />

            <FrameLoop dir="/frames/merger" count={120} className="relative z-10 w-full" />
          </motion.div>

          {/* Floating spatial glass badges */}
          <motion.div
            style={{ y: chipLeftY }}
            className="glass pointer-events-none absolute -left-6 top-1/4 z-30 hidden items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-2xl backdrop-blur-2xl lg:flex"
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
            className="glass pointer-events-none absolute -right-6 bottom-1/4 z-30 hidden items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-2xl backdrop-blur-2xl lg:flex"
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
