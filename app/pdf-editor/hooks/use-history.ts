"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Undo/redo over whole snapshots of a value. Snapshots are cheap here because
 * blocks are plain data and the arrays are small (hundreds of lines, not
 * thousands of nodes) — a command/diff log would be more code for no gain.
 *
 * The stacks are mutated outside the state updater on purpose: React
 * double-invokes updaters in StrictMode, so pushing from inside one would
 * record every edit twice and corrupt the history.
 */
export function useHistory<T>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  const current = useRef<T>(initial);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const [depth, setDepth] = useState({ undo: 0, redo: 0 });

  const put = useCallback((next: T) => {
    current.current = next;
    setValue(next);
    setDepth({ undo: past.current.length, redo: future.current.length });
  }, []);

  /** Replace the value, pushing the previous one onto the undo stack. */
  const commit = useCallback((next: T | ((prev: T) => T)) => {
    const prev = current.current;
    const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
    if (Object.is(resolved, prev)) return;
    past.current.push(prev);
    future.current = [];
    put(resolved);
  }, [put]);

  /** Replace without recording history — used when loading a new document. */
  const reset = useCallback((next: T) => {
    past.current = [];
    future.current = [];
    put(next);
  }, [put]);

  const undo = useCallback(() => {
    const last = past.current.pop();
    if (last === undefined) return;
    future.current.push(current.current);
    put(last);
  }, [put]);

  const redo = useCallback(() => {
    const next = future.current.pop();
    if (next === undefined) return;
    past.current.push(current.current);
    put(next);
  }, [put]);

  return { value, commit, reset, undo, redo, canUndo: depth.undo > 0, canRedo: depth.redo > 0 };
}
