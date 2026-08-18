import { isPdf, loadFile } from "./load-pages";
import { thumbKey } from "./types";
import type { useBoardState } from "./use-board-state";

/** Loads picked files into the board's raw state — pulled out of the hook to keep it under the file-size cap. */
export async function addFilesToBoard(picked: File[], single: boolean, s: ReturnType<typeof useBoardState>) {
  const pdfs = picked.filter(isPdf);
  if (pdfs.length === 0) return s.setError(picked.length ? "Those files were not PDFs." : null);
  if (single) s.wipe();
  else s.setError(null);

  for (const file of single ? pdfs.slice(0, 1) : pdfs) {
    const src = s.takeSrc();
    s.setFiles((prev) => Object.assign([...prev], { [src]: file }));
    try {
      await loadFile(
        file,
        src,
        (fresh) => {
          s.addPristine(fresh);
          s.setSlots((prev) => [...prev, ...fresh]);
          s.setPending((n) => n + fresh.length);
        },
        (page, thumb) => {
          s.keepUrl(thumb.url);
          s.setThumbs((t) => ({ ...t, [thumbKey(src, page)]: thumb }));
          s.setPending((n) => Math.max(0, n - 1));
        },
      );
    } catch {
      s.setError(`${file.name} could not be opened — it may be encrypted or damaged.`);
      s.setPending(0);
    }
  }
}
