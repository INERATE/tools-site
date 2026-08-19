import QRCode from "qrcode";

export type QrOptions = { size: number; fg: string; bg: string; errorCorrection: "L" | "M" | "Q" | "H" };

export const QR_DEFAULTS: QrOptions = { size: 512, fg: "#0A0A0B", bg: "#FFFFFF", errorCorrection: "M" };

/** PNG data URL for on-screen preview + download. */
export async function textToQr(text: string, opts: QrOptions = QR_DEFAULTS): Promise<string> {
  return QRCode.toDataURL(text, {
    width: opts.size,
    margin: 2,
    errorCorrectionLevel: opts.errorCorrection,
    color: { dark: opts.fg, light: opts.bg },
  });
}

/** SVG markup, for the scalable/print download option. */
export async function textToQrSvg(text: string, opts: QrOptions = QR_DEFAULTS): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: opts.errorCorrection,
    color: { dark: opts.fg, light: opts.bg },
  });
}
