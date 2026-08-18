"use client";

import type { FormField } from "../lib/fill-pdf-form";

const INPUT =
  "w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[13.5px] text-[var(--text)] outline-none focus:border-[var(--accent)]";

/** One form field, rendered by its real pdf-lib type — text/checkbox/radio/dropdown. */
export function FieldInput({ field, onChange }: { field: FormField; onChange: (value: string | boolean) => void }) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-[var(--text-dim)]">
      {field.name}
      {field.kind === "text" && (
        <input type="text" className={INPUT} value={field.value} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.kind === "checkbox" && (
        <input
          type="checkbox"
          checked={field.checked}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 accent-[var(--accent)]"
        />
      )}
      {(field.kind === "radio" || field.kind === "dropdown") && (
        <select className={INPUT} value={field.value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            Choose…
          </option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}
