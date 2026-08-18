"use client";

import { ChevronDown, ChevronUp, FileText } from "lucide-react";

/**
 * The merger's "which document comes first" control — separate from the
 * page-level board on the left. Each row is one uploaded PDF; the arrows
 * move its whole block of pages up or down in the final order.
 */
export function FileOrderList({
  files,
  order,
  onMove,
}: {
  files: File[];
  /** `src` indices in current merge order, de-duplicated. */
  order: number[];
  onMove: (src: number, dir: 1 | -1) => void;
}) {
  if (order.length < 2) return null;

  return (
    <div className="glass rounded-2xl p-4">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">
        Document order
      </p>
      <ul className="flex flex-col gap-1.5">
        {order.map((src, i) => (
          <li
            key={src}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-2 py-1.5 text-[12.5px]"
          >
            <FileText className="size-3.5 shrink-0 text-[var(--text-dim)]" aria-hidden />
            <span className="min-w-0 flex-1 truncate">{files[src]?.name ?? `File ${i + 1}`}</span>
            <button
              type="button"
              aria-label="Move earlier"
              disabled={i === 0}
              onClick={() => onMove(src, -1)}
              className="rounded p-0.5 text-[var(--text-dim)] transition-colors hover:text-[var(--text)] disabled:opacity-25"
            >
              <ChevronUp className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Move later"
              disabled={i === order.length - 1}
              onClick={() => onMove(src, 1)}
              className="rounded p-0.5 text-[var(--text-dim)] transition-colors hover:text-[var(--text)] disabled:opacity-25"
            >
              <ChevronDown className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
