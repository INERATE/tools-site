"use client";

import { useEffect, useRef, useState } from "react";
import { buildResume } from "../lib/build-resume";
import { renderPages } from "../lib/pdf-to-image";
import { SAMPLE, type Resume } from "../lib/resume-types";

/**
 * Holds the resume, and rebuilds the PDF 500ms after typing stops.
 * Object URLs from the previous build are revoked on every replacement, so a
 * long editing session cannot accumulate blobs.
 */
export function useResume() {
  const [data, setData] = useState<Resume>(SAMPLE);
  const [preview, setPreview] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const live = useRef<string[]>([]);

  useEffect(() => {
    let dead = false;
    // setBuilding lives inside the timeout, not the effect body: during the
    // debounce we are waiting, not building, and a synchronous setState here
    // would cascade a render on every keystroke.
    const t = setTimeout(async () => {
      setBuilding(true);
      try {
        const blob = await buildResume(data);
        const [page1] = await renderPages(blob, { scale: 1.6, limit: 1 });
        if (dead) {
          if (page1) URL.revokeObjectURL(page1.url);
          return;
        }
        live.current.forEach(URL.revokeObjectURL);
        const doc = URL.createObjectURL(blob);
        live.current = page1 ? [doc, page1.url] : [doc];
        setPdfUrl(doc);
        setPreview(page1?.url ?? null);
        setError(null);
      } catch (e) {
        if (!dead) setError(e instanceof Error ? e.message : "Could not build the PDF.");
      } finally {
        if (!dead) setBuilding(false);
      }
    }, 500);

    return () => {
      dead = true;
      clearTimeout(t);
    };
  }, [data]);

  useEffect(() => () => live.current.forEach(URL.revokeObjectURL), []);

  const edit = (patch: Partial<Resume>) => setData((d) => ({ ...d, ...patch }));

  return { data, edit, setData, preview, pdfUrl, building, error };
}
