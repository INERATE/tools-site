"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a contentEditable without letting React own its text.
 *
 * Rendering {text} as JSX children makes React rewrite the DOM text node on
 * every keystroke, which collapses the caret to position 0 — typing becomes
 * impossible. So the element is left childless and its content is written
 * imperatively: once on mount, and afterwards only when the value changes
 * from outside (undo, redo, restore) while the user is not typing in it.
 */
export function useEditableText(id: string, text: string) {
  const ref = useRef<HTMLSpanElement>(null);

  // Fresh block — seed it, regardless of focus.
  useEffect(() => {
    const el = ref.current;
    if (el && el.textContent !== text) el.textContent = text;
    // Only on identity change; text updates are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // External change (undo/redo). Never touch the node the caret lives in.
  useEffect(() => {
    const el = ref.current;
    if (!el || document.activeElement === el) return;
    if (el.textContent !== text) el.textContent = text;
  }, [text]);

  return ref;
}
