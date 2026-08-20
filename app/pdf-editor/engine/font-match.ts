/**
 * Matches a pdf.js-reported font name to one of the 14 standard PDF fonts —
 * Helvetica (sans), Times (serif), Courier (mono) — each built into every PDF
 * reader already, so this needs no fontkit and no bundled font files.
 *
 * pdf.js's fontName is an internal id, not always the PostScript name, but on
 * many real files (including LaTeX output) it carries one, optionally behind
 * a 6-letter ABCDEF+ subset tag. When it doesn't, FontDescriptor flags aren't
 * exposed by getTextContent() either, so we fall back to a low-confidence
 * default rather than guess — see Inspector's manual override for that case.
 */

export type FontFamily = "sans" | "serif" | "mono";

export interface FontMatch {
  family: FontFamily;
  label: string;
  confidence: number; // 0-100, shown to the user — never invented, always derived
  /** cmmi/cmsy/cmex/msam/msbm and friends — math symbol faces, not body text. */
  isMath: boolean;
}

const MATH = /^cm(mi|sy|ex)|^ms[ab]m|^msym|mathematica|^lm(mi|sy|ex)/i;

// cmtt is Computer Modern TYPEWRITER — checked in MONO, before the rest of
// the cm* family (cmr/cmbx/cmti/cmmi/cmsy/cmex — roman, bold, italic, and the
// serif-styled math faces) falls through to SERIF. Order matters here.
const MONO = /courier|mono|consolas|menlo|typewriter|^cmtt/i;
const SERIF = /times|serif|georgia|garamond|minion|nimbus.?rom|^cm(r|bx|ti|mi|sy|ex)\d|computer.?modern|stix|palatino|cambria/i;
const SUBSET_TAG = /^[A-Z]{6}\+/;

export function matchFont(rawName: string): FontMatch {
  const name = rawName.replace(SUBSET_TAG, "");
  const hadTag = SUBSET_TAG.test(rawName);
  const isMath = MATH.test(name);

  if (MONO.test(name)) {
    return { family: "mono", label: name || "Monospace (matched)", confidence: hadTag ? 92 : 78, isMath };
  }
  if (SERIF.test(name)) {
    return { family: "serif", label: name || "Serif (matched)", confidence: hadTag ? 92 : 78, isMath };
  }
  if (/helvetica|arial|sans/i.test(name)) {
    return { family: "sans", label: name || "Sans (matched)", confidence: hadTag ? 92 : 78, isMath };
  }

  // pdf.js gave us an opaque internal id (e.g. "g_d0_f2") with no readable
  // name — nothing to match against, so say so plainly instead of guessing.
  return { family: "sans", label: "Helvetica (no name reported)", confidence: 35, isMath: false };
}
