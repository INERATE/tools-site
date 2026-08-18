"use client";

import { useState } from "react";
import { countPages } from "../lib/split-pdf";
import type { Box } from "../lib/redact-page";
import { redactPdf } from "../lib/redact-pdf";
import { renderPages } from "../lib/pdf-to-image";

export function useRedact() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pagePreview, setPagePreview] = useState<{ url: string; ratio: number } | null>(null);
  const [boxesByPage, setBoxesByPage] = useState<Record<number, Box[]>>({});
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
    setBoxesByPage({});
    setFile(pdf);
    setPageIndex(0);
    setPageCount(await countPages(pdf));
    await showPage(pdf, 0);
  }

  async function goToPage(n: number) {
    if (!file || n < 0 || n >= pageCount) return;
    setPageIndex(n);
    await showPage(file, n);
  }

  function addBox(box: Box) {
    setUrl(null);
    setBoxesByPage((v) => ({ ...v, [pageIndex]: [...(v[pageIndex] ?? []), box] }));
  }

  function clearPage() {
    setUrl(null);
    setBoxesByPage((v) => ({ ...v, [pageIndex]: [] }));
  }

  const totalBoxes = Object.values(boxesByPage).reduce((n, list) => n + list.length, 0);

  async function run() {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await redactPdf(file, boxesByPage);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not redact this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    pageCount,
    pageIndex,
    pagePreview,
    boxes: boxesByPage[pageIndex] ?? [],
    totalBoxes,
    busy,
    url,
    error,
    pick,
    goToPage,
    addBox,
    clearPage,
    run,
  };
}
