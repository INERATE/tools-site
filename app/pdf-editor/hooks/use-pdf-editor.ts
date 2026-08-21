"use client";

import { useCallback, useRef, useState } from "react";
import { applyEdits } from "../engine/apply-edits";
import { loadDocument, type LoadedPage } from "../engine/load-document";
import { exportRisk } from "../engine/risk";
import type { TextBlock } from "../types";
import { withFamily, withText } from "./edit-ops";
import { useHistory } from "./use-history";
import { useOverlays } from "./use-overlays";

export function usePdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<LoadedPage[]>([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = useRef<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  const stale = useCallback(() => setOutUrl(null), []);
  const history = useHistory<TextBlock[]>([]);
  const overlays = useOverlays(stale);
  const blocks = history.value;

  const open = useCallback(async (picked: File[]) => {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setBusy(true);
    stale();
    try {
      const loaded = await loadDocument(pdf);
      setFile(pdf);
      setPages(loaded.pages);
      history.reset(loaded.blocks);
      setPage(0);
      setSelected(null);
      overlays.resetOverlays();
    } catch {
      setError("Could not open this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }, [history, overlays, stale]);

  const editBlock = useCallback((id: string, text: string) => {
    stale();
    history.commit((v) => withText(v, id, text));
  }, [history, stale]);

  const setFamily = useCallback((id: string, f: TextBlock["matchedFamily"]) => {
    stale();
    history.commit((v) => withFamily(v, id, f));
  }, [history, stale]);

  const exportPdf = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await applyEdits(file, blocks, {
        watermark: overlays.watermark,
        signatures: overlays.signatures,
      });
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(blob);
      setOutUrl(url.current);
    } catch {
      setError("Could not export this PDF.");
    } finally {
      setBusy(false);
    }
  }, [file, blocks, overlays.watermark, overlays.signatures]);

  return {
    file, pages, blocks, page, setPage, selected, setSelected,
    busy, error, outUrl,
    edited: blocks.filter((b) => b.isEdited).length,
    risk: exportRisk(blocks),
    ...overlays,
    undo: history.undo, redo: history.redo, canUndo: history.canUndo, canRedo: history.canRedo,
    open, editBlock, setFamily, exportPdf,
  };
}
