"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles, Terminal, Zap, Lock } from "lucide-react";
import { motion } from "motion/react";
import { Magnetic } from "./magnetic";
import { MacOSWindow } from "./macos-window";
import { HeroAmbientGlow } from "./hero-ambient-glow";

export function Hero() {
  return (
    <section className="relative mb-20 flex flex-col items-center text-center">
      {/* Animated Liquid Aurora Halo & Floating Lights */}
      <HeroAmbientGlow />

      {/* Floating Micro-Pill (Left) */}
      <motion.div
        className="pointer-events-none absolute top-6 left-0 hidden xl:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)]/80 px-3.5 py-1.5 backdrop-blur-xl shadow-lg"
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="size-3.5 text-[var(--accent)]" />
        <span className="text-[11.5px] font-mono font-semibold text-[var(--text)]">0.03s Execution</span>
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </motion.div>

      {/* Floating Micro-Pill (Right) */}
      <motion.div
        className="pointer-events-none absolute top-6 right-0 hidden xl:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)]/80 px-3.5 py-1.5 backdrop-blur-xl shadow-lg"
        animate={{ y: [6, -5, 6] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <Lock className="size-3.5 text-emerald-400" />
        <span className="text-[11.5px] font-mono font-semibold text-[var(--text)]">0 KB Uploaded</span>
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 uppercase">
          Air-Gapped
        </span>
      </motion.div>

      {/* Top Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
      >
        <span className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span>100% Client-Side WebAssembly · Air-Gapped</span>
      </motion.div>

      {/* Main Headline with Animated Iridescent Gradient Flow */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-[var(--text)]"
      >
        Document utilities that{" "}
        <span className="animated-gradient-text italic font-serif font-normal inline-block">
          feel macOS native.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-[44ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.65] font-normal text-[var(--text-dim)]"
      >
        Merge, split, and convert files with sub-millisecond local execution. No server queues, no cloud storage, and zero telemetry.
      </motion.p>

      {/* Primary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
      >
        <Magnetic>
          <Link
            href="/pdf-merger"
            className="clay flex h-12 cursor-pointer items-center gap-2 px-7 text-[14.5px] font-bold tracking-wide transition-all"
          >
            <span>Launch PDF Merger</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </Magnetic>

        <a
          href="#demo-stage"
          className="glass-btn flex h-12 items-center gap-2 px-5 text-[14px] font-semibold text-[var(--text)] transition-all"
        >
          <Terminal className="size-4 text-[var(--accent)]" />
          <span>Interactive Sandbox</span>
        </a>
      </motion.div>

      {/* Trust Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.32 }}
        className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[var(--text-dim)]"
      >
        <ShieldCheck className="size-4 text-emerald-400" strokeWidth={2} />
        <span>Sandboxed in Browser RAM · Zero Data Leaves Your Device</span>
      </motion.div>

      {/* macOS Application Window & Cloudflare Telemetry Centerpiece */}
      <MacOSWindow />
    </section>
  );
}
