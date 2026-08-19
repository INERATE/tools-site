"use client";

import { useState } from "react";
import { aiConfigured } from "../lib/ai-config";
import { summarizePdf } from "../lib/summarize-pdf";

export function useSummarize() {
  const [name, setName] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    if (!aiConfigured) return setError("This tool needs a summarization backend configured — not set up yet.");
    setError(null);
    setSummary(null);
    setUrl(null);
    setName(pdf.name);
    setBusy(true);
    try {
      const text = await summarizePdf(pdf);
      setSummary(text);
      setUrl(URL.createObjectURL(new Blob([text], { type: "text/plain" })));
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be summarized.");
    } finally {
      setBusy(false);
    }
  }

  return { name, summary, url, busy, error, pick };
}
