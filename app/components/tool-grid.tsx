"use client";

import { ToolCard } from "./tool-card";
import { MergeIcon } from "./icons/merge-icon";
import { SplitIcon } from "./icons/split-icon";
import { WatermarkIcon } from "./icons/watermark-icon";
import { ToImageIcon } from "./icons/to-image-icon";
import { DocxIcon } from "./icons/docx-icon";
import { ResumeIcon } from "./icons/resume-icon";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const TOOLS = [
  {
    href: "/pdf-merger",
    icon: MergeIcon,
    title: "PDF Merger",
    description: "Combine multiple PDFs into a single clean file with custom page ordering.",
    live: true,
    category: "PDF Suite",
  },
  {
    href: "/pdf-split",
    icon: SplitIcon,
    title: "PDF Splitter",
    description: "Extract exactly the pages you want from a multi-page document.",
    category: "PDF Suite",
    live: true,
  },
  {
    href: "/watermark-remover",
    icon: WatermarkIcon,
    title: "Watermark Remover",
    description: "Strip background stamps, text overlays, and artifacts from documents.",
    category: "Clean & Polish",
  },
  {
    href: "/pdf-to-image",
    icon: ToImageIcon,
    title: "PDF to Image",
    description: "Export every page as a PNG or JPG, at the quality you choose.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/docx-to-pdf",
    icon: DocxIcon,
    title: "DOCX to PDF",
    description: "Convert Word documents to standard PDF while preserving fonts and layout.",
    category: "Convert & Export",
  },
  {
    href: "/resume-builder",
    icon: ResumeIcon,
    title: "Résumé Builder",
    description: "Fill in a form and export a clean PDF résumé — updates as you type.",
    category: "Document Studio",
    live: true,
  },
];

export function ToolGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Staggered column-based scroll parallax for tactile 3D depth
  const col1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} id="tools" className="mt-28 flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-[var(--accent)] uppercase">
            <Sparkles className="size-3.5" />
            <span>Complete Suite</span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[var(--text)]">
            Explore All Document Tools
          </h2>
        </div>
        <p className="max-w-[32ch] text-[13.5px] text-[var(--text-dim)]">
          Fast, sandboxed, and engineered to execute completely inside your browser tab.
        </p>
      </div>

      {/* Grid with Staggered Parallax Columns */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => {
          const colIndex = i % 3;
          const colTransform = colIndex === 0 ? col1Y : colIndex === 1 ? col2Y : col3Y;

          return (
            <motion.div key={tool.href} style={{ y: colTransform }}>
              <ToolCard {...tool} index={i} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
