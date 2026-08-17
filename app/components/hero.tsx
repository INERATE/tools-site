"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Terminal } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "./magnetic";
import { MacOSWindow } from "./macos-window";
import { HeroAuroraMesh } from "./hero-aurora-mesh";
import { HeroChips } from "./hero-chips";

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -65]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0.75]);
  const windowY = useTransform(scrollY, [0, 700], [0, 45]);
  const windowRotateX = useTransform(scrollY, [0, 700], [0, 8]);
  const windowScale = useTransform(scrollY, [0, 700], [1, 0.96]);

  return (
    <section className="relative mb-20 flex flex-col items-center text-center">
      <HeroAuroraMesh />
      <HeroChips />

      <motion.div
        {...rise(0)}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase"
      >
        <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
        <span>100% Client-Side · Nothing Ever Uploaded</span>
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col items-center">
        <motion.h1
          {...rise(0.08)}
          className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-[var(--text)]"
        >
          Document tools that{" "}
          <span className="animated-gradient-text inline-block font-serif font-normal italic">feel premium.</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-5 max-w-[44ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.65] text-[var(--text-dim)]"
        >
          Merge, split and convert on your own device. No server queues, no cloud storage, no telemetry.
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <Magnetic>
            <Link
              href="/pdf-merger"
              className="clay flex h-12 cursor-pointer items-center gap-2 px-7 text-[14.5px] font-bold tracking-wide"
            >
              <span>Launch PDF Merger</span>
              <ArrowRight aria-hidden className="size-4 stroke-[2.5]" />
            </Link>
          </Magnetic>

          <a
            href="#demo-stage"
            className="glass-btn flex h-12 items-center gap-2 px-5 text-[14px] font-semibold text-[var(--text)]"
          >
            <Terminal aria-hidden className="size-4 text-[var(--accent)]" />
            <span>See it in action</span>
          </a>
        </motion.div>

        <motion.div
          {...rise(0.32)}
          className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[var(--text-dim)]"
        >
          <ShieldCheck aria-hidden className="size-4 text-emerald-400" strokeWidth={2} />
          <span>Runs entirely in your browser · Zero data leaves your device</span>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: windowY, rotateX: windowRotateX, scale: windowScale, transformPerspective: 1200 }}
        className="w-full"
      >
        <MacOSWindow />
      </motion.div>
    </section>
  );
}
