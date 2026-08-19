/** href -> generated frame-loop clip, for the 6 homepage-featured tools only. */
export const STORY_CLIPS: Record<string, { dir: string; count: number }> = {
  "/pdf-merger": { dir: "/frames/merger", count: 120 },
  // Trimmed to 90/120: the source clip washes out to near-white past this
  // point (a lighting flash the model added, not a matting defect — verified
  // against the pre-matting source frames).
  "/pdf-split": { dir: "/frames/splitter", count: 90 },
  "/compress-pdf": { dir: "/frames/compress", count: 120 },
  "/pdf-to-word": { dir: "/frames/pdf-to-word", count: 120 },
  "/jpg-to-pdf": { dir: "/frames/jpg-to-pdf", count: 120 },
  "/sign-pdf": { dir: "/frames/sign-pdf", count: 105 },
};
