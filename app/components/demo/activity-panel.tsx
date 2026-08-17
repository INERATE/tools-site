"use client";

import { ActivityLog } from "./activity-log";
import { ResultState } from "./result-state";
import type { ToolMode } from "./types";

/** Right column: the activity log, the run state, and the terminal prompt. */
export function ActivityPanel({
  mode,
  processing,
  done,
  onRun,
}: {
  mode: ToolMode;
  processing: boolean;
  done: boolean;
  onRun: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 bg-[var(--bg)]/90 p-5 text-left font-mono sm:p-6 lg:col-span-5">
      <div className="flex flex-col gap-3">
        <ActivityLog />
        <ResultState processing={processing} done={done} />
      </div>

      <div
        onClick={onRun}
        className="group flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-2 text-[11px] transition-colors hover:border-[var(--accent)]"
      >
        <div className="flex items-center gap-2 text-[var(--text-dim)] group-hover:text-[var(--text)]">
          <span className="font-bold text-[var(--accent)]">&gt;</span>
          <span>run {mode}</span>
          <span className="inline-block size-1.5 animate-pulse bg-[var(--accent)]" />
        </div>
        <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[9.5px] text-[var(--text-dim)] group-hover:text-[var(--text)]">
          Click ↵
        </span>
      </div>
    </div>
  );
}
