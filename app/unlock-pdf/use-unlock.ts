"use client";

import { useState } from "react";
import { unlockPdf } from "../lib/pdf-security";

export function useUnlock() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
  }

  async function run() {
    if (!file || !password) return;
    setError(null);
    setBusy(true);
    try {
      const blob = await unlockPdf(file, password);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "That PDF could not be unlocked.");
    } finally {
      setBusy(false);
    }
  }

  return { name: file?.name ?? null, password, setPassword, url, busy, error, pick, run, canRun: !!file && !!password };
}
