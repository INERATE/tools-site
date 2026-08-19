"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ComponentType } from "react";
import type { IconProps } from "../icons/icon-shell";
import { useAutoPulse } from "../../lib/use-auto-pulse";
import { useTilt } from "../../lib/use-tilt";
import {
  MergerShowcase,
  SplitterShowcase,
  CompressShowcase,
  PdfToWordShowcase,
  JpgToPdfShowcase,
  SignPdfShowcase,
} from "./tool-showcases";

type Tool = { href: string; icon: ComponentType<IconProps>; title: string; description: string; category: string };

const TOOL_HIGHLIGHTS: Record<string, string[]> = {
  "/pdf-merger": ["Drag & Reorder", "Visual Page Grid", "Zero Server Upload"],
  "/pdf-split": ["Custom Page Ranges", "Visual Selection", "Lossless Extract"],
  "/compress-pdf": ["Smart Optimization", "3 Quality Tiers", "Live Size Diff"],
  "/pdf-to-word": ["Preserve Layout", "Editable DOCX", "100% Client-Side"],
  "/jpg-to-pdf": ["Multi-Image Pack", "Margin Controls", "High-DPI Output"],
  "/sign-pdf": ["Vector Signature", "Drag & Position", "Client-Side Stamp"],
};

function renderShowcase(href: string, Icon: ComponentType<IconProps>, pulse: boolean) {
  switch (href) {
    case "/pdf-merger":
      return <MergerShowcase />;
    case "/pdf-split":
      return <SplitterShowcase />;
    case "/compress-pdf":
      return <CompressShowcase />;
    case "/pdf-to-word":
      return <PdfToWordShowcase />;
    case "/jpg-to-pdf":
      return <JpgToPdfShowcase />;
    case "/sign-pdf":
      return <SignPdfShowcase />;
    default:
      return (
        <span className="clay-icon grid size-28 shrink-0 place-items-center text-[var(--accent)] md:size-36">
          <Icon active={pulse} size={64} />
        </span>
      );
  }
}

/**
 * Full-width story band per recommended tool with scroll-linked parallax,
 * interactive 3D pointer-tilt, dynamic specular glare, and theme-native interactive showcases.
 */
export function ToolStoryBand({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const fromLeft = index % 2 === 0;
  const pulse = useAutoPulse(1600, 2200, index * 350);
  const tags = TOOL_HIGHLIGHTS[tool.href] || ["100% Private", "Zero Latency", "Instant"];

  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(6);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const frameY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [fromLeft ? -2 : 2, fromLeft ? 2 : -2]);
  const textY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const badgeY1 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
      onPointerMove={tilt.move}
      onPointerEnter={tilt.enter}
      onPointerLeave={tilt.leave}
      onPointerDown={tilt.down}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        y: tilt.lift,
        transformPerspective: 1100,
      }}
      className={`clay-card group relative flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-10 md:gap-12 md:p-14 ${
        fromLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dynamic specular glare tracking pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{ background: tilt.glare, opacity: tilt.glow }}
      />

      {/* 3D Visual stage with parallax */}
      <motion.div
        style={{ y: frameY, rotateZ: frameRotate }}
        className="relative flex w-full max-w-[22rem] shrink-0 items-center justify-center sm:max-w-[24rem] md:max-w-[27rem]"
      >
        {renderShowcase(tool.href, Icon, pulse)}

        {/* Floating glass feature chip overlay */}
        <motion.div
          style={{ y: badgeY1 }}
          className={`glass pointer-events-none absolute -top-3 z-30 hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-semibold text-[var(--text-dim)] shadow-xl backdrop-blur-xl ${
            fromLeft ? "right-2" : "left-2"
          }`}
        >
          <Sparkles className="size-3 text-[var(--accent)]" />
          <span>{tags[0]}</span>
        </motion.div>
      </motion.div>

      {/* Text & action column with subtle counter-parallax */}
      <motion.div
        style={{ y: textY }}
        className={`flex flex-col items-center gap-3.5 text-center ${
          fromLeft ? "md:items-start md:text-left" : "md:items-end md:text-right"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          <span>
            {String(index + 1).padStart(2, "0")} · {tool.category}
          </span>
        </div>

        <h3 className="text-[clamp(1.6rem,3.5vw,2.35rem)] font-extrabold tracking-[-0.025em] text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {tool.title}
        </h3>

        <p className="max-w-md text-[14.5px] leading-relaxed text-[var(--text-dim)] md:max-w-sm">
          {tool.description}
        </p>

        {/* Feature tags */}
        <div className={`flex flex-wrap items-center gap-2 pt-1 ${fromLeft ? "justify-start" : "justify-end"}`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="glass rounded-full px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-dim)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={tool.href}
          className="clay mt-3 flex h-11 items-center gap-2 px-6 text-[14px] font-bold tracking-wide transition-all hover:scale-[1.03] active:scale-[0.97]"
        >
          <span>Open {tool.title}</span>
          <ArrowRight aria-hidden className="size-4 stroke-[2.5]" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
