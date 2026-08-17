"use client";

const BASE =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 px-3.5 text-[14px] " +
  "outline-none transition-colors placeholder:text-[var(--text-dim)]/60 focus-visible:border-[var(--accent)]";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-[var(--text-dim)]">{label}</span>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${BASE} resize-y py-2.5 leading-[1.55]`}
        />
      ) : (
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${BASE} h-11`}
        />
      )}
    </label>
  );
}

export function Card({ children, title, onRemove }: { children: React.ReactNode; title: string; onRemove?: () => void }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-[var(--text-dim)] uppercase">{title}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="h-8 cursor-pointer rounded-full px-3 text-[12px] font-medium text-[var(--text-dim)] transition-colors hover:text-[#ff8fa3]"
          >
            Remove
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export const ADD =
  "h-10 w-full cursor-pointer rounded-xl border border-dashed border-[var(--border)] text-[13px] " +
  "font-medium text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]";
