"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import type { ComponentType } from "react";
import type { IconProps } from "../icons/icon-shell";
import { usePanelTransforms } from "./use-panel-transforms";

type Tool = { href: string; icon: ComponentType<IconProps>; title: string; description: string; category: string };

/** One stop in the pinned scroll-scrub: slides in from alternating sides as its segment becomes active. */
export function ToolStoryPanel({
  tool,
  index,
  total,
  scrollYProgress,
  isActive,
}: {
  tool: Tool;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
}) {
  const { opacity, x, rotate, scale } = usePanelTransforms(scrollYProgress, index, total);
  const Icon = tool.icon;

  return (
    <motion.div
      style={{ opacity, x, rotate, scale, pointerEvents: isActive ? "auto" : "none" }}
      className="clay-card absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center sm:p-10"
    >
      <span className="clay-icon grid size-16 place-items-center text-[var(--accent)]">
        <Icon active={isActive} size={32} />
      </span>
      <span className="text-[11px] font-bold tracking-[0.14em] text-[var(--text-dim)] uppercase">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {tool.category}
      </span>
      <h3 className="text-[22px] font-bold tracking-tight text-[var(--text)]">{tool.title}</h3>
      <p className="max-w-sm text-[14.5px] leading-relaxed text-[var(--text-dim)]">{tool.description}</p>
      <Link href={tool.href} className="clay flex h-10 items-center gap-2 px-5 text-[13.5px] font-bold">
        Open {tool.title}
        <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </motion.div>
  );
}
