"use client";

import { useMemo, useState } from "react";
import { imageToText } from "../lib/image-to-text";

export function useImageToText() {
  const [name, setName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const img = picked.find((f) => f.type.startsWith("image/"));
    if (!img) return setError(picked.length ? "That file was not an image." : null);
    setError(null);
    setText("");
    setName(img.name);
    setPreviewUrl(URL.createObjectURL(img));
    setBusy(true);
    setProgress(0);
    try {
      const out = await imageToText(img, setProgress);
      setText(out.text);
      setConfidence(out.confidence);
    } catch (e) {
      setError(e instanceof Error ? e.message : "That image could not be read.");
    } finally {
      setBusy(false);
    }
  }

  const url = useMemo(() => (text ? URL.createObjectURL(new Blob([text], { type: "text/plain" })) : null), [text]);

  return { name, previewUrl, text, confidence, progress, busy, error, pick, url };
}
