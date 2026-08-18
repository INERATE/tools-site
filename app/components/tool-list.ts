import { MergeIcon } from "./icons/merge-icon";
import { SplitIcon } from "./icons/split-icon";
import { WatermarkIcon } from "./icons/watermark-icon";
import { RotatePdfIcon } from "./icons/rotate-pdf-icon";
import { PageNumbersIcon } from "./icons/page-numbers-icon";
import { SignPdfIcon } from "./icons/sign-pdf-icon";
import { TOOLS_CONVERT } from "./tool-list-convert";
import { TOOLS_OPTIMIZE } from "./tool-list-optimize";

export const TOOLS = [
  {
    href: "/pdf-merger",
    icon: MergeIcon,
    title: "PDF Merger",
    description: "Combine PDFs, then reorder, rotate or drop any page before you save.",
    live: true,
    category: "PDF Suite",
  },
  {
    href: "/pdf-split",
    icon: SplitIcon,
    title: "PDF Splitter",
    description: "Pick pages visually or by range, and rearrange what is left.",
    category: "PDF Suite",
    live: true,
  },
  {
    href: "/rotate-pdf",
    icon: RotatePdfIcon,
    title: "Rotate PDF",
    description: "Fix sideways or upside-down pages, one at a time or all at once.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/sign-pdf",
    icon: SignPdfIcon,
    title: "Sign PDF",
    description: "Draw your signature, drag it onto the page, and save.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/page-numbers",
    icon: PageNumbersIcon,
    title: "Page Numbers",
    description: "Stamp a running page number onto every page, styled your way.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/watermark-remover",
    icon: WatermarkIcon,
    title: "Watermark Remover",
    description: "Delete watermark and stamp annotations, and cover marks printed into the page.",
    category: "Clean & Polish",
    live: true,
  },
  ...TOOLS_OPTIMIZE,
  ...TOOLS_CONVERT,
];
