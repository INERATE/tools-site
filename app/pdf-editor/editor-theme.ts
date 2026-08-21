/**
 * The editor deliberately pins a light palette rather than inheriting the
 * site's five themes: it is a full-screen work surface where document
 * fidelity matters more than site branding, and a white page on a dark
 * chrome misrepresents how the PDF will actually print.
 */
export const EDITOR_THEME = {
  ["--bg" as string]: "#f3f4f8",
  ["--bg-raised" as string]: "#ffffff",
  ["--border" as string]: "#e2e8f0",
  ["--text" as string]: "#0f172a",
  ["--text-dim" as string]: "#64748b",
  ["--accent" as string]: "#4f46e5",
  ["--accent-2" as string]: "#6366f1",
  ["--on-accent" as string]: "#ffffff",
} as React.CSSProperties;

export const ACCENT = "#4f46e5";
