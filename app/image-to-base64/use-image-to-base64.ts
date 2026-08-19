"use client";

import { useEffect, useRef, useState } from "react";

export function useImageToBase64() {
  const [name, setName] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [txtUrl, setTxtUrl] = useState<string | null>(null);
  const [size, setSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const txtUrlRef = useRef<string | null>(null);

  useEffect(() => () => {
    if (txtUrlRef.current) URL.revokeObjectURL(txtUrlRef.current);
  }, []);

  async function pick(files: File[]) {
    const file = files.find((f) => f.type.startsWith("image/"));
    if (!file) return setError(files.length ? "That file isn't an image." : null);
    setError(null);
    setName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setDataUrl(url);
      setSize(url.length);
      if (txtUrlRef.current) URL.revokeObjectURL(txtUrlRef.current);
      const next = URL.createObjectURL(new Blob([url], { type: "text/plain" }));
      txtUrlRef.current = next;
      setTxtUrl(next);
    };
    reader.onerror = () => setError("Could not read that image.");
    reader.readAsDataURL(file);
  }

  return { name, dataUrl, txtUrl, size, error, pick };
}
