"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, FileText, Lock, ShieldCheck, Sparkles, TrendingUp, Layers } from "lucide-react";

/**
 * World-Class Apple-Caliber 3D Glass Document Showcase.
 * Seamlessly matches the page theme without harsh color bands.
 * True 3D perspective with realistic document layouts, glass refraction, and scroll convergence.
 */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Dynamic 3D space transformations
  const zOffset1 = useTransform(scrollYProgress, [0.1, 0.75], [90, 0]);
  const yOffset1 = useTransform(scrollYProgress, [0.1, 0.75], [-120, 0]);
  const rotZ1 = useTransform(scrollYProgress, [0.1, 0.75], [-18, 0]);

  const zOffset2 = useTransform(scrollYProgress, [0.1, 0.75], [45, 0]);
  const yOffset2 = useTransform(scrollYProgress, [0.1, 0.75], [-60, 0]);
  const rotZ2 = useTransform(scrollYProgress, [0.1, 0.75], [12, 0]);

  const zOffset3 = useTransform(scrollYProgress, [0.1, 0.75], [0, 0]);

  const sealOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  const sealScale = useTransform(scrollYProgress, [0.65, 0.9], [0.6, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-24 sm:py-32 transition-colors duration-300"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, var(--glow), transparent 75%)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
        >
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          <span>Local Engine · Zero Latency</span>
        </motion.div>

        {/* Section Headline */}
        <h2 className="text-center text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]">
          Every page, in{" "}
          <span className="animated-gradient-text italic font-serif font-normal inline-block">
            one place.
          </span>
        </h2>
        <p className="mt-4 max-w-lg text-center text-[15px] leading-relaxed text-[var(--text-dim)]">
          Processed entirely on your device with sub-millisecond local WebAssembly execution. Nothing is ever uploaded.
        </p>

        {/* 3D Glass Document Stage */}
        <div className="relative mt-16 flex h-[420px] sm:h-[480px] w-full max-w-2xl items-center justify-center [perspective:1400px]">
          {/* Document 3 (Bottom Layer: Cryptographic Verification Sheet) */}
          <motion.div
            style={{
              translateZ: zOffset3,
              rotateX: 45,
              rotateZ: -15,
              transformStyle: "preserve-3d",
            }}
            className="absolute w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/70 backdrop-blur-[24px] p-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3),inset_0_1.5px_1px_var(--glass-hi)] transition-all"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-6.5 place-items-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                    <ShieldCheck className="size-3.5" />
                  </div>
                  <span className="text-[12px] font-semibold text-[var(--text)]">Security_Audit.pdf</span>
                </div>
                <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[9.5px] font-mono text-[var(--text-dim)]">
                  p. 03 / 03
                </span>
              </div>
              <div className="space-y-2 opacity-50">
                <div className="h-2 w-3/4 rounded-full bg-[var(--text)]" />
                <div className="h-2 w-1/2 rounded-full bg-[var(--text-dim)]" />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono text-[var(--text-dim)]">
                <span>SHA-256 Verified</span>
                <span className="text-emerald-400">100% In-RAM</span>
              </div>
            </div>
          </motion.div>

          {/* Document 2 (Middle Layer: Architecture Blueprint) */}
          <motion.div
            style={{
              y: yOffset2,
              translateZ: zOffset2,
              rotateX: 45,
              rotateZ: rotZ2,
              transformStyle: "preserve-3d",
            }}
            className="absolute w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/80 backdrop-blur-[28px] p-5 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.35),inset_0_1.5px_1px_var(--glass-hi)] transition-all"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-6.5 place-items-center rounded-lg bg-[var(--accent-2)]/15 text-[var(--accent-2)]">
                    <Layers className="size-3.5" />
                  </div>
                  <span className="text-[12px] font-semibold text-[var(--text)]">System_Architecture.pdf</span>
                </div>
                <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[9.5px] font-mono text-[var(--text-dim)]">
                  p. 02 / 03
                </span>
              </div>
              <div className="space-y-2 opacity-60">
                <div className="h-2 w-5/6 rounded-full bg-[var(--text)]" />
                <div className="h-2 w-4/6 rounded-full bg-[var(--text-dim)]" />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono text-[var(--text-dim)]">
                <span>Vector Layout</span>
                <span>Lossless</span>
              </div>
            </div>
          </motion.div>

          {/* Document 1 (Top Master Layer: Executive Report with Metric Chart) */}
          <motion.div
            style={{
              y: yOffset1,
              translateZ: zOffset1,
              rotateX: 45,
              rotateZ: rotZ1,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/92 backdrop-blur-[36px] p-5 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.45),0_12px_28px_-10px_var(--glow),inset_0_2px_1.5px_var(--glass-hi)] transition-all"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-6.5 place-items-center rounded-lg bg-[var(--accent-3)]/15 text-[var(--accent-3)]">
                    <FileText className="size-3.5" />
                  </div>
                  <span className="text-[12px] font-bold text-[var(--text)]">Financial_Q3_Report.pdf</span>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9.5px] font-bold text-emerald-400 uppercase">
                  Ready
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[var(--bg)]/60 p-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span className="text-[11.5px] font-medium text-[var(--text)]">+38.4% Efficiency</span>
                </div>
                <span className="text-[10.5px] font-mono text-[var(--text-dim)]">0.034s runtime</span>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-2 text-[10.5px] font-mono text-[var(--text-dim)]">
                <span>Total: 3 Pages</span>
                <span className="text-[var(--accent)]">Merged Output</span>
              </div>
            </div>
          </motion.div>

          {/* Cryptographic Seal of Verification */}
          <motion.div
            style={{ opacity: sealOpacity, scale: sealScale }}
            className="pointer-events-none absolute -bottom-6 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[var(--bg-raised)]/95 px-4 py-2 text-[12px] font-bold text-emerald-400 shadow-[0_12px_36px_rgba(52,211,153,0.3)] backdrop-blur-xl"
          >
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>Merged & Sealed Locally in RAM</span>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/pdf-merger"
            className="clay flex h-11.5 items-center gap-2 px-8 text-[14px] font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
          >
            <span>Launch PDF Merger</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
