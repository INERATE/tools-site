"use client";

import { useState } from "react";
import { countPages } from "../lib/split-pdf";
import { embedSignature } from "../lib/sign-pdf";
import { renderPages } from "../lib/pdf-to-image";

const DEFAULT_POS = { xFrac: 0.6, yFrac: 0.82, widthFrac: 0.28 };

export function useSign() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pagePreview, setPagePreview] = useState<{ url: string; ratio: number } | null>(null);
  const [sig, setSig] = useState<{ url: string; w: number; h: number } | null>(null);
  const [pos, setPos] = useState(DEFAULT_POS);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function showPage(pdf: File, n: number) {
    const [rendered] = await renderPages(pdf, { format: "jpeg", scale: 1.5, quality: 0.85, only: [n + 1] });
    if (rendered) setPagePreview({ url: rendered.url, ratio: rendered.width / rendered.height });
  }

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
    setPageIndex(0);
    setPageCount(await countPages(pdf));
    await showPage(pdf, 0);
  }

  async function goToPage(n: number) {
    if (!file || n < 0 || n >= pageCount) return;
    setUrl(null);
    setPageIndex(n);
    await showPage(file, n);
  }

  async function run() {
    if (!file || !sig) return;
    setBusy(true);
    try {
      const blob = await embedSignature(file, {
        pageIndex,
        signaturePng: sig.url,
        xFrac: pos.xFrac,
        yFrac: pos.yFrac,
        widthFrac: pos.widthFrac,
        sigRatio: sig.h / sig.w,
      });
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not sign this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    pageCount,
    pageIndex,
    pagePreview,
    sig,
    setSig,
    pos,
    move: (xFrac: number, yFrac: number) => setPos((p) => ({ ...p, xFrac, yFrac })),
    resize: (widthFrac: number) =>
      setPos((p) => ({ ...p, widthFrac: Math.max(0.06, Math.min(0.9, widthFrac)) })),
    busy,
    url,
    error,
    pick,
    goToPage,
    run,
  };
}
