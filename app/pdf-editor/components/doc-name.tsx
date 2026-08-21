"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

/**
 * The document name, editable in place. It carried a dropdown chevron while
 * doing nothing at all, which read as a broken menu — and the name matters,
 * because the exported file is named from it.
 */
export function DocName({
  name, onRename, disabled,
}: {
  name: string;
  onRename?: (next: string) => void;
  disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(name), [name]);
  useEffect(() => {
    if (editing) ref.current?.select();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const next = draft.trim();
    if (next && next !== name) onRename?.(next.endsWith(".pdf") ? next : `${next}.pdf`);
    else setDraft(name);
  };

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        aria-label="Document name"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(name);
            setEditing(false);
          }
        }}
        className="w-[210px] rounded-lg border border-indigo-400 bg-white px-2.5 py-1 text-[13px] font-medium text-slate-800 outline-none"
      />
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={() => setEditing(true)}
      title={disabled ? undefined : "Rename — the exported file uses this name"}
      className="group flex min-w-0 items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/60 px-2.5 py-1 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100/80 disabled:cursor-default disabled:opacity-70 disabled:hover:bg-slate-50/60"
    >
      <span className="max-w-[200px] truncate">{name}</span>
      {!disabled && <Pencil className="size-3 shrink-0 text-slate-400 group-hover:text-slate-600" />}
    </button>
  );
}
