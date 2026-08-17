"use client";

import { motion, type MotionValue } from "motion/react";
import { CheckCircle2, FileText, ShieldCheck, Layers } from "lucide-react";
import { GlassDocCard } from "./glass-doc-card";

/** The three stacked documents plus the seal that appears once they settle. */
export function GlassDocStack({
  zOffset1,
  yOffset1,
  rotZ1,
  zOffset2,
  yOffset2,
  rotZ2,
  zOffset3,
  sealOpacity,
  sealScale,
}: {
  zOffset1: MotionValue<number>;
  yOffset1: MotionValue<number>;
  rotZ1: MotionValue<number>;
  zOffset2: MotionValue<number>;
  yOffset2: MotionValue<number>;
  rotZ2: MotionValue<number>;
  zOffset3: MotionValue<number>;
  sealOpacity: MotionValue<number>;
  sealScale: MotionValue<number>;
}) {
  return (
    <div className="relative mt-12 flex h-[440px] w-full max-w-2xl items-center justify-center [perspective:1400px] sm:h-[500px]">
      <GlassDocCard
        z={zOffset3}
        blurPx={24}
        bgOpacity={0.75}
        icon={ShieldCheck}
        accent="accent"
        name="Security_Audit_2026.pdf"
        page={<span className="rounded bg-[var(--border)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-dim)]">p. 03 / 03</span>}
        rows={["w-3/4", "w-1/2"]}
        footLeft="SHA-256 Verified"
        footRight={<span className="font-semibold text-emerald-400">Stays on device</span>}
      />

      <GlassDocCard
        y={yOffset2}
        z={zOffset2}
        rotZ={rotZ2}
        blurPx={28}
        bgOpacity={0.85}
        icon={Layers}
        accent="accent-2"
        name="System_Architecture.pdf"
        page={<span className="rounded bg-[var(--border)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-dim)]">p. 02 / 03</span>}
        rows={["w-5/6", "w-4/6"]}
        footLeft="Vector Layout"
        footRight={<span>Lossless Quality</span>}
      />

      <GlassDocCard
        y={yOffset1}
        z={zOffset1}
        rotZ={rotZ1}
        blurPx={36}
        bgOpacity={0.95}
        icon={FileText}
        accent="accent-3"
        name="Financial_Q3_Report.pdf"
        className="relative shadow-[0_45px_100px_-20px_rgba(0,0,0,0.45),0_12px_28px_-10px_var(--glow),inset_0_2px_1.5px_var(--glass-hi)]"
        page={
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
            Ready
          </span>
        }
        rows={["w-5/6"]}
        footLeft="Total: 3 Pages"
        footRight={<span className="font-semibold text-[var(--accent)]">Merged Output</span>}
      />

      <motion.div
        style={{ opacity: sealOpacity, scale: sealScale }}
        className="pointer-events-none absolute -bottom-4 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[var(--bg-raised)]/95 px-4.5 py-2 text-[12px] font-bold text-emerald-400 shadow-[0_12px_36px_rgba(52,211,153,0.3)] backdrop-blur-xl"
      >
        <CheckCircle2 className="size-4 text-emerald-400" />
        <span>Merged locally, in this tab</span>
      </motion.div>
    </div>
  );
}
