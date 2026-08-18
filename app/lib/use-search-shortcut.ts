import { useEffect } from "react";

/** Cmd/Ctrl+K toggles, Esc closes — wired globally so the overlay opens from anywhere. */
export function useSearchShortcut(setOpen: (fn: (v: boolean) => boolean) => void, close: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
