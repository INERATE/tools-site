import type { Chain } from "./tool-chains";

/** Workflow chains for image, text and spreadsheet tools. */
export const CHAINS_MEDIA: Record<string, Chain> = {
  "/pdf-to-jpg": { next: ["/compress-image", "/resize-image"], why: "Shrink or resize what you pulled out." },
  "/pdf-to-png": { next: ["/compress-image", "/remove-background"], why: "Shrink them, or cut the background." },
  "/pdf-to-image": { next: ["/compress-image", "/resize-image"], why: "Shrink or resize what you pulled out." },
  "/extract-images": { next: ["/compress-image", "/remove-background"], why: "Clean up what you extracted." },
  "/compress-image": { next: ["/resize-image", "/convert-image"], why: "Resize it, or change the format." },
  "/resize-image": { next: ["/compress-image", "/crop-image"], why: "Compress further, or crop it." },
  "/crop-image": { next: ["/compress-image", "/remove-background"], why: "Compress it, or cut the background." },
  "/convert-image": { next: ["/compress-image", "/resize-image"], why: "Compress or resize the result." },
  "/remove-background": { next: ["/crop-image", "/convert-image"], why: "Crop it, or save another format." },
  "/watermark-remover": { next: ["/crop-image", "/compress-image"], why: "Crop or compress the cleaned image." },
  "/watermark-image": { next: ["/compress-image", "/resize-image"], why: "Compress before publishing." },
  "/image-to-text": { next: ["/word-counter", "/pdf-to-text"], why: "Count the words you extracted." },
  "/pdf-to-text": { next: ["/word-counter", "/pdf-to-word"], why: "Count words, or get a real Word file." },
  "/pdf-to-markdown": { next: ["/markdown-to-pdf", "/pdf-to-text"], why: "Convert back, or get plain text." },
  "/markdown-to-pdf": { next: ["/compress-pdf", "/page-numbers"], why: "Shrink it, or number the pages." },
  "/csv-to-excel": { next: ["/excel-to-pdf", "/excel-to-csv"], why: "Make a PDF, or convert back." },
  "/excel-to-csv": { next: ["/csv-to-pdf", "/csv-to-excel"], why: "Make a PDF table, or convert back." },
  "/excel-to-pdf": { next: ["/compress-pdf", "/protect-pdf"], why: "Shrink or lock it." },
  "/csv-to-pdf": { next: ["/compress-pdf", "/page-numbers"], why: "Shrink it, or number the pages." },
  "/image-to-base64": { next: ["/compress-image"], why: "Compress first to shorten the string." },
};
