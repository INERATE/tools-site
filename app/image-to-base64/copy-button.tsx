"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-full border border-[var(--border)] px-3 py-1 text-[12.5px] font-semibold text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
    >
      {copied ? "Copied!" : "Copy Base64"}
    </button>
  );
}
