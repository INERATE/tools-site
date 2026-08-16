"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive Optical Laser Mesh & Caustics Filament Canvas.
 * Ultra-premium, fluid, 60fps interactive background with zero cheap particles.
 * Renders smooth flowing laser filaments that deflect with mouse gravitational physics.
 */
export function HeroCausticsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = 1000;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    // Color parser reading active theme tokens
    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim() || "#A78BFA";
      const accent2 = style.getPropertyValue("--accent-2").trim() || "#D946EF";
      const accent3 = style.getPropertyValue("--accent-3").trim() || "#22D3EE";
      return [accent, accent2, accent3];
    };

    const draw = () => {
      time += 0.012;
      const w = window.innerWidth;
      const h = 1000;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse spring interpolation
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      const centerX = w / 2;
      const centerY = 280; // Focal point right behind the headline
      const colors = getColors();

      // Draw 18 fluid optical laser filaments fanning out from the focal core
      const rayCount = 20;
      for (let i = 0; i < rayCount; i++) {
        const angle = ((i - rayCount / 2) / rayCount) * Math.PI * 1.15 - Math.PI / 2;
        const wave = Math.sin(time + i * 0.35) * 45;
        const wave2 = Math.cos(time * 0.8 + i * 0.5) * 30;

        // End points radiating towards the edges
        const length = Math.max(w, h) * 0.95;
        const endX = centerX + Math.cos(angle) * length + wave;
        const endY = centerY + Math.sin(angle) * length + wave2;

        // Mouse gravitational control point
        let ctrlX = (centerX + endX) / 2 + Math.sin(time * 0.6 + i) * 60;
        let ctrlY = (centerY + endY) / 2 + Math.cos(time * 0.6 + i) * 60;

        if (m.active) {
          const dx = m.x - ctrlX;
          const dy = m.y - ctrlY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 450;
          if (dist < maxDist) {
            const pull = (1 - dist / maxDist) * 90;
            ctrlX += (dx / dist) * pull;
            ctrlY += (dy / dist) * pull;
          }
        }

        // Color gradient along the filament
        const grad = ctx.createLinearGradient(centerX, centerY, endX, endY);
        const col1 = colors[i % colors.length];
        const col2 = colors[(i + 1) % colors.length];

        grad.addColorStop(0, `${col1}`);
        grad.addColorStop(0.3, `${col2}`);
        grad.addColorStop(0.8, `${col1}`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = i % 3 === 0 ? 2 : 1;
        ctx.globalAlpha = i % 2 === 0 ? 0.35 : 0.22;
        ctx.stroke();

        // Subtle traveling energy pulse along the curve
        const pulseT = ((time * 0.3 + i * 0.12) % 1);
        const pulseX = (1 - pulseT) * (1 - pulseT) * centerX + 2 * (1 - pulseT) * pulseT * ctrlX + pulseT * pulseT * endX;
        const pulseY = (1 - pulseT) * (1 - pulseT) * centerY + 2 * (1 - pulseT) * pulseT * ctrlY + pulseT * pulseT * endY;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = col2;
        ctx.globalAlpha = 0.6 * (1 - pulseT);
        ctx.fill();
      }

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
    <div className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-screen h-[1000px] -z-10 overflow-hidden" aria-hidden>
      {/* Central Luminous Ambient Aurora Bloom */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1200px] h-[550px] sm:h-[750px] rounded-full blur-[130px] opacity-65 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* 60fps Interactive Optical Filament Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-80"
        style={{
          maskImage: "radial-gradient(ellipse 90% 75% at 50% 32%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 32%, #000 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
