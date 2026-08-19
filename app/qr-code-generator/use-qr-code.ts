"use client";

import { useEffect, useState } from "react";
import { QR_DEFAULTS, textToQr, textToQrSvg, type QrOptions } from "../lib/qr-code";

export function useQrCode() {
  const [text, setText] = useState("");
  const [opts, setOpts] = useState<QrOptions>(QR_DEFAULTS);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = text.trim();

  useEffect(() => {
    if (!trimmed) return;
    let cancelled = false;
    // setBusy lives inside the timeout, not the effect body: during the
    // debounce we are waiting, not generating, and a synchronous setState
    // here would cascade a render on every keystroke.
    const timer = setTimeout(async () => {
      setBusy(true);
      setError(null);
      try {
        const [png, svg] = await Promise.all([textToQr(text, opts), textToQrSvg(text, opts)]);
        if (cancelled) return;
        setPngUrl(png);
        setSvgUrl(URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "That text is too long for a QR code.");
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 220); // debounced — regenerating on every keystroke would thrash the encoder
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, trimmed, opts]);

  // Cleared synchronously in render, not an effect — no cascading setState for the empty case.
  const active = Boolean(trimmed);
  return {
    text,
    setText,
    opts,
    setOpts,
    pngUrl: active ? pngUrl : null,
    svgUrl: active ? svgUrl : null,
    busy: active && busy,
    error: active ? error : null,
  };
}
