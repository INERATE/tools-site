"use client";

import { useEffect, useRef, useState } from "react";
import { renderPages, type Format, type Rendered } from "../lib/pdf-to-image";
import { assemblePdf, type Slot } from "../lib/assemble-pdf";

/** Rasterization state. Revokes object URLs so a re-run cannot leak blobs. */
export function useRender() {
  const [format, setFormat] = useState<Format>("png");
  const [scale, setScale] = useState(2);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<string[]>([]);

  const clear = () => {
    urls.current.forEach(URL.revokeObjectURL);
    urls.current = [];
    setPages([]);
    setDone(0);
    setTotal(0);
  };

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  /* Renders the arrangement, not the original file: assembling first is what
     makes deleted pages stay gone and rotations come out baked in. */
  async function run(files: File[], slots: Slot[]) {
    clear();
    setBusy(true);
    setError(null);
    try {
      const out = await renderPages(await assemblePdf(files, slots), {
        format,
        scale,
        onProgress: (d, t) => {
          setDone(d);
          setTotal(t);
        },
      });
      urls.current = out.map((p) => p.url);
      setPages(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not convert that PDF.");
    } finally {
      setBusy(false);
    }
  }

  return {
    format, scale, pages, busy, done, total, error,
    run, setFormat, setScale, reset: clear,
  };
}
