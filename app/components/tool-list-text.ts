import { ImageToTextIcon } from "./icons/image-to-text-icon";
import { QrCodeIcon } from "./icons/qr-code-icon";
import { WordCounterIcon } from "./icons/word-counter-icon";

/** Text & utility category — Phase 12. Split out to stay under the file-size cap. */
export const TOOLS_TEXT = [
  {
    href: "/image-to-text",
    icon: ImageToTextIcon,
    title: "Image to Text",
    description: "Reads the text out of a photo, screenshot or scan — OCR, on-device.",
    category: "Utility",
    live: true,
  },
  {
    href: "/qr-code-generator",
    icon: QrCodeIcon,
    title: "QR Code Generator",
    description: "Turns any text or link into a scannable QR code, live as you type.",
    category: "Utility",
    live: true,
  },
  {
    href: "/word-counter",
    icon: WordCounterIcon,
    title: "Word Counter",
    description: "Live word, character, sentence and reading-time stats.",
    category: "Utility",
    live: true,
  },
];
