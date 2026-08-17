"use client";

import { Lock, Zap } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const SHELL =
  "pointer-events-none absolute z-10 hidden items-center gap-2 rounded-full border " +
  "border-[var(--border)] bg-[var(--bg-raised)]/85 px-4 py-2 backdrop-blur-2xl 2xl:flex " +
  "shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3),inset_0_1px_1px_var(--glass-hi)]";

/**
 * Two ambient stat chips flanking the hero.
 *
 * Only from 2xl up, and vertically level with the (narrow) subhead rather than
 * the (wide) headline — at 1440 they used to sit on top of the h1's first line.
 * Idle bob lives on the inner node, scroll parallax on the outer: one transform
 * each, so the two can never fight.
 */
function Chip({
  side,
  y,
  bob,
  children,
}: {
  side: "left" | "right";
  y: MotionValue<number>;
  bob: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div style={{ y }} className={`${SHELL} ${side === "left" ? "top-56 left-0" : "top-64 right-0"}`}>
      <motion.div
        animate={{ y: [-bob, bob, -bob] }}
        transition={{ duration: side === "left" ? 5.5 : 6.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroChips() {
  const { scrollY } = useScroll();
  const left = useTransform(scrollY, [0, 600], [0, -110]);
  const right = useTransform(scrollY, [0, 600], [0, -90]);

  return (
    <>
      <Chip side="left" y={left} bob={6}>
        <Zap aria-hidden className="size-3.5 text-[var(--accent)]" />
        <span className="font-mono text-[11.5px] font-semibold text-[var(--text)]">No upload step</span>
        <span className="size-1.5 rounded-full bg-emerald-400" />
      </Chip>

      <Chip side="right" y={right} bob={6}>
        <Lock aria-hidden className="size-3.5 text-emerald-400" />
        <span className="font-mono text-[11.5px] font-semibold text-[var(--text)]">0 KB uploaded</span>
      </Chip>
    </>
  );
}
