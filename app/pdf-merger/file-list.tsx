import { ArrowDown, ArrowUp, X } from "lucide-react";

export function FileList({
  files,
  onMove,
  onRemove,
}: {
  files: File[];
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
}) {
  if (files.length === 0) return null;
  return (
    <ul className="mb-6 flex flex-col gap-2">
      {files.map((file, i) => (
        <li
          key={`${file.name}-${i}`}
          className="glass flex items-center gap-2 rounded-lg px-4 py-3"
        >
          <span className="flex-1 truncate text-sm">{file.name}</span>
          <button onClick={() => onMove(i, -1)} className="text-[var(--text-dim)] hover:text-[var(--text)]" aria-label="Move up">
            <ArrowUp className="size-4" />
          </button>
          <button onClick={() => onMove(i, 1)} className="text-[var(--text-dim)] hover:text-[var(--text)]" aria-label="Move down">
            <ArrowDown className="size-4" />
          </button>
          <button onClick={() => onRemove(i)} className="text-[var(--text-dim)] hover:text-[var(--text)]" aria-label="Remove">
            <X className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
