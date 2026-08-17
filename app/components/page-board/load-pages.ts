import { countPages } from "../../lib/split-pdf";
import { renderPages } from "../../lib/pdf-to-image";
import type { Slot, Thumb } from "./types";

export const isPdf = (f: File) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);

/**
 * Counts a file's pages, hands the slots back immediately, then streams
 * thumbnails in as they rasterize. Counting first is what lets the grid appear
 * with placeholders instead of after every page has been drawn.
 */
export async function loadFile(
  file: File,
  src: number,
  onSlots: (slots: Slot[]) => void,
  onThumb: (page: number, thumb: Thumb) => void,
): Promise<void> {
  const count = await countPages(file);
  onSlots(
    Array.from({ length: count }, (_, page) => ({
      id: crypto.randomUUID(),
      src,
      page,
      rotate: 0,
    })),
  );
  await renderPages(file, {
    format: "jpeg",
    scale: 0.7,
    quality: 0.75,
    onPage: (r) => onThumb(r.page - 1, { url: r.url, w: r.width, h: r.height }),
  });
}
