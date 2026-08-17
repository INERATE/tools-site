"use client";

import { Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Rendered } from "../lib/pdf-to-image";

/** Result thumbnails, each its own download. */
export function PageGrid({ pages, base, ext }: { pages: Rendered[]; base: string; ext: string }) {
  const reduced = useReducedMotion();
  if (pages.length === 0) return null;

  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {pages.map((p, i) => (
        <motion.li
          key={p.page}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35, delay: reduced ? 0 : i * 0.04 }}
          className="glass overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.url}
            alt={`Page ${p.page}`}
            loading="lazy"
            className="block w-full bg-white/5"
            style={{ aspectRatio: `${p.width} / ${p.height}` }}
          />
          <a
            href={p.url}
            download={`${base}-p${p.page}.${ext}`}
            className="flex h-11 items-center justify-center gap-1.5 text-[12.5px] font-semibold text-[var(--text-dim)] transition-colors hover:text-[var(--accent)]"
          >
            <Download aria-hidden className="size-3.5" />
            Page {p.page}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
