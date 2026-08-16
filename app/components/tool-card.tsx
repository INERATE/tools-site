"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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
  category?: string;
  /** Position in the grid — phases the float so the cards never march in step. */
  index: number;
};

/**
 * Enhanced Apple Claymorphic & Liquid Glass Tool Card
 */
export function ToolCard({ href, icon: Icon, title, description, live, category, index }: ToolCardProps) {
  const tilt = useTilt();
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
          {/* Dynamic Glare on Hover */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[26px]"
            style={{ backgroundImage: tilt.glare, opacity: tilt.glow }}
          />

          {/* Top Row: Clay Icon + Status Badge */}
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="clay-icon relative grid size-12 place-items-center text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
                <Icon active={tilt.active} size={24} />
              </div>

              {live ? (
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-400 uppercase shadow-sm">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">
                  Soon
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  {title}
                </h3>
                {live && (
                  <ArrowUpRight className="size-4 text-[var(--text-dim)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[var(--accent)]" />
                )}
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--text-dim)]">{description}</p>
            </div>
          </div>

          {/* Bottom Footer Info */}
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
    <Link href={href} onFocus={tilt.enter} onBlur={tilt.leave} className="block h-full cursor-pointer rounded-[26px]">
      {card}
    </Link>
  );
}
