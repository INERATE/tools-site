"use client";

import { ImageDown, Loader2 } from "lucide-react";

const ACTION =
  "clay mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] " +
  "font-semibold disabled:cursor-default disabled:opacity-60 shimmer";

export function ConvertButton({
  count,
  ext,
  busy,
  done,
  total,
  onRun,
}: {
  count: number;
  ext: string;
  busy: boolean;
  done: number;
  total: number;
  onRun: () => void;
}) {
  return (
    <button onClick={onRun} disabled={busy} className={ACTION}>
      {busy ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <ImageDown aria-hidden className="size-4" />}
      {busy
        ? total
          ? `Rendering ${done} of ${total}…`
          : "Loading renderer…"
        : `Convert ${count} page${count === 1 ? "" : "s"} to ${ext.toUpperCase()}`}
    </button>
  );
}
