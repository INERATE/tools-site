"use client";

const LANGS = ["Spanish", "French", "German", "Hindi", "Japanese", "Portuguese"];

export function LangSelect({ lang, onLang }: { lang: string; onLang: (l: string) => void }) {
  return (
    <label className="mb-4 flex items-center gap-2 text-[12.5px] text-[var(--text-dim)]">
      Translate to
      <select
        value={lang}
        onChange={(e) => onLang(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-transparent px-2 py-1 text-[var(--text)] outline-none focus:border-[var(--accent)]"
      >
        {LANGS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
