import { CsvToPdfIcon } from "./icons/csv-to-pdf-icon";
import { RemoveBlankPagesIcon } from "./icons/remove-blank-pages-icon";
import { PdfMetadataIcon } from "./icons/pdf-metadata-icon";

/** Utility category — Phase 11. Split out to stay under the file-size cap. */
export const TOOLS_UTILITY = [
  {
    href: "/csv-to-pdf",
    icon: CsvToPdfIcon,
    title: "CSV to PDF",
    description: "Turns a CSV file into a clean, paginated table PDF.",
    category: "Utility",
    live: true,
  },
  {
    href: "/remove-blank-pages",
    icon: RemoveBlankPagesIcon,
    title: "Remove Blank Pages",
    description: "Finds and drops near-all-white pages from a scanned PDF.",
    category: "Utility",
    live: true,
  },
  {
    href: "/pdf-metadata",
    icon: PdfMetadataIcon,
    title: "Edit PDF Metadata",
    description: "Edits a PDF's title, author, subject and keywords.",
    category: "Utility",
    live: true,
  },
];
