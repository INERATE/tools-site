import { Layers, Palette, ShieldCheck } from "lucide-react";
import { TOOLS } from "../tool-list";

const STATS = [
  { icon: Layers, value: `${TOOLS.length}+`, label: "tools, one suite" },
  { icon: ShieldCheck, value: "0 B", label: "ever uploaded" },
  { icon: Palette, value: "5", label: "themes, your pick" },
];

export function TrustStats() {
  return (
    <div className="glass mt-14 flex flex-wrap items-center justify-center divide-x divide-[var(--border)] rounded-2xl px-2 py-6 sm:px-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1.5 px-8 py-2 sm:px-12">
          <s.icon className="size-4 text-[var(--accent)]" strokeWidth={2.25} />
          <span className="animated-gradient-text text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.02em]">
            {s.value}
          </span>
          <span className="text-[12px] font-medium tracking-[0.04em] text-[var(--text-dim)] whitespace-nowrap">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
