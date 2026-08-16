// Theme choices + resolution. Mirrors the boot script in app/layout.tsx —
// keep both in sync if you add a theme or change auto-resolution.

export type Choice = "auto" | "obsidian" | "daylight" | "aurora" | "ember";
export type Resolved = Exclude<Choice, "auto">;

export const ORDER: Choice[] = ["auto", "obsidian", "daylight", "aurora", "ember"];

export const LABEL: Record<Choice, string> = {
  auto: "Auto",
  obsidian: "Obsidian",
  daylight: "Daylight",
  aurora: "Aurora",
  ember: "Ember",
};

/** Auto never resolves to a gradient theme — only ever Obsidian or Daylight. */
export function resolve(choice: Choice): Resolved {
  if (choice !== "auto") return choice;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "obsidian" : "daylight";
}

export function applyTheme(choice: Choice) {
  document.documentElement.setAttribute("data-theme", resolve(choice));
  localStorage.setItem("theme", choice);
}

/** SSR has no localStorage — callers get "auto" there, the real value on mount. */
export function readStoredTheme(): Choice {
  if (typeof window === "undefined") return "auto";
  return (localStorage.getItem("theme") as Choice | null) ?? "auto";
}
