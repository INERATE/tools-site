"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlassDocStack } from "./glass-doc-stack";
import { TrustStats } from "./trust-stats";

/**
 * World-Class Apple-Caliber 3D Glass Document Showcase at the bottom of the page.
 * 100% theme-native with zero box boundaries or color mismatches.
 */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

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
    <div ref={containerRef} className="relative w-full py-8 sm:py-16">
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

        <GlassDocStack
          zOffset1={zOffset1}
          yOffset1={yOffset1}
          rotZ1={rotZ1}
          zOffset2={zOffset2}
          yOffset2={yOffset2}
          rotZ2={rotZ2}
          zOffset3={zOffset3}
          sealOpacity={sealOpacity}
          sealScale={sealScale}
        />

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
