"use client";

import { useCallback, useRef, useState } from "react";
import { applyEdits } from "../engine/apply-edits";
import { loadDocument, type LoadedPage } from "../engine/load-document";
import { measureWidth } from "../engine/measure-text";
import { exportRisk } from "../engine/risk";
import type { TextBlock } from "../types";

export function usePdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<LoadedPage[]>([]);
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = useRef<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  const open = useCallback(async (picked: File[]) => {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setBusy(true);
    setOutUrl(null);
    try {
      const loaded = await loadDocument(pdf);
      setFile(pdf);
      setPages(loaded.pages);
      setBlocks(loaded.blocks);
      setPage(0);
      setSelected(null);
    } catch {
      setError("Could not open this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }, []);

  const editBlock = useCallback((id: string, text: string) => {
    setOutUrl(null);
    setBlocks((v) =>
      v.map((b) => {
        if (b.id !== id) return b;
        const bold = b.fontWeight === "bold" || b.fontWeight === "700";
        const isOverflowing = measureWidth(text, b.fontSize, b.matchedFamily ?? "sans", bold) > b.pdfWidth * 1.02;
        return { ...b, text, isEdited: text !== b.originalText, isOverflowing };
      }),
    );
  }, []);

  // A manual override always counts as certain — 100, not the auto-detected score.
  const setFamily = useCallback((id: string, matchedFamily: TextBlock["matchedFamily"]) => {
    setOutUrl(null);
    setBlocks((v) => v.map((b) => (b.id === id ? { ...b, matchedFamily, fontMatchConfidence: 100 } : b)));
  }, []);

  const exportPdf = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await applyEdits(file, blocks);
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(blob);
      setOutUrl(url.current);
    } catch {
      setError("Could not export this PDF.");
    } finally {
      setBusy(false);
    }
  }, [file, blocks]);

  const edited = blocks.filter((b) => b.isEdited).length;
  const risk = exportRisk(blocks);
  const scannedPages = pages.filter((p) => p.scanned).length;

  return {
    file, pages, blocks, page, setPage, selected, setSelected,
    busy, error, outUrl, edited, risk, scannedPages,
    open, editBlock, setFamily, exportPdf,
  };
}
