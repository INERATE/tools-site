"use client";

import { ExternalLink } from "lucide-react";
import { PROVIDERS, type ProviderId } from "../../lib/ai-providers";

const FIELD =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] text-slate-700 outline-none focus:border-indigo-500";

export function AiSettings({
  provider, keys, onProvider, onKey,
}: {
  provider: ProviderId;
  keys: Partial<Record<Exclude<ProviderId, "free">, string>>;
  onProvider: (p: ProviderId) => void;
  onKey: (p: Exclude<ProviderId, "free">, v: string) => void;
}) {
  const current = PROVIDERS.find((p) => p.id === provider)!;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-semibold text-slate-700">Model</label>
      <select className={FIELD} value={provider} onChange={(e) => onProvider(e.target.value as ProviderId)}>
        {PROVIDERS.map((p) => (
          <option key={p.id} value={p.id}>{p.label}</option>
        ))}
      </select>

      {provider !== "free" && (
        <>
          <input
            type="password"
            aria-label={`${current.label} API key`}
            className={`${FIELD} font-mono`}
            placeholder="Paste your API key"
            value={keys[provider] ?? ""}
            onChange={(e) => onKey(provider, e.target.value)}
          />
          {current.keyUrl && (
            <a
              href={current.keyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:underline"
            >
              Get a free key <ExternalLink aria-hidden className="size-3" />
            </a>
          )}
        </>
      )}

      <p
        className={`rounded-lg px-2.5 py-2 text-[11px] leading-relaxed ${
          provider === "free" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
        }`}
      >
        {provider === "free"
          ? "Heads up: this is the one feature that leaves your device. The document's text is sent to our server to be summarised. Everything else on this site stays local."
          : `Your key is kept in this browser only. The request goes straight from here to ${current.label} — it never passes through our server.`}
      </p>
    </div>
  );
}
