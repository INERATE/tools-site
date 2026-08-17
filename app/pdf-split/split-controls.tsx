"use client";

const PRESETS = (n: number) => [
  { label: "All pages", value: `1-${n}` },
  { label: "First page", value: "1" },
  { label: "Last page", value: `${n}` },
  ...(n > 1 ? [{ label: "Skip first", value: `2-${n}` }] : []),
];

const CHIP =
  "cursor-pointer rounded-full border border-[var(--border)] px-3 py-1.5 text-[12px] " +
  "font-medium text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]";

export function SplitControls({
  name,
  pages,
  range,
  onRange,
}: {
  name: string;
  pages: number;
  range: string;
  onRange: (v: string) => void;
}) {
  return (
    <div className="glass mb-6 rounded-2xl p-5">
      <p className="mb-4 truncate text-[13.5px] text-[var(--text-dim)]">
        <span className="font-medium text-[var(--text)]">{name}</span> · {pages} page
        {pages === 1 ? "" : "s"}
      </p>

      <label htmlFor="range" className="mb-2 block text-[13px] font-medium">
        Pages to keep
      </label>
      <input
        id="range"
        value={range}
        onChange={(e) => onRange(e.target.value)}
        inputMode="numeric"
        placeholder="e.g. 1-3, 5"
        className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 px-3.5 text-[15px] outline-none focus-visible:border-[var(--accent)]"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS(pages).map((p) => (
          <button key={p.label} type="button" onClick={() => onRange(p.value)} className={CHIP}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
