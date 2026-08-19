"use client";

import { useEffect, useRef, useState } from "react";
import { extractPdfLines } from "../lib/extract-pdf-lines";

/** Extracts a PDF's selectable text and packages it as a downloadable .txt — entirely on-device. */
export function usePdfToText() {
  const [name, setName] = useState<string | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  async function pick(files: File[]) {
    const file = files[0];
    if (!file) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setUrl(null);
    setError(null);
    setLines([]);
    setBusy(true);
    setName(file.name);
    try {
      const out = await extractPdfLines(file);
      if (out.length === 0) throw new Error("No selectable text was found in that PDF — it may be a scan.");
      setLines(out);
      const blob = new Blob([out.join("\n")], { type: "text/plain" });
      const next = URL.createObjectURL(blob);
      urlRef.current = next;
      setUrl(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that PDF.");
    } finally {
      setBusy(false);
    }
  }

  return { name, lines, busy, url, error, pick };
}
