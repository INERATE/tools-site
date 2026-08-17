"use client";

import { useEffect, useRef, useState } from "react";
import { cleanPdf, countMarks } from "../lib/clean-pdf";
import { countPages } from "../lib/split-pdf";
import { usePageView } from "./use-page-view";
import type { Box } from "../lib/cover-box";

export function useClean() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [marks, setMarks] = useState(0);
  const [index, setIndex] = useState(0);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [everyPage, setEveryPage] = useState(true);
  const [dark, setDark] = useState(false);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const out = useRef<string | null>(null);
  const shot = usePageView(file, index);

  useEffect(
    () => () => {
      if (out.current) URL.revokeObjectURL(out.current);
    },
    [],
  );

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name));
    if (!pdf) return setError("That was not a PDF.");
    shot.drop();
    setBoxes([]);
    setIndex(0);
    setUrl(null);
    setError(null);
    setFile(pdf);
    try {
      setPages(await countPages(pdf));
      setMarks(await countMarks(pdf));
    } catch {
      setFile(null);
      setError("That PDF could not be opened — it may be encrypted or damaged.");
    }
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    try {
      const scope = everyPage ? Array.from({ length: pages }, (_, i) => i) : [index];
      const done = await cleanPdf(file, { pages: scope, boxes, dark });
      if (out.current) URL.revokeObjectURL(out.current);
      out.current = URL.createObjectURL(done.blob);
      setUrl(out.current);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not write the cleaned PDF.");
    } finally {
      setBusy(false);
    }
  }

  /** Any change makes an already-written file stale, so it is withdrawn. */
  const change =
    <A extends unknown[]>(fn: (...a: A) => void) =>
    (...a: A) => {
      setUrl(null);
      fn(...a);
    };

  return {
    file, pages, marks, index, boxes, everyPage, dark, busy, run, pick, url,
    view: shot.view,
    error: error ?? (shot.failed ? "That page could not be drawn." : null),
    setIndex: change(setIndex),
    setEveryPage: change(setEveryPage),
    setDark: change(setDark),
    addBox: change((b: Omit<Box, "id">) => setBoxes((v) => [...v, { ...b, id: crypto.randomUUID() }])),
    removeBox: change((id: string) => setBoxes((v) => v.filter((b) => b.id !== id))),
    clearBoxes: change(() => setBoxes([])),
  };
}
