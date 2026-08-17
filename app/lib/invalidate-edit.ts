/**
 * Wraps a board mutator so it clears a stale output first — any arrangement
 * change means a previously written file no longer matches the board.
 */
export function invalidateEdit(clear: () => void) {
  return <A extends unknown[]>(fn: (...a: A) => void) =>
    (...a: A) => {
      clear();
      fn(...a);
    };
}
