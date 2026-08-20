"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { parseRanges } from "../lib/page-range";

const CHIP =
  "cursor-pointer rounded-full border border-[var(--border)] px-3 py-1.5 text-[12px] font-medium " +
  "text-[var(--text-dim)] transition-[color,border-color,transform] duration-200 " +
  "hover:border-[var(--accent)] hover:text-[var(--text)] active:scale-95";

const PRESETS = (n: number) => [
  { label: "First page", value: "1" },
  { label: "Last page", value: `${n}` },
  ...(n > 2 ? [{ label: "Odd pages", value: odds(n) }] : []),
];

const odds = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1)
    .filter((p) => p % 2 === 1)
    .join(", ");

/** Types which pages to remove and hands the board everything else to keep. */
export function QuickPick({ total, onKeep }: { total: number; onKeep: (pages: number[]) => void }) {
  const [text, setText] = useState("");
  const [bad, setBad] = useState<string | null>(null);

  const apply = (value: string) => {
    setText(value);
    try {
      const drop = new Set(parseRanges(value, total));
      const keep = Array.from({ length: total }, (_, i) => i).filter((i) => !drop.has(i));
      if (keep.length === 0) throw new Error("That would remove every page — leave at least one.");
      onKeep(keep);
      setBad(null);
    } catch (e) {
      setBad(e instanceof Error ? e.message : "That is not a page range.");
    }
  };

  return (
    <div className="glass mb-5 rounded-2xl p-4">
      <label htmlFor="drop" className="mb-2 block text-[13px] font-medium">
        Remove pages
      </label>
      <div className="flex gap-2">
        <input
          id="drop"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), apply(text))}
          placeholder={`e.g. 2, 4-5 — of ${total}`}
          className="h-11 min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 px-3.5 text-[15px] outline-none focus-visible:border-[var(--accent)]"
        />
        <button type="button" onClick={() => apply(text)} className="clay flex h-11 items-center gap-1.5 px-4 text-[13.5px] font-semibold">
          <Trash2 aria-hidden className="size-3.5" />
          Remove
        </button>
      </div>
      {bad && (
        <p role="alert" className="mt-2 text-[12.5px] font-medium text-[#ff8fa3]">
          {bad}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS(total).map((p) => (
          <button key={p.label} type="button" onClick={() => apply(p.value)} className={CHIP}>
            {p.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-[var(--text-dim)]">Or click a page on the board below to drop it individually.</p>
    </div>
  );
}
