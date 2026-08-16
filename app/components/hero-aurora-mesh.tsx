"use client";

import { useEffect, useRef } from "react";

/**
 * Generative Prismatic Fluid Aurora Mesh.
 * Renders 3 layered liquid glass wave ribbons that smoothly undulate and ripple with mouse interaction.
 * 100% unique, buttery 60fps, and zero cheap particles.
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
    let lastMouseX = 0;
    let lastMouseY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = 950;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dist = Math.hypot(currentX - lastMouseX, currentY - lastMouseY);
      mouseRef.current.speed = Math.min(dist * 0.1, 8);
      mouseRef.current.targetX = currentX;
      mouseRef.current.targetY = currentY;
      mouseRef.current.active = true;

      lastMouseX = currentX;
      lastMouseY = currentY;
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
      time += 0.008;
      const w = window.innerWidth;
      const h = 950;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse interpolation & speed damping
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;
      m.speed *= 0.92;

      const colors = getColors();

      // Render 3 undulating prismatic liquid ribbons
      const waveConfigs = [
        { baseHeight: 280, amp: 55, freq: 0.0022, speed: 1.0, colorA: colors[0], colorB: colors[1], opacity: 0.28 },
        { baseHeight: 340, amp: 75, freq: 0.0018, speed: 0.75, colorA: colors[1], colorB: colors[2], opacity: 0.22 },
        { baseHeight: 400, amp: 65, freq: 0.0025, speed: 1.25, colorA: colors[2], colorB: colors[0], opacity: 0.18 },
      ];

      waveConfigs.forEach((cfg, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const step = 20;
        for (let x = 0; x <= w + step; x += step) {
          // Harmonic wave calculations
          let y =
            cfg.baseHeight +
            Math.sin(x * cfg.freq + time * cfg.speed + idx) * cfg.amp +
            Math.cos(x * cfg.freq * 1.5 - time * 0.6) * (cfg.amp * 0.4);

          // Interactive mouse fluid disturbance
          if (m.active) {
            const dx = x - m.x;
            const dy = y - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 320);
            if (influence > 0) {
              const push = Math.sin(influence * Math.PI) * (35 + m.speed * 6);
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

        // Prismatic horizontal gradient
        const grad = ctx.createLinearGradient(0, cfg.baseHeight - 80, w, cfg.baseHeight + 120);
        grad.addColorStop(0, cfg.colorA);
        grad.addColorStop(0.5, cfg.colorB);
        grad.addColorStop(1, cfg.colorA);

        ctx.fillStyle = grad;
        ctx.globalAlpha = cfg.opacity;
        ctx.fill();
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
      className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-screen h-[950px] -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Central Luminous Ambient Aurora Glow */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1250px] h-[550px] sm:h-[750px] rounded-full blur-[140px] opacity-70 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* 60fps Generative Prismatic Fluid Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90"
        style={{
          maskImage: "radial-gradient(ellipse 95% 80% at 50% 35%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 80% at 50% 35%, #000 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
