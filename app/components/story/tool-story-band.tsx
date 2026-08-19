"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { ComponentType } from "react";
import type { IconProps } from "../icons/icon-shell";
import { useAutoPulse } from "../../lib/use-auto-pulse";
import { FrameLoop } from "./frame-loop";
import { STORY_CLIPS } from "./story-clips";

type Tool = { href: string; icon: ComponentType<IconProps>; title: string; description: string; category: string };

/** One full-width band per recommended tool — sequential scroll-reveal, alternating sides. No pinning, no crossfade, nothing to get stuck mid-transition. */
export function ToolStoryBand({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const fromLeft = index % 2 === 0;
  const pulse = useAutoPulse(1600, 2200, index * 350);
  const clip = STORY_CLIPS[tool.href];

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      className={`clay-card flex flex-col items-center gap-8 rounded-[2rem] p-8 sm:p-12 md:gap-14 md:p-16 ${
        fromLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {clip ? (
        <div className="relative w-full max-w-[22rem] shrink-0 md:max-w-[26rem]">
          {/* Stage: the clip's glass material was lit for a dark backdrop —
              without this it reads as flat black slabs on light themes. */}
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(8,8,10,0.6),rgba(8,8,10,0.15)_60%,transparent_75%)] blur-2xl"
          />
          <FrameLoop {...clip} className="relative w-full" />
        </div>
      ) : (
        <span className="clay-icon grid size-28 shrink-0 place-items-center text-[var(--accent)] md:size-36">
          <Icon active={pulse} size={64} />
        </span>
      )}
      <div className={`flex flex-col items-center gap-3 text-center ${fromLeft ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
        <span className="text-[11px] font-bold tracking-[0.14em] text-[var(--text-dim)] uppercase">
          {String(index + 1).padStart(2, "0")} · {tool.category}
        </span>
        <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
          {tool.title}
        </h3>
        <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-dim)] md:max-w-sm">{tool.description}</p>
        <Link href={tool.href} className="clay mt-2 flex h-11 items-center gap-2 px-6 text-[14px] font-bold">
          Open {tool.title}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </motion.div>
  );
}
