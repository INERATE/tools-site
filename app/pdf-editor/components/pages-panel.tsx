"use client";

import type { PageOp } from "../hooks/use-page-ops";
import { PageThumb } from "./page-thumb";

const BLANK: PageOp = { rotate: 0, deleted: false };

export function PagesPanel({
  pages, active, thumbs, opFor, onPick, onRotate, onToggleDelete, deleted,
}: {
  pages: number;
  active: number;
  thumbs: { index: number; url: string }[];
  opFor?: (i: number) => PageOp;
  onPick: (i: number) => void;
  onRotate?: (i: number) => void;
  onToggleDelete?: (i: number) => void;
  deleted: number;
}) {
  return (
    <>
      {deleted > 0 && (
        <p className="rounded-lg bg-[#ff8fa3]/10 px-2 py-1 text-[10.5px] text-[#ff8fa3]">
          {deleted} page{deleted === 1 ? "" : "s"} will be removed on export.
        </p>
      )}
      {Array.from({ length: pages }, (_, i) => (
        <PageThumb
          key={i}
          index={i}
          active={i === active}
          op={opFor?.(i) ?? BLANK}
          url={thumbs[i]?.url}
          onPick={onPick}
          onRotate={onRotate ?? (() => {})}
          onToggleDelete={onToggleDelete ?? (() => {})}
        />
      ))}
    </>
  );
}
