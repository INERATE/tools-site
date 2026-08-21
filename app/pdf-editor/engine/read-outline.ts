import type { PDFDocumentProxy } from "pdfjs-dist";
import type { Bookmark } from "./load-document";

interface RawItem {
  title: string;
  dest: string | unknown[] | null;
  items: RawItem[];
}

/**
 * Flattens the PDF's own outline into a list, resolving each entry to a page
 * index. Entries whose destination cannot be resolved are dropped rather than
 * shown pointing at the wrong page.
 */
export async function readOutline(doc: PDFDocumentProxy): Promise<Bookmark[]> {
  let outline: RawItem[] | null = null;
  try {
    outline = (await doc.getOutline()) as RawItem[] | null;
  } catch {
    return [];
  }
  if (!outline?.length) return [];

  const out: Bookmark[] = [];

  const walk = async (items: RawItem[], depth: number) => {
    for (const it of items) {
      const pageIndex = await resolve(doc, it.dest);
      if (pageIndex !== null) out.push({ title: it.title || "Untitled", pageIndex, depth });
      if (it.items?.length) await walk(it.items, depth + 1);
    }
  };

  await walk(outline, 0);
  return out;
}

async function resolve(doc: PDFDocumentProxy, dest: RawItem["dest"]): Promise<number | null> {
  try {
    const explicit = typeof dest === "string" ? await doc.getDestination(dest) : dest;
    const ref = Array.isArray(explicit) ? explicit[0] : null;
    if (!ref) return null;
    return await doc.getPageIndex(ref as Parameters<PDFDocumentProxy["getPageIndex"]>[0]);
  } catch {
    return null;
  }
}
