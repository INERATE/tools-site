"use client";

import { motion, type MotionValue } from "motion/react";
import type { ComponentType } from "react";

const ACCENT_BG = { accent: "bg-[var(--accent)]/15", "accent-2": "bg-[var(--accent-2)]/15", "accent-3": "bg-[var(--accent-3)]/15" };
const ACCENT_TEXT = { accent: "text-[var(--accent)]", "accent-2": "text-[var(--accent-2)]", "accent-3": "text-[var(--accent-3)]" };

/**
 * One floating glass document in the stacked 3D showcase. Opacity and blur
 * are inline styles, not arbitrary Tailwind values — Tailwind can only
 * generate classes it sees as literal strings at build time, not ones
 * assembled from a prop at runtime.
 */
export function GlassDocCard({
  y,
  z,
  rotZ,
  blurPx,
  bgOpacity,
  icon: Icon,
  accent,
  name,
  page,
  rows,
  footLeft,
  footRight,
  className = "",
}: {
  y?: MotionValue<number>;
  z: MotionValue<number>;
  rotZ?: MotionValue<number> | number;
  blurPx: number;
  bgOpacity: number;
  icon: ComponentType<{ className?: string }>;
  accent: "accent" | "accent-2" | "accent-3";
  name: string;
  page: React.ReactNode;
  rows: string[];
  footLeft: string;
  footRight: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      style={{
        y,
        translateZ: z,
        rotateX: 45,
        rotateZ: rotZ ?? 0,
        transformStyle: "preserve-3d",
        backgroundColor: `color-mix(in srgb, var(--bg-raised) ${Math.round(bgOpacity * 100)}%, transparent)`,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
      }}
      className={`absolute h-[220px] w-[340px] rounded-[24px] border border-[var(--border)] p-6 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3),inset_0_1.5px_1px_var(--glass-hi)] sm:h-[280px] sm:w-[460px] ${className}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`grid size-7 place-items-center rounded-xl ${ACCENT_BG[accent]} ${ACCENT_TEXT[accent]}`}>
              <Icon className="size-4" />
            </div>
            <span className="text-[13px] font-semibold text-[var(--text)]">{name}</span>
          </div>
          {page}
        </div>
        <div className="space-y-2.5 opacity-60">
          {rows.map((w, i) => (
            <div key={i} className={`h-2.5 ${w} rounded-full ${i === 0 ? "bg-[var(--text)]" : "bg-[var(--text-dim)]"}`} />
          ))}
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
          <span>{footLeft}</span>
          {footRight}
        </div>
      </div>
    </motion.div>
  );
}
