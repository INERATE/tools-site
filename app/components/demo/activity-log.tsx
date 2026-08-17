import { Terminal } from "lucide-react";

/**
 * The three real pdf-lib steps a merge takes — read, merge, save — not
 * invented worker or WASM internals.
 */
export function ActivityLog() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 text-[11px] text-[var(--text-dim)]">
        <div className="flex items-center gap-1.5">
          <Terminal className="size-3.5 text-[var(--accent)]" />
          <span className="font-bold text-[var(--text)]">Local activity</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-[var(--text-dim)]">
        <div className="flex items-center gap-1.5 font-semibold text-[var(--text)]">
          <span className="size-1.5 animate-ping rounded-full bg-emerald-400" />
          <span>Running on your device</span>
        </div>
        <div className="space-y-1 border-l border-[var(--border)] pl-3">
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[var(--text-dim)]">↳ read</span>
            <span className="text-emerald-400">pages parsed</span>
          </div>
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[var(--text-dim)]">↳ merge</span>
            <span className="text-[var(--accent)]">order preserved</span>
          </div>
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[var(--text-dim)]">↳ save</span>
            <span className="text-[var(--accent-3)]">download ready</span>
          </div>
        </div>
      </div>
    </>
  );
}
