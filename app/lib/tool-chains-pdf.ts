import type { Chain } from "./tool-chains";

/** Workflow chains for the PDF-side tools. Split out for the file-size cap. */
export const CHAINS_PDF: Record<string, Chain> = {
  "/pdf-merger": { next: ["/compress-pdf", "/page-numbers"], why: "Merged files get large." },
  "/pdf-split": { next: ["/pdf-merger", "/extract-pdf-pages"], why: "Recombine or pull out pages." },
  "/compress-pdf": { next: ["/pdf-merger", "/protect-pdf"], why: "Combine it, or lock it." },
  "/pdf-to-word": { next: ["/word-to-pdf"], why: "Convert back when you finish editing." },
  "/word-to-pdf": { next: ["/compress-pdf", "/protect-pdf"], why: "Shrink for email, or add a password." },
  "/docx-to-pdf": { next: ["/compress-pdf", "/sign-pdf"], why: "Shrink for email, or sign it." },
  "/jpg-to-pdf": { next: ["/compress-pdf", "/pdf-merger"], why: "Photo PDFs are heavy." },
  "/png-to-pdf": { next: ["/compress-pdf", "/pdf-merger"], why: "Photo PDFs are heavy." },
  "/unlock-pdf": { next: ["/protect-pdf", "/compress-pdf"], why: "Set a new password, or compress it." },
  "/remove-password-from-pdf": { next: ["/protect-pdf"], why: "Set a new password." },
  "/protect-pdf": { next: ["/sign-pdf", "/watermark-pdf"], why: "Sign or stamp it before sending." },
  "/sign-pdf": { next: ["/protect-pdf", "/flatten-forms"], why: "Lock the signature in place." },
  "/watermark-pdf": { next: ["/compress-pdf", "/protect-pdf"], why: "Shrink or lock it." },
  "/ocr-pdf": { next: ["/pdf-to-word", "/pdf-to-text"], why: "The text is real now — pull it out." },
  "/rotate-pdf": { next: ["/pdf-merger", "/crop-pdf"], why: "Merge it, or trim the margins." },
  "/crop-pdf": { next: ["/compress-pdf", "/pdf-merger"], why: "Compress or merge it." },
  "/extract-pdf-pages": { next: ["/pdf-merger", "/compress-pdf"], why: "Merge or compress what you kept." },
  "/delete-pdf-pages": { next: ["/page-numbers", "/compress-pdf"], why: "Renumber what is left." },
  "/page-numbers": { next: ["/pdf-merger", "/protect-pdf"], why: "Merge it, or lock it." },
  "/redact-pdf": { next: ["/flatten-forms"], why: "Flatten so redaction cannot be undone." },
  "/repair-pdf": { next: ["/compress-pdf", "/pdf-merger"], why: "It opens cleanly now." },
  "/remove-blank-pages": { next: ["/page-numbers", "/compress-pdf"], why: "Renumber what is left." },
  "/html-to-pdf": { next: ["/compress-pdf", "/watermark-pdf"], why: "Shrink or stamp it." },
};
