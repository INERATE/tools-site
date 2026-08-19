import { ConvertImageIcon } from "./icons/convert-image-icon";
import { ToImageIcon } from "./icons/to-image-icon";

/** More format-pair landing pages — continued from tool-list-format-pairs.ts, split to stay under the file-size cap. */
export const TOOLS_FORMAT_PAIRS_2 = [
  {
    href: "/jpg-to-webp",
    icon: ConvertImageIcon,
    title: "JPG to WEBP",
    description: "Batch convert JPG images to WEBP, right in your browser.",
    category: "Image Tools",
    live: true,
  },
  {
    href: "/webp-to-jpg",
    icon: ConvertImageIcon,
    title: "WEBP to JPG",
    description: "Batch convert WEBP images to JPG, right in your browser.",
    category: "Image Tools",
    live: true,
  },
  {
    href: "/pdf-to-png",
    icon: ToImageIcon,
    title: "PDF to PNG",
    description: "Choose your pages, then export them as PNG at any quality.",
    category: "Convert & Export",
    live: true,
  },
];
