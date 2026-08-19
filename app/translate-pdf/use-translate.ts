"use client";

import { useState } from "react";
import { aiConfigured } from "../lib/ai-config";
import { translatePdf } from "../lib/translate-pdf";
import { renderPages, type Rendered } from "../lib/pdf-to-image";

export function useTranslate() {
  const [name, setName] = useState<string | null>(null);
  const [lang, setLang] = useState("Spanish");
  const [lines, setLines] = useState(0);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    if (!aiConfigured) return setError("This tool needs a translation backend configured — not set up yet.");
    setError(null);
    setUrl(null);
    setPages([]);
    setName(pdf.name);
    setBusy(true);
    try {
      const out = await translatePdf(pdf, lang);
      setUrl(URL.createObjectURL(out.blob));
      setLines(out.lines);
      setPages(await renderPages(out.blob, { scale: 1.4, format: "jpeg", quality: 0.85 }));
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be translated.");
    } finally {
      setBusy(false);
    }
  }

  return { name, lang, setLang, lines, pages, url, busy, error, pick };
}
