/** Canvas fluid-wave renderer for the hero aurora. Pure drawing math. */

import type { Pointer } from "./hero-pointer";

export const H = 1000;

const BANDS = [
  { base: 260, amp: 55, freq: 0.0019, speed: 0.9, a: 0, b: 1, op: 0.28 },
  { base: 340, amp: 70, freq: 0.0015, speed: 0.7, a: 1, b: 2, op: 0.22 },
  { base: 420, amp: 65, freq: 0.0022, speed: 1.1, a: 2, b: 0, op: 0.18 },
];

export function paint(
  ctx: CanvasRenderingContext2D,
  w: number,
  time: number,
  m: Pointer,
  colors: string[],
) {
  ctx.clearRect(0, 0, w, H);

  BANDS.forEach((wv, i) => {
    ctx.beginPath();
    ctx.moveTo(0, H);
    const step = 28;
    let px = 0;
    let py = wv.base;

    for (let x = 0; x <= w + step; x += step) {
      let y =
        wv.base +
        Math.sin(x * wv.freq + time * wv.speed + i * 1.2) * wv.amp +
        Math.cos(x * wv.freq * 1.6 - time * 0.7) * (wv.amp * 0.4);

      if (m.active) {
        const dy = y - m.y;
        const dist = Math.hypot(x - m.x, dy);
        if (dist < 320) {
          const force = 1 - dist / 320;
          y += (dy > 0 ? 1 : -1) * force * force * (35 + m.speed * 6);
        }
      }

      if (x === 0) ctx.lineTo(x, y);
      else ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
      px = x;
      py = y;
    }

    ctx.lineTo(w, H);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, wv.base - 70, w, wv.base + 110);
    grad.addColorStop(0, colors[wv.a]);
    grad.addColorStop(0.5, colors[wv.b]);
    grad.addColorStop(1, colors[wv.a]);
    ctx.fillStyle = grad;
    ctx.globalAlpha = wv.op;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
}
