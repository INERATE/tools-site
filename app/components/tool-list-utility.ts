import { CsvToPdfIcon } from "./icons/csv-to-pdf-icon";
import { RemoveBlankPagesIcon } from "./icons/remove-blank-pages-icon";
import { PdfMetadataIcon } from "./icons/pdf-metadata-icon";
import { ExcelToPdfIcon } from "./icons/excel-to-pdf-icon";
import { ConvertImageIcon } from "./icons/convert-image-icon";

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
  {
    href: "/csv-to-excel",
    icon: ExcelToPdfIcon,
    title: "CSV to Excel",
    description: "Turns a .csv file into a real .xlsx workbook.",
    category: "Utility",
    live: true,
  },
  {
    href: "/excel-to-csv",
    icon: ExcelToPdfIcon,
    title: "Excel to CSV",
    description: "Reads the first sheet of a workbook and saves it as plain .csv.",
    category: "Utility",
    live: true,
  },
  {
    href: "/image-to-base64",
    icon: ConvertImageIcon,
    title: "Image to Base64",
    description: "Encodes an image as a base64 data URI, ready to paste into code.",
    category: "Utility",
    live: true,
  },
];
