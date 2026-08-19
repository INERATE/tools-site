import { TOOLS } from "../tool-list";

const STATS = [
  { value: `${TOOLS.length}+`, label: "tools, one suite" },
  { value: "0 B", label: "ever uploaded" },
  { value: "5", label: "themes, your pick" },
];

export function TrustStats() {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <span className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
            {s.value}
          </span>
          <span className="text-[12px] font-medium tracking-[0.04em] text-[var(--text-dim)]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
