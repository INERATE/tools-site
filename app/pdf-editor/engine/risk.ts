import type { TextBlock } from "../types";

export interface ExportRisk {
  overflow: number;
  seam: number;
  math: number;
  total: number;
}

/** Summarizes what might go visibly wrong in the edited blocks — shown once before export, not hidden. */
export function exportRisk(blocks: TextBlock[]): ExportRisk {
  const edited = blocks.filter((b) => b.isEdited && !b.isDeleted);
  const overflow = edited.filter((b) => b.isOverflowing).length;
  const seam = edited.filter((b) => b.bgFlat === false).length;
  const math = edited.filter((b) => b.isMath).length;
  return { overflow, seam, math, total: overflow + seam + math };
}
