"use client";

import { useEffect } from "react";
import { thumbKey } from "../components/page-board/types";
import { usePageBoard } from "../components/page-board/use-page-board";
import { invalidateEdit } from "../lib/invalidate-edit";
import { railThumb } from "../pdf-to-image/rail-thumb";
import { useRender } from "../pdf-to-image/use-render";

/** Wires the shared page-board + render engine, locked to JPEG output for this landing page. */
export function usePdfToJpg() {
  const board = usePageBoard({ single: true });
  const r = useRender();

  useEffect(() => {
    r.setFormat("jpeg");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const base = board.files[0]?.name.replace(/\.pdf$/i, "") ?? "page";
  const step = r.pages.length > 0 ? 2 : board.files.length > 0 ? 1 : 0;
  const count = board.slots.length;
  const edit = invalidateEdit(r.reset);
  const first = board.slots[0];
  const thumb = railThumb(r.pages[0], first && board.thumbs[thumbKey(first.src, first.page)]);

  return { board, r, base, ext: "jpg" as const, step, count, edit, thumb };
}
