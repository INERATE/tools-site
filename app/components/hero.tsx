"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Terminal } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "./magnetic";
import { MacOSWindow } from "./macos-window";
import { HeroAuroraMesh } from "./hero-aurora-mesh";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Multi-plane scroll parallax
  const textY = useTransform(scrollY, [0, 500], [0, -40]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0.85]);
  const windowScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  return (
    <section ref={sectionRef} className="relative mb-20 flex flex-col items-center text-center">
      {/* 60fps Generative Prismatic Fluid Aurora Background */}
      <HeroAuroraMesh />

      {/* Top Air-Gapped Trust Badge with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
      >
        <span className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span>100% Client-Side WebAssembly · Air-Gapped</span>
      </motion.div>

      {/* Scroll-Parallax Header Text Group */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col items-center">
        {/* Main Headline with Animated Iridescent Gradient Flow */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-[var(--text)]"
        >
          Document tools that{" "}
          <span className="animated-gradient-text italic font-serif font-normal inline-block">
            feel premium.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-[44ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.65] font-normal text-[var(--text-dim)]"
        >
          Merge, split, and convert files with sub-millisecond local execution. No server queues, no cloud storage, and zero telemetry.
        </motion.p>

        {/* Primary Actions with Magnetic Hover */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[var(--text-dim)]"
        >
          <ShieldCheck className="size-4 text-emerald-400" strokeWidth={2} />
          <span>Sandboxed in Browser RAM · Zero Data Leaves Your Device</span>
        </motion.div>
      </motion.div>

      {/* Interactive Application Workstation Centerpiece with Scroll Scaling */}
      <motion.div style={{ scale: windowScale }} className="w-full">
        <MacOSWindow />
      </motion.div>
    </section>
  );
}
