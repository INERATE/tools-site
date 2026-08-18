"use client";

import type { DiffLine } from "../lib/diff-lines";

const ROW: Record<DiffLine["kind"], string> = {
  same: "text-[var(--text-dim)]",
  add: "bg-emerald-500/12 text-emerald-500",
  remove: "bg-rose-500/12 text-rose-400 line-through decoration-1",
};

const MARK: Record<DiffLine["kind"], string> = { same: " ", add: "+", remove: "−" };

export function DiffView({ diff }: { diff: DiffLine[] }) {
  if (diff.every((d) => d.kind === "same")) {
    return <p className="text-[13.5px] text-[var(--text-dim)]">No differences found — the text content is identical.</p>;
  }
  return (
    <ul className="max-h-[60vh] overflow-y-auto rounded-xl border border-[var(--border)] font-mono text-[12.5px] leading-[1.7]">
      {diff.map((d, i) => (
        <li key={i} className={`px-3 py-0.5 ${ROW[d.kind]}`}>
          <span className="mr-2 select-none opacity-60">{MARK[d.kind]}</span>
          {d.text}
        </li>
      ))}
    </ul>
  );
}
