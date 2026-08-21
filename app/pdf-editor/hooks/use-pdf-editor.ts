"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { applyEdits } from "../engine/apply-edits";
import { loadDocument, type Bookmark, type LoadedPage } from "../engine/load-document";
import { exportRisk } from "../engine/risk";
import type { TextBlock } from "../types";
import { withFamily, withFormat, withGeometry, withText } from "./edit-ops";
import { useAnnotations } from "./use-annotations";
import { useHistory } from "./use-history";
import { useOverlays } from "./use-overlays";
import { usePageOps } from "./use-page-ops";
import { usePersistence, type Session } from "./use-persistence";

export function usePdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [docName, setDocName] = useState<string | null>(null);
  const [pages, setPages] = useState<LoadedPage[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const url = useRef<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  const stale = useCallback(() => setOutUrl(null), []);
  const history = useHistory<TextBlock[]>([]);
  const overlays = useOverlays(stale);
  const anno = useAnnotations(stale);
  const pageOps = usePageOps(stale);
  const blocks = history.value;

  /** Parses a file and installs it. `keep` restores saved edits instead of clearing. */
  const install = useCallback(async (pdf: File, keep?: Partial<Session>) => {
    setError(null);
    setBusy(true);
    setProgress({ done: 0, total: 0 });
    stale();
    try {
      const loaded = await loadDocument(pdf, (done, total) => setProgress({ done, total }));
      setFile(pdf);
      setDocName(keep?.docName ?? pdf.name);
      setPages(loaded.pages);
      setBookmarks(loaded.bookmarks);
      history.reset(keep?.blocks ?? loaded.blocks);
      setPage(0);
      setSelected(null);
      overlays.resetOverlays(keep?.watermark);
      anno.resetAnnotations(keep?.annotations ?? loaded.images);
      pageOps.resetOps(keep?.pageOps);
    } catch {
      setError("Could not open this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }, [history, overlays, anno, pageOps, stale]);

  const open = useCallback(async (picked: File[]) => {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    await install(pdf);
  }, [install]);

  const editBlock = useCallback((id: string, text: string) => {
    stale();
    history.commit((v) => withText(v, id, text));
  }, [history, stale]);

  const setFamily = useCallback((id: string, f: TextBlock["matchedFamily"]) => {
    stale();
    history.commit((v) => withFamily(v, id, f));
  }, [history, stale]);

  const updateGeometry = useCallback(
    (id: string, patch: Partial<Pick<TextBlock, "relX" | "relY" | "relWidth" | "relHeight" | "pdfWidth" | "pdfHeight">>) => {
      stale();
      history.commit((v) => withGeometry(v, id, patch));
    },
    [history, stale]
  );

  const updateFormat = useCallback(
    (id: string, patch: Partial<Pick<TextBlock, "fontWeight" | "fontSize" | "color" | "align" | "matchedFamily">>) => {
      stale();
      history.commit((v) => withFormat(v, id, patch));
    },
    [history, stale]
  );

  const exportPdf = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await applyEdits(file, blocks, {
        watermark: overlays.watermark,
        signatures: overlays.signatures,
        annotations: anno.items,
        pageOps: pageOps.ops,
      });
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(blob);
      setOutUrl(url.current);
    } catch {
      setError("Could not export this PDF.");
    } finally {
      setBusy(false);
    }
  }, [file, blocks, overlays.watermark, overlays.signatures, anno.items, pageOps.ops]);

  const session: Session | null = file
    ? { file, docName: docName ?? file.name, blocks, annotations: anno.items, watermark: overlays.watermark, pageOps: pageOps.ops }
    : null;
  const persist = usePersistence(session);

  // Reopen the saved document automatically on mount. `take` yields it once,
  // so this cannot loop, and it never fires while a file is already open.
  useEffect(() => {
    if (file || busy || !persist.pending) return;
    const saved = persist.take();
    if (saved?.file) void install(saved.file, saved);
  }, [file, busy, persist, install]);

  /**
   * One selection at a time. Text blocks and annotations were independent
   * state, so both could be set at once and the inspector — which checks the
   * annotation first — would keep showing a shape while a text block was
   * visibly highlighted.
   */
  const selectBlock = useCallback((id: string | null) => {
    setSelected(id);
    if (id) anno.setPicked(null);
  }, [anno]);

  const selectAnnotation = useCallback((id: string | null) => {
    anno.setPicked(id);
    if (id) setSelected(null);
  }, [anno]);

  const addTextBlock = useCallback((targetPage?: number) => {
    const p = targetPage ?? page;
    const curPage = pages[p];
    const ph = curPage?.height ?? 792;
    const newBlock: TextBlock = {
      id: `text-${Date.now()}`,
      pageIndex: p,
      text: "Type your text here",
      originalText: "",
      pdfX: 72,
      pdfY: ph - 120,
      pdfWidth: 180,
      pdfHeight: 20,
      relX: 0.15,
      relY: 0.15,
      relWidth: 0.35,
      relHeight: 0.04,
      fontSize: 16,
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontStyle: "normal",
      color: "#111827",
      align: "left",
      lineHeight: 1.2,
      letterSpacing: 0,
      isEdited: true,
      isNew: true,
      isDeleted: false,
    };
    history.commit((cur) => [...cur, newBlock]);
    setSelected(newBlock.id);
    anno.setPicked(null);
  }, [page, pages, history, anno]);

  const startNew = useCallback(async () => {
    await persist.startNew();
    setFile(null);
    setDocName(null);
    setPages([]);
    setBookmarks([]);
    history.reset([]);
    overlays.resetOverlays();
    anno.resetAnnotations();
    pageOps.resetOps();
    setSelected(null);
    setPage(0);
    stale();
  }, [persist, history, overlays, anno, pageOps, stale]);

  return {
    file, docName, renameDoc: setDocName, pages, bookmarks, blocks, page, setPage, selected, setSelected: selectBlock, selectAnnotation,
    busy, progress, error, outUrl,
    restoredAt: persist.restoredAt, dismissNotice: persist.dismissNotice, startNew,
    edited: blocks.filter((b) => b.isEdited).length,
    risk: exportRisk(blocks),
    ...overlays,
    anno, pageOps,
    undo: history.undo, redo: history.redo, canUndo: history.canUndo, canRedo: history.canRedo,
    open, editBlock, setFamily, updateGeometry, updateFormat, exportPdf, addTextBlock,
  };
}
