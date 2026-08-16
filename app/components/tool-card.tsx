"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType, CSSProperties } from "react";
import type { IconProps } from "./icons/icon-shell";
import { useTilt } from "../lib/use-tilt";
import "./card.css";

export type ToolCardProps = {
  href: string;
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  live?: boolean;
  /** Position in the grid — phases the float so the cards never march in step. */
  index: number;
};

/**
 * Four nested nodes, one transform each: reveal (Framer) → float (CSS loop)
 * → tilt (Framer springs) → content. Stacking them is what lets an infinite
 * idle animation and an interruptible hover spring coexist.
 */
export function ToolCard({ href, icon: Icon, title, description, live, index }: ToolCardProps) {
  const tilt = useTilt();
  const reduced = useReducedMotion();
  const phase = {
    "--dur": `${5.2 + index * 0.55}s`,
    "--delay": `${index * -1.3}s`,
    "--amp": `${6 + (index % 3) * 2}px`,
  } as CSSProperties;

  const card = (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6, delay: index * 0.06 }}
      // Handlers live here, on the one node nothing transforms: a rect read off
      // the tilted card would feed its own rotation back into the input.
      onPointerMove={tilt.move}
      onPointerEnter={tilt.enter}
      onPointerDown={tilt.down}
      onPointerUp={tilt.enter}
      onPointerLeave={tilt.leave}
    >
      <div className="card-float h-full" style={phase}>
        <motion.div
          style={{ rotateX: tilt.rx, rotateY: tilt.ry, y: tilt.lift, transformPerspective: 900 }}
          className="glass relative h-full overflow-hidden rounded-[22px] p-6"
        >
          <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: tilt.glare, opacity: tilt.glow }} />
          <motion.span aria-hidden className="card-ring" style={{ opacity: tilt.glow }} />
          <div className="relative flex h-full flex-col gap-3">
            <span className="text-[var(--accent)]">
              <Icon active={tilt.active} size={26} />
            </span>
            <h3 className="text-[15.5px] font-[550] tracking-[-0.011em]">{title}</h3>
            <p className="flex-1 text-[13.5px] leading-[1.55] text-[var(--text-dim)]">{description}</p>
            {!live && (
              <span className="self-start rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">
                Soon
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  if (!live) return card;
  return (
    <Link href={href} onFocus={tilt.enter} onBlur={tilt.leave} className="block h-full cursor-pointer rounded-[22px]">
      {card}
    </Link>
  );
}
