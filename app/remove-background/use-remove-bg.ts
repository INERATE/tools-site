"use client";

import { useState } from "react";
import { removeImageBackground } from "../lib/remove-background";

export function useRemoveBg() {
  const [name, setName] = useState<string | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const img = picked.find((f) => f.type === "image/jpeg" || f.type === "image/png");
    if (!img) return setError(picked.length ? "That file was not a JPG or PNG image." : null);
    setError(null);
    setUrl(null);
    setName(img.name);
    setSrcUrl(URL.createObjectURL(img));
    setBusy(true);
    setProgress(0);
    try {
      const blob = await removeImageBackground(img, setProgress);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not remove the background — try a different photo.");
    } finally {
      setBusy(false);
    }
  }

  return { name, srcUrl, url, busy, progress, error, pick };
}
