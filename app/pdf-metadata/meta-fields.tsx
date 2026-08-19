"use client";

import type { PdfMeta } from "../lib/pdf-metadata";

const FIELDS: { key: keyof PdfMeta; label: string; placeholder: string }[] = [
  { key: "title", label: "Title", placeholder: "Untitled document" },
  { key: "author", label: "Author", placeholder: "Jane Doe" },
  { key: "subject", label: "Subject", placeholder: "What this document is about" },
  { key: "keywords", label: "Keywords", placeholder: "comma, separated, tags" },
];

export function MetaFields({ meta, update }: { meta: PdfMeta; update: <K extends keyof PdfMeta>(key: K, value: PdfMeta[K]) => void }) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      {FIELDS.map((f) => (
        <label key={f.key} className="flex flex-col gap-1 text-[12.5px] text-[var(--text-dim)]">
          {f.label}
          <input
            value={meta[f.key]}
            onChange={(e) => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[13.5px] text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>
      ))}
    </div>
  );
}
