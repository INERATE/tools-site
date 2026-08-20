"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { nextSteps } from "../lib/tool-chains";

/**
 * Shown only once a run finishes and the download is ready — the moment the
 * user is done and open to what else is here. Deliberately absent while they
 * work, so the tool canvas stays uncluttered.
 */
export function NextSteps({ show }: { show: boolean }) {
  const pathname = usePathname();
  const { why, items } = nextSteps(pathname);

  if (!show || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      aria-label="What to do next"
      className="clay-card p-4"
    >
      <h2 className="text-[13px] font-semibold">Next step</h2>
      <p className="mt-0.5 mb-3 text-[12px] text-[var(--text-dim)]">{why}</p>

      <div className="flex flex-col gap-1.5">
        {items.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            prefetch={false}
            className="group flex items-start gap-2.5 rounded-xl border border-[var(--border)] px-3 py-2.5 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/8"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold">{t.title}</p>
              <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-[var(--text-dim)]">
                {t.description}
              </p>
            </div>
            <ArrowRight
              aria-hidden
              className="mt-0.5 size-3.5 shrink-0 text-[var(--text-dim)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            />
          </Link>
        ))}
      </div>

      <Link
        href="/all-tools"
        prefetch={false}
        className="mt-3 flex items-center justify-center gap-1 text-[12px] font-medium text-[var(--text-dim)] transition-colors hover:text-[var(--accent)]"
      >
        Browse all tools
        <ArrowRight aria-hidden className="size-3" />
      </Link>
    </motion.section>
  );
}
