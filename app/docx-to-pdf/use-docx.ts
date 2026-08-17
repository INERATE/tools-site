"use client";

import { useEffect, useRef, useState } from "react";
import { docxToPdf } from "../lib/docx-to-pdf";
import { renderPages, type Rendered } from "../lib/pdf-to-image";

const isDocx = (f: File) =>
  /\.docx$/i.test(f.name) ||
  f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Converts on pick, and previews every page of the result. */
export function useDocx() {
  const [name, setName] = useState<string | null>(null);
  const [blocks, setBlocks] = useState(0);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  async function pick(picked: File[]) {
    const docx = picked.find(isDocx);
    if (!docx) return setError("Pick a .docx file — the older .doc format is not readable here.");
    urls.current.forEach(URL.revokeObjectURL);
    urls.current = [];
    setPages([]);
    setUrl(null);
    setError(null);
    setName(docx.name);
    setBusy(true);
    try {
      const out = await docxToPdf(docx);
      const doc = URL.createObjectURL(out.blob);
      urls.current.push(doc);
      setUrl(doc);
      setBlocks(out.blocks);
      // Preview the real output rather than a guess at it.
      const shots = await renderPages(out.blob, { scale: 1.4, format: "jpeg", quality: 0.85 });
      shots.forEach((s) => urls.current.push(s.url));
      setPages(shots);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That document could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, blocks, pages, url, busy, error, pick };
}
