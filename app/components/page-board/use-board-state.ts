"use client";

import { useEffect, useRef, useState } from "react";
import type { Slot, Thumb } from "./types";

/**
 * The board's raw state. Split out from the ops so that `wipe` — which has to
 * touch every setter and every ref at once — lives in one place instead of
 * being threaded through the hook that uses it.
 */
export function useBoardState() {
  const [files, setFiles] = useState<File[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, Thumb>>({});
  const [pending, setPending] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /** Pages as first loaded — what Reset and range picks are rebuilt from.
      State, not a ref: the page count is rendered, and refs cannot be read
      during render. */
  const [pristine, setPristine] = useState<Slot[]>([]);
  const urls = useRef<string[]>([]);
  const nextSrc = useRef(0);

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  function wipe() {
    urls.current.forEach(URL.revokeObjectURL);
    urls.current = [];
    setPristine([]);
    nextSrc.current = 0;
    setFiles([]);
    setSlots([]);
    setThumbs({});
    setPending(0);
    setError(null);
  }

  /* Mutating a ref that a hook returned is a lint error, so every write to
     one is exposed as a function instead. */
  const takeSrc = () => nextSrc.current++;
  const keepUrl = (url: string) => urls.current.push(url);
  const addPristine = (fresh: Slot[]) => setPristine((prev) => [...prev, ...fresh]);
  const pristineSlots = () => pristine.map((x) => ({ ...x }));

  return {
    files,
    slots,
    thumbs,
    pending,
    error,
    setFiles,
    setSlots,
    setThumbs,
    setPending,
    setError,
    pristineCount: pristine.length,
    takeSrc,
    keepUrl,
    addPristine,
    pristineSlots,
    wipe,
  };
}
