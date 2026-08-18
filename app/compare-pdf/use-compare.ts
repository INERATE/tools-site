"use client";

import { useMemo, useState } from "react";
import { diffLines } from "../lib/diff-lines";
import { extractPdfLines } from "../lib/extract-pdf-lines";

export function useCompare() {
  const [nameA, setNameA] = useState<string | null>(null);
  const [nameB, setNameB] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linesA, setLinesA] = useState<string[] | null>(null);
  const [linesB, setLinesB] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);

  // Derived, not stored: both sides are known the instant the second file
  // finishes extracting, so there's nothing to "run" — just compute it.
  const diff = useMemo(() => (linesA && linesB ? diffLines(linesA, linesB) : null), [linesA, linesB]);
  const reportUrl = useMemo(() => {
    if (!diff) return null;
    const mark = { same: " ", add: "+", remove: "-" } as const;
    const text = diff.map((d) => `${mark[d.kind]} ${d.text}`).join("\n");
    return URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  }, [diff]);

  async function pickA(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setNameA(pdf.name);
    setBusy(true);
    setLinesA(await extractPdfLines(pdf));
    setBusy(false);
  }

  async function pickB(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setNameB(pdf.name);
    setBusy(true);
    setLinesB(await extractPdfLines(pdf));
    setBusy(false);
  }

  const added = diff?.filter((d) => d.kind === "add").length ?? 0;
  const removed = diff?.filter((d) => d.kind === "remove").length ?? 0;

  return { nameA, nameB, diff, added, removed, reportUrl, busy, error, pickA, pickB };
}
