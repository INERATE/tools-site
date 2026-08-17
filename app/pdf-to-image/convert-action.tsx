"use client";

import { ConvertButton } from "./convert-button";
import type { Rendered } from "../lib/pdf-to-image";

/** The rail's action slot: the convert button, or a done note once rendered. */
export function ConvertAction({
  pages,
  count,
  ext,
  busy,
  done,
  total,
  onRun,
}: {
  pages: Rendered[];
  count: number;
  ext: string;
  busy: boolean;
  done: number;
  total: number;
  onRun: () => void;
}) {
  if (pages.length > 0) {
    return (
      <p className="text-center text-[12.5px] font-medium text-emerald-400">
        Converted — download each page below
      </p>
    );
  }
  return <ConvertButton count={count} ext={ext} busy={busy} done={done} total={total} onRun={onRun} />;
}
