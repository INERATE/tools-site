"use client";

import { useCallback } from "react";
import { moveItem } from "../../lib/arrange";
import { addFilesToBoard } from "./add-files";
import { duplicateSlot, moveFileBlock, removeSlot, rotateEvery, rotateSlot } from "./slot-ops";
import { useBoardState } from "./use-board-state";

/**
 * Every page of every added file, as one arrangeable list.
 * `single: true` makes a new pick replace the board instead of appending — the
 * splitter and converter work on one document at a time.
 */
export function usePageBoard({ single = false }: { single?: boolean } = {}) {
  const s = useBoardState();
  const { setSlots } = s;

  const addFiles = useCallback(
    (picked: File[]) => addFilesToBoard(picked, single, s),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [single],
  );

  return {
    files: s.files,
    slots: s.slots,
    thumbs: s.thumbs,
    pending: s.pending,
    error: s.error,
    setError: s.setError,
    /** Page count as first loaded — ranges are validated against this. */
    total: s.pristineCount,
    addFiles,
    move: (from: number, to: number) => setSlots((v) => moveItem(v, from, to)),
    /** Reorders whole documents (not just pages) — used by the merger's file list. */
    moveFile: (src: number, dir: 1 | -1) => setSlots((v) => moveFileBlock(v, src, dir)),
    remove: (id: string) => setSlots((v) => removeSlot(v, id)),
    rotate: (id: string, dir: 1 | -1) => setSlots((v) => rotateSlot(v, id, dir)),
    rotateAll: (dir: 1 | -1) => setSlots((v) => rotateEvery(v, dir)),
    duplicate: (id: string) => setSlots((v) => duplicateSlot(v, id, crypto.randomUUID())),
    reset: () => setSlots(s.pristineSlots()),
    /** Rebuilds a single-file board from the given zero-based pages. */
    keepOnly: (pages: number[]) => {
      const all = s.pristineSlots();
      setSlots(pages.map((p) => all[p]).filter(Boolean));
    },
  };
}
