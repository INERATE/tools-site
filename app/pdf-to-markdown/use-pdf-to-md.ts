"use client";

import { useState } from "react";
import { pdfToMarkdown } from "../lib/pdf-to-markdown";

export function usePdfToMarkdown() {
  const [name, setName] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setName(pdf.name);
    setBusy(true);
    try {
      const md = await pdfToMarkdown(pdf);
      setMarkdown(md);
      setUrl(URL.createObjectURL(new Blob([md], { type: "text/markdown" })));
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, markdown, url, busy, error, pick };
}
