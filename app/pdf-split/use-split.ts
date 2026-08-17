"use client";

import { useState } from "react";
import { parseRanges } from "../lib/page-range";
import { countPages, extractPages } from "../lib/split-pdf";

/** All the splitter's state and the two async actions it can take. */
export function useSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function pick(files: File[]) {
    const pdf = files.find((f) => f.type === "application/pdf");
    if (!pdf) return;
    setUrl(null);
    setError(null);
    setFile(pdf);
    try {
      const n = await countPages(pdf);
      setPages(n);
      setRange(`1-${n}`);
    } catch {
      setFile(null);
      setError("That file could not be read as a PDF.");
    }
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      // parseRanges validates the input and throws a readable message.
      const blob = await extractPages(file, parseRanges(range, pages));
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not split that PDF.");
    } finally {
      setBusy(false);
    }
  }

  function editRange(v: string) {
    setRange(v);
    setUrl(null);
    setError(null);
  }

  return { file, pages, range, busy, error, url, pick, run, editRange };
}
