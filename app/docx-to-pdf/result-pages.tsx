"use client";

import { Download, Info } from "lucide-react";
import { motion } from "motion/react";
import type { Rendered } from "../lib/pdf-to-image";

const SPRING = { type: "spring", bounce: 0, duration: 0.35 } as const;

/** The honest note, the download, and a preview of every page produced. */
export function ResultPages({
  url,
  fileName,
  blocks,
  pages,
}: {
  url: string;
  fileName: string;
  blocks: number;
  pages: Rendered[];
}) {
  return (
    <>
      <div className="glass mb-4 flex items-start gap-2 rounded-2xl p-4 text-[12.5px] leading-[1.55] text-[var(--text-dim)]">
        <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>
          <strong className="font-semibold text-[var(--text)]">
            {blocks} block{blocks === 1 ? "" : "s"} of text laid out over {pages.length} page
            {pages.length === 1 ? "" : "s"}.
          </strong>{" "}
          This is a text conversion: images, tables, columns and Word&rsquo;s own fonts are not
          reproduced, so the page breaks will not match Word exactly.
        </span>
      </div>

      <motion.a
        href={url}
        download={fileName}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        className="clay mb-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold"
      >
        <Download aria-hidden className="size-4" />
        Download the PDF
      </motion.a>

      <ul className={`grid gap-4 ${pages.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {pages.map((p, i) => (
          <motion.li
            key={p.page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: i * 0.04 }}
            className="glass overflow-hidden rounded-2xl p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={`Page ${p.page} of the converted PDF`}
              loading="lazy"
              className="block w-full rounded-xl bg-white"
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
}
