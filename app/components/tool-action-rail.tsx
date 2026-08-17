"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The sticky right-column action card every board-based tool now leads with:
 * a preview of the first page, the item count, and the primary action button
 * (download/run) — passed in as `action` so it's reachable the instant the
 * user has something to act on, not after scrolling past 50 page tiles.
 */
export function ToolActionRail({
  thumbUrl,
  ratio,
  count,
  itemLabel,
  addInputId,
  action,
}: {
  thumbUrl?: string;
  ratio?: number;
  count: number;
  itemLabel: string;
  /** id of the Dropzone's hidden file input this "Add" button should open. */
  addInputId?: string;
  action: ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">Preview</p>
        {addInputId && (
          <label
            htmlFor={addInputId}
            className="flex cursor-pointer items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
          >
            <Plus className="size-3" />
            Add
          </label>
        )}
      </div>

      <div
        className="overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1px_var(--border)]"
        style={{ aspectRatio: ratio ?? 0.707 }}
      >
        {thumbUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbUrl} alt="First page of the result" className="block h-full w-full object-contain" />
        ) : (
          <div className="grid h-full place-items-center text-[12px] text-[var(--text-dim)]">No pages yet</div>
        )}
      </div>

      <p className="mt-3 mb-1 text-center text-[12.5px] text-[var(--text-dim)]">
        {count} {itemLabel}
      </p>

      {action}
    </div>
  );
}
