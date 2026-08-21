"use client";

import { useCallback, useState } from "react";

/** Per-page transforms applied at export: rotation and deletion. */
export interface PageOp {
  rotate: number;
  deleted: boolean;
}

const BLANK: PageOp = { rotate: 0, deleted: false };

export function usePageOps(onChange: () => void) {
  const [ops, setOps] = useState<Record<number, PageOp>>({});

  const opFor = useCallback((i: number) => ops[i] ?? BLANK, [ops]);

  const rotatePage = useCallback((i: number) => {
    onChange();
    setOps((v) => {
      const cur = v[i] ?? BLANK;
      return { ...v, [i]: { ...cur, rotate: (cur.rotate + 90) % 360 } };
    });
  }, [onChange]);

  const toggleDeleted = useCallback((i: number) => {
    onChange();
    setOps((v) => {
      const cur = v[i] ?? BLANK;
      return { ...v, [i]: { ...cur, deleted: !cur.deleted } };
    });
  }, [onChange]);

  const resetOps = useCallback(() => setOps({}), []);

  const deletedCount = Object.values(ops).filter((o) => o.deleted).length;

  return { ops, opFor, rotatePage, toggleDeleted, resetOps, deletedCount };
}
