"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, ArrowRight, Sparkles, Layers } from "lucide-react";

/**
 * Ultra-High Resolution 3D Vector Glass Document Engine.
 * Infinitely scalable, 4K/8K razor sharp, with zero low-res compression artifacts.
 */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Smooth scroll-driven 3D transforms
  const page1Y = useTransform(scrollYProgress, [0, 0.7], [-180, 0]);
  const page1R = useTransform(scrollYProgress, [0, 0.7], [-24, 0]);
  const page1X = useTransform(scrollYProgress, [0, 0.7], [-120, 0]);
  const page1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0.8, 1]);

  const page2Y = useTransform(scrollYProgress, [0, 0.7], [-120, 0]);
  const page2R = useTransform(scrollYProgress, [0, 0.7], [18, 0]);
  const page2X = useTransform(scrollYProgress, [0, 0.7], [140, 0]);

  const page3Y = useTransform(scrollYProgress, [0, 0.7], [-70, 0]);
  const page3R = useTransform(scrollYProgress, [0, 0.7], [-12, 0]);
  const page3X = useTransform(scrollYProgress, [0, 0.7], [-60, 0]);

  const page4Y = useTransform(scrollYProgress, [0, 0.7], [-40, 0]);
  const page4R = useTransform(scrollYProgress, [0, 0.7], [8, 0]);

  const stackScale = useTransform(scrollYProgress, [0.7, 1], [1, 1.06]);
  const stackGlow = useTransform(scrollYProgress, [0.65, 0.95], [0.3, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black text-white"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, #06050A 15%, #000000 50%, #06050A 85%, var(--bg) 100%)",
      }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-12">
        {/* Ambient Dark-Space Nebula Glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(124, 58, 237, 0.35) 0%, rgba(34, 211, 238, 0.15) 50%, transparent 80%)",
          }}
        />

        {/* 3D Glass Sheets Stage */}
        <div className="relative flex size-full max-h-[480px] max-w-2xl items-center justify-center [perspective:1400px]">
          {/* Glass Stack Container */}
          <motion.div
            style={{ scale: stackScale, transformStyle: "preserve-3d" }}
            className="relative flex items-center justify-center"
          >
            {/* Luminous Glowing Node Points */}
            <motion.div
              style={{ opacity: stackGlow }}
              className="pointer-events-none absolute -top-16 left-1/4 size-3 rounded-full bg-emerald-400 blur-[2px] shadow-[0_0_24px_6px_rgba(52,211,153,0.8)]"
            />
            <motion.div
              style={{ opacity: stackGlow }}
              className="pointer-events-none absolute -top-14 right-1/4 size-3 rounded-full bg-cyan-400 blur-[2px] shadow-[0_0_24px_6px_rgba(34,211,238,0.8)]"
            />

            {/* Glass Sheet 1 (Bottom layer) */}
            <motion.div
              style={{
                y: page1Y,
                x: page1X,
                rotateZ: page1R,
                opacity: page1Opacity,
                rotateX: 55,
                rotateY: 0,
              }}
              className="absolute w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] rounded-[24px] border border-cyan-400/40 bg-gradient-to-br from-white/[0.12] via-cyan-500/[0.06] to-transparent backdrop-blur-md shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.7)]"
            />

            {/* Glass Sheet 2 */}
            <motion.div
              style={{
                y: page2Y,
                x: page2X,
                rotateZ: page2R,
                rotateX: 55,
                rotateY: 0,
              }}
              className="absolute w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] rounded-[24px] border border-violet-400/40 bg-gradient-to-br from-white/[0.14] via-violet-500/[0.08] to-transparent backdrop-blur-md shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.75)]"
            />

            {/* Glass Sheet 3 */}
            <motion.div
              style={{
                y: page3Y,
                x: page3X,
                rotateZ: page3R,
                rotateX: 55,
                rotateY: 0,
              }}
              className="absolute w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] rounded-[24px] border border-fuchsia-400/45 bg-gradient-to-br from-white/[0.16] via-fuchsia-500/[0.08] to-transparent backdrop-blur-md shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.8)]"
            />

            {/* Glass Sheet 4 (Top master sheet with bevel & specular edges) */}
            <motion.div
              style={{
                y: page4Y,
                rotateZ: page4R,
                rotateX: 55,
                rotateY: 0,
              }}
              className="relative w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] rounded-[24px] border border-white/60 bg-gradient-to-br from-white/[0.22] via-cyan-400/[0.12] to-transparent backdrop-blur-lg shadow-[0_32px_80px_-20px_rgba(34,211,238,0.45),inset_0_2.5px_3px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.4)]"
            >
              {/* Internal Vector Document Lines */}
              <div className="flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                    <Layers className="size-3.5" />
                    <span>Merged_Document_Master.pdf</span>
                  </span>
                  <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9.5px] font-bold text-emerald-400 uppercase tracking-wider">
                    Ready
                  </span>
                </div>

                <div className="space-y-2.5 opacity-60">
                  <div className="h-2 w-3/4 rounded-full bg-white/40" />
                  <div className="h-2 w-full rounded-full bg-white/25" />
                  <div className="h-2 w-1/2 rounded-full bg-white/20" />
                </div>

                <div className="flex items-center justify-between border-t border-white/20 pt-3 text-[10.5px] text-white/70 font-mono">
                  <span>100% In-Memory Sandbox</span>
                  <span>0 B External Egress</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Editorial Copy & CTA */}
        <div className="relative z-20 flex flex-col items-center gap-4 pb-8 text-center">
          <h2 className="max-w-xl text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.8)]">
            Every page, in one place
          </h2>
          <p className="max-w-md text-[14.5px] leading-relaxed text-white/75">
            Processed entirely on your device with sub-millisecond local memory execution. Nothing is ever uploaded.
          </p>

          <Link
            href="/pdf-merger"
            className="clay mt-2 flex h-11 items-center gap-2 px-7 text-[13.5px] font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
          >
            <span>Merge a PDF Free</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
