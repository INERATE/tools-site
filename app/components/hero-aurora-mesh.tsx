"use client";

import { useEffect, useRef } from "react";

/**
 * Ultra-Optimized Generative Prismatic Fluid Light Wave Canvas.
 * - Hardware accelerated with requestAnimationFrame
 * - Auto-pauses when out of viewport via IntersectionObserver
 * - High-efficiency bezier wave generation (butter-smooth 60fps with near-zero CPU overhead)
 */
export function HeroAuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, speed: 0, active: false });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastX = 0;
    let lastY = 0;

    // Auto-pause loop when out of viewport to maximize scroll performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animId) {
          animId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = 1000;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      const dist = Math.hypot(curX - lastX, curY - lastY);
      mouseRef.current.speed = Math.min(dist * 0.1, 8);
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
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim() || "#A78BFA";
      const accent2 = style.getPropertyValue("--accent-2").trim() || "#D946EF";
      const accent3 = style.getPropertyValue("--accent-3").trim() || "#22D3EE";
      return [accent, accent2, accent3];
    };

    const draw = () => {
      if (!isVisibleRef.current) {
        animId = 0;
        return;
      }

      time += 0.008;
      const w = window.innerWidth;
      const h = 1000;
      ctx.clearRect(0, 0, w, h);

      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;
      m.speed *= 0.92;

      const colors = getColors();

      // 3 Layered Optimized Fluid Waves
      const waves = [
        { base: 260, amp: 55, freq: 0.0019, speed: 0.9, colA: colors[0], colB: colors[1], op: 0.28 },
        { base: 340, amp: 70, freq: 0.0015, speed: 0.7, colA: colors[1], colB: colors[2], op: 0.22 },
        { base: 420, amp: 65, freq: 0.0022, speed: 1.1, colA: colors[2], colB: colors[0], op: 0.18 },
      ];

      waves.forEach((wv, i) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const step = 28;
        let prevX = 0;
        let prevY = wv.base;

        for (let x = 0; x <= w + step; x += step) {
          let y =
            wv.base +
            Math.sin(x * wv.freq + time * wv.speed + i * 1.2) * wv.amp +
            Math.cos(x * wv.freq * 1.6 - time * 0.7) * (wv.amp * 0.4);

          if (m.active) {
            const dx = x - m.x;
            const dy = y - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 320;
            if (dist < radius) {
              const force = 1 - dist / radius;
              const push = force * force * (35 + m.speed * 6);
              y += (dy > 0 ? 1 : -1) * push;
            }
          }

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            const midX = (prevX + x) / 2;
            const midY = (prevY + y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          }
          prevX = x;
          prevY = y;
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wv.base - 70, w, wv.base + 110);
        grad.addColorStop(0, wv.colA);
        grad.addColorStop(0.5, wv.colB);
        grad.addColorStop(1, wv.colA);

        ctx.fillStyle = grad;
        ctx.globalAlpha = wv.op;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-screen h-[1000px] -z-10 overflow-hidden will-change-transform"
      aria-hidden
    >
      {/* Central Luminous Ambient Aurora Glow Bloom */}
      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1250px] h-[550px] sm:h-[750px] rounded-full blur-[130px] opacity-70 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* Hardware-Accelerated 60fps Generative Prismatic Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 transform-gpu"
        style={{
          maskImage: "radial-gradient(ellipse 95% 82% at 50% 32%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 82% at 50% 32%, #000 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
