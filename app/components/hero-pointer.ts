/** Pointer state + theme-token reads for the hero aurora canvas. */

export type Pointer = { x: number; y: number; tx: number; ty: number; speed: number; active: boolean };

export const newPointer = (): Pointer => ({ x: 0, y: 0, tx: 0, ty: 0, speed: 0, active: false });

export function readColors() {
  const s = getComputedStyle(document.documentElement);
  return [
    s.getPropertyValue("--accent").trim() || "#A78BFA",
    s.getPropertyValue("--accent-2").trim() || "#D946EF",
    s.getPropertyValue("--accent-3").trim() || "#22D3EE",
  ];
}

/** Wires cursor push into `m`. Returns a teardown. */
export function trackPointer(cvs: HTMLCanvasElement, m: Pointer) {
  let lx = 0;
  let ly = 0;
  const onMove = (e: MouseEvent) => {
    const r = cvs.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    m.speed = Math.min(Math.hypot(cx - lx, cy - ly) * 0.1, 8);
    m.tx = cx;
    m.ty = cy;
    m.active = true;
    lx = cx;
    ly = cy;
  };
  const onLeave = () => void (m.active = false);
  addEventListener("mousemove", onMove, { passive: true });
  addEventListener("mouseleave", onLeave, { passive: true });
  return () => {
    removeEventListener("mousemove", onMove);
    removeEventListener("mouseleave", onLeave);
  };
}
