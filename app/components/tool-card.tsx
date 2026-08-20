"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType, CSSProperties } from "react";
import type { IconProps } from "./icons/icon-shell";
import { useTilt } from "../lib/use-tilt";
import { useAutoPulse } from "../lib/use-auto-pulse";
import { ToolCardBody } from "./tool-card-body";
import "./card.css";

export type ToolCardProps = {
  href: string;
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  live?: boolean;
  category?: string;
  /** Position in the grid — phases the float so the cards never march in step. */
  index: number;
};

/** Apple claymorphic + liquid glass tool card: tilt, glare, and a gentle float. */
export function ToolCard({ href, icon: Icon, title, description, live, category, index }: ToolCardProps) {
  const tilt = useTilt();
  const pulse = useAutoPulse(1600, 2600, index * 260);
  const reduced = useReducedMotion();
  const phase = {
    "--dur": `${5.2 + index * 0.55}s`,
    "--delay": `${index * -1.3}s`,
    "--amp": `${6 + (index % 3) * 2}px`,
  } as CSSProperties;

  const card = (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6, delay: index * 0.06 }}
      onPointerMove={tilt.move}
      onPointerEnter={tilt.enter}
      onPointerDown={tilt.down}
      onPointerUp={tilt.enter}
      onPointerLeave={tilt.leave}
    >
      <div className="card-float h-full" style={phase}>
        <motion.div
          style={{ rotateX: tilt.rx, rotateY: tilt.ry, y: tilt.lift, transformPerspective: 900 }}
          className="clay-card relative flex h-full flex-col justify-between overflow-hidden p-6"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[26px] transition-opacity duration-300"
            style={{ backgroundImage: tilt.glare, opacity: tilt.glow }}
          />

          <ToolCardBody Icon={Icon} active={tilt.active || pulse} live={live} title={title} description={description} />

          <div className="mt-5 flex items-center justify-between border-t border-[var(--border)]/70 pt-3 text-[11px] font-medium text-[var(--text-dim)]">
            <span className="text-[var(--text-dim)]">{category || "Document Utility"}</span>
            <span className="font-mono text-[10px] text-[var(--accent)]">100% Client-Side</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  if (!live) return card;
  return (
    <Link href={href} prefetch={false} onFocus={tilt.enter} onBlur={tilt.leave} className="block h-full cursor-pointer rounded-[26px]">
      {card}
    </Link>
  );
}
