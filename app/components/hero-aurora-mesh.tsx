"use client";

import { useEffect, useRef } from "react";

/**
 * Ultra-Premium Prismatic Chromatic Fluid Light Wave & Caustics Engine.
 * 60fps high-DPI generative fluid light ribbons with interactive cursor refraction vortex.
 */
export function HeroAuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, speed: 0, active: false });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = 1050;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      const dist = Math.hypot(curX - lastX, curY - lastY);
      mouseRef.current.speed = Math.min(dist * 0.15, 12);
      mouseRef.current.targetX = curX;
      mouseRef.current.targetY = curY;
      mouseRef.current.active = true;

      lastX = curX;
      lastY = curY;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim() || "#A78BFA";
      const accent2 = style.getPropertyValue("--accent-2").trim() || "#D946EF";
      const accent3 = style.getPropertyValue("--accent-3").trim() || "#22D3EE";
      return [accent, accent2, accent3];
    };

    const draw = () => {
      time += 0.009;
      const w = window.innerWidth;
      const h = 1050;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse spring & damping
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.07;
      m.y += (m.targetY - m.y) * 0.07;
      m.speed *= 0.94;

      const colors = getColors();

      // 4 Layered Multi-Chromatic Fluid Waves
      const waves = [
        { base: 260, amp: 65, freq: 0.0019, speed: 1.0, colA: colors[0], colB: colors[1], op: 0.32 },
        { base: 330, amp: 85, freq: 0.0015, speed: 0.7, colA: colors[1], colB: colors[2], op: 0.26 },
        { base: 410, amp: 75, freq: 0.0022, speed: 1.2, colA: colors[2], colB: colors[0], op: 0.22 },
        { base: 490, amp: 95, freq: 0.0014, speed: 0.5, colA: colors[0], colB: colors[2], op: 0.18 },
      ];

      waves.forEach((wv, i) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const step = 16;
        for (let x = 0; x <= w + step; x += step) {
          // Harmonic wave equation with multi-frequency modulation
          let y =
            wv.base +
            Math.sin(x * wv.freq + time * wv.speed + i * 1.2) * wv.amp +
            Math.cos(x * wv.freq * 1.8 - time * 0.8) * (wv.amp * 0.45);

          // Interactive fluid cursor disturbance
          if (m.active) {
            const dx = x - m.x;
            const dy = y - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 360;
            if (dist < radius) {
              const force = Math.pow(1 - dist / radius, 2);
              const push = force * (45 + m.speed * 8);
              y += (dy > 0 ? 1 : -1) * push;
            }
          }

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        // Prismatic fluid gradient fill
        const grad = ctx.createLinearGradient(0, wv.base - 90, w, wv.base + 140);
        grad.addColorStop(0, wv.colA);
        grad.addColorStop(0.5, wv.colB);
        grad.addColorStop(1, wv.colA);

        ctx.fillStyle = grad;
        ctx.globalAlpha = wv.op;
        ctx.fill();

        // Specular illuminated wave crest line
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = wv.colB;
        ctx.globalAlpha = wv.op * 1.4;
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-screen h-[1050px] -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Central Luminous Ambient Aurora Glow Bloom */}
      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1350px] h-[580px] sm:h-[800px] rounded-full blur-[140px] opacity-75 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* 60fps Generative Prismatic Fluid Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90"
        style={{
          maskImage: "radial-gradient(ellipse 95% 82% at 50% 32%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 82% at 50% 32%, #000 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
