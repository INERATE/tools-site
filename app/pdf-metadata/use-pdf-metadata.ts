"use client";

import { useState } from "react";
import { readPdfMeta, writePdfMeta, type PdfMeta } from "../lib/pdf-metadata";

const EMPTY: PdfMeta = { title: "", author: "", subject: "", keywords: "" };

export function usePdfMetadata() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<PdfMeta>(EMPTY);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
    setBusy(true);
    try {
      setMeta(await readPdfMeta(pdf));
    } catch (e) {
      setFile(null);
      setError(e instanceof Error ? e.message : "That PDF could not be read.");
    } finally {
      setBusy(false);
    }
  }

  function update<K extends keyof PdfMeta>(key: K, value: PdfMeta[K]) {
    setMeta((m) => ({ ...m, [key]: value }));
    setUrl(null);
  }

  async function run() {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const blob = await writePdfMeta(file, meta);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "That PDF could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  return { name: file?.name ?? null, meta, update, url, busy, error, pick, run };
}
