"use client";

import { PageBoard } from "./board";
import { BoardToolbar } from "./toolbar";
import type { usePageBoard } from "./use-page-board";

/**
 * Toolbar plus board, wired together. Every tool needs the same pair and the
 * same rule — any arrangement change invalidates a file that was already
 * produced — so `invalidate` runs before each edit rather than being repeated
 * on every page.
 */
export function ToolBoard({
  board,
  invalidate,
}: {
  board: ReturnType<typeof usePageBoard>;
  invalidate: () => void;
}) {
  const edit =
    <A extends unknown[]>(fn: (...a: A) => void) =>
    (...a: A) => {
      invalidate();
      fn(...a);
    };

  return (
    <>
      <BoardToolbar
        count={board.slots.length}
        total={board.total}
        pending={board.pending}
        onRotateAll={edit(board.rotateAll)}
        onReset={edit(board.reset)}
      />
      <PageBoard
        files={board.files}
        slots={board.slots}
        thumbs={board.thumbs}
        move={edit(board.move)}
        remove={edit(board.remove)}
        rotate={edit(board.rotate)}
        duplicate={edit(board.duplicate)}
      />
    </>
  );
}
