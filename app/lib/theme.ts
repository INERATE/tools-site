// Theme choices + resolution. Mirrors the boot script in app/layout.tsx —
// keep both in sync if you add a theme or change auto-resolution.

export type Choice = "auto" | "iridescence" | "obsidian" | "daylight" | "aurora" | "ember";
export type Resolved = Exclude<Choice, "auto">;

export const ORDER: Choice[] = ["auto", "iridescence", "obsidian", "daylight", "aurora", "ember"];

export const LABEL: Record<Choice, string> = {
  auto: "Auto",
  iridescence: "Iridescence",
  obsidian: "Obsidian",
  daylight: "Daylight",
  aurora: "Aurora",
  ember: "Ember",
};

/** Auto resolves to the two house defaults only — Iridescence or Daylight. */
export function resolve(choice: Choice): Resolved {
  if (choice !== "auto") return choice;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "iridescence" : "daylight";
}

/** localStorage is external mutable state — expose it as a useSyncExternalStore
 *  source so components read it without a setState-in-effect cascade. */
const listeners = new Set<() => void>();

export function subscribeTheme(cb: () => void) {
  listeners.add(cb);
  return () => void listeners.delete(cb);
}

export function applyTheme(choice: Choice) {
  document.documentElement.setAttribute("data-theme", resolve(choice));
  localStorage.setItem("theme", choice);
  listeners.forEach((l) => l());
}

/** Hydration snapshot: the server cannot know the stored choice. */
export const serverTheme = (): Choice => "iridescence";

/**
 * SSR has no localStorage — callers get the default there, the real value on
 * mount. First-time visitors get Iridescence, NOT "auto": the brand look is the
 * dark iridescent one, and auto would hand every light-mode OS the Daylight
 * theme as its first impression. Opting into Daylight stays one click away.
 */
export function readStoredTheme(): Choice {
  if (typeof window === "undefined") return "iridescence";
  return (localStorage.getItem("theme") as Choice | null) ?? "iridescence";
}
