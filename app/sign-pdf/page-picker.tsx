"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function PagePicker({ index, count, onGo }: { index: number; count: number; onGo: (n: number) => void }) {
  if (count < 2) return null;
  return (
    <div className="mb-3 flex items-center justify-center gap-3 text-[12.5px] text-[var(--text-dim)]">
      <button
        type="button"
        onClick={() => onGo(index - 1)}
        disabled={index === 0}
        aria-label="Previous page"
        className="rounded-full p-1 transition-colors hover:text-[var(--text)] disabled:opacity-25"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span>
        Page {index + 1} of {count}
      </span>
      <button
        type="button"
        onClick={() => onGo(index + 1)}
        disabled={index === count - 1}
        aria-label="Next page"
        className="rounded-full p-1 transition-colors hover:text-[var(--text)] disabled:opacity-25"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
