import Link from "next/link";
import type { TOOLS } from "./tool-list";

/** The live-filtered result list inside the search overlay — split out to keep that file under the size cap. */
export function SearchResults({
  matches,
  active,
  setActive,
  query,
  onPick,
}: {
  matches: (typeof TOOLS)[number][];
  active: number;
  setActive: (i: number) => void;
  query: string;
  onPick: () => void;
}) {
  return (
    <ul data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
      {matches.length === 0 && (
        <li className="px-3 py-6 text-center text-[13px] text-[var(--text-dim)]">No tools match “{query}”.</li>
      )}
      {matches.map((t, i) => (
        <li key={t.href}>
          <Link
            href={t.href}
            onClick={onPick}
            onMouseEnter={() => setActive(i)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
              i === active ? "bg-[var(--accent)]/12" : ""
            }`}
          >
            <t.icon active={i === active} size={18} />
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-[var(--text)]">{t.title}</p>
              <p className="truncate text-[12px] text-[var(--text-dim)]">{t.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
