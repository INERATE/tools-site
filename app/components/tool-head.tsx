"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Title block shared by every tool page. It owns the hover state so each page
 * does not repeat it, and passes it to the icon — the animated icons play while
 * the heading is hovered or while the tool is working.
 */
export function ToolHead({
  title,
  blurb,
  busy,
  icon,
}: {
  title: string;
  blurb: string;
  busy?: boolean;
  icon: (active: boolean) => ReactNode;
}) {
  const [hot, setHot] = useState(false);

  return (
    <header className="mb-8">
      <div
        className="mb-5 flex items-center gap-3.5"
        onPointerEnter={() => setHot(true)}
        onPointerLeave={() => setHot(false)}
      >
        <motion.span
          animate={{ scale: hot ? 1.06 : 1 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          className="glass grid size-12 shrink-0 place-items-center text-[var(--accent)]"
        >
          {icon(hot || Boolean(busy))}
        </motion.span>
        <h1 className="text-[28px] font-semibold tracking-[-0.025em]">{title}</h1>
      </div>
      <p className="max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--text-dim)]">{blurb}</p>
    </header>
  );
}
