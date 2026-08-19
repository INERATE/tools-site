import { ProtectPdfIcon } from "./icons/protect-pdf-icon";
import { UnlockPdfIcon } from "./icons/unlock-pdf-icon";
import { FlattenFormIcon } from "./icons/flatten-form-icon";

/** Security & Forms category — Phase 10. Split out to stay under the file-size cap. */
export const TOOLS_SECURITY = [
  {
    href: "/protect-pdf",
    icon: ProtectPdfIcon,
    title: "Protect PDF",
    description: "Locks a PDF with a real AES-256 password, entirely on-device.",
    category: "Security & Forms",
    live: true,
  },
  {
    href: "/unlock-pdf",
    icon: UnlockPdfIcon,
    title: "Unlock PDF",
    description: "Removes password protection from a PDF you already have the password for.",
    category: "Security & Forms",
    live: true,
  },
  {
    href: "/flatten-forms",
    icon: FlattenFormIcon,
    title: "Flatten PDF Forms",
    description: "Turns a filled form's fields into permanent, uneditable page content.",
    category: "Security & Forms",
    live: true,
  },
];
