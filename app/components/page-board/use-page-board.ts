"use client";

import { useCallback } from "react";
import { moveItem } from "../../lib/arrange";
import { isPdf, loadFile } from "./load-pages";
import { duplicateSlot, removeSlot, rotateEvery, rotateSlot } from "./slot-ops";
import { useBoardState } from "./use-board-state";
import { thumbKey } from "./types";

/**
 * Every page of every added file, as one arrangeable list.
 * `single: true` makes a new pick replace the board instead of appending — the
 * splitter and converter work on one document at a time.
 */
export function usePageBoard({ single = false }: { single?: boolean } = {}) {
  const s = useBoardState();
  const { setSlots } = s;

  const addFiles = useCallback(
    async (picked: File[]) => {
      const pdfs = picked.filter(isPdf);
      if (pdfs.length === 0) return s.setError(picked.length ? "Those files were not PDFs." : null);
      if (single) s.wipe();
      else s.setError(null);

      for (const file of single ? pdfs.slice(0, 1) : pdfs) {
        const src = s.takeSrc();
        s.setFiles((prev) => Object.assign([...prev], { [src]: file }));
        try {
          await loadFile(
            file,
            src,
            (fresh) => {
              s.addPristine(fresh);
              s.setSlots((prev) => [...prev, ...fresh]);
              s.setPending((n) => n + fresh.length);
            },
            (page, thumb) => {
              s.keepUrl(thumb.url);
              s.setThumbs((t) => ({ ...t, [thumbKey(src, page)]: thumb }));
              s.setPending((n) => Math.max(0, n - 1));
            },
          );
        } catch {
          s.setError(`${file.name} could not be opened — it may be encrypted or damaged.`);
          s.setPending(0);
        }
      }
    },
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
