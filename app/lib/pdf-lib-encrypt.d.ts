declare module "pdf-lib-encrypt" {
  import type { PDFDocument } from "pdf-lib";

  export function configure(pdfLib: unknown): void;
  export function lock(
    bytes: Uint8Array,
    password: string,
    opts?: { algo?: "aes256" | "rc4"; permissions?: number },
  ): Promise<Uint8Array>;
  export function unlockInPlace(doc: PDFDocument, password: string): Promise<boolean>;
}
