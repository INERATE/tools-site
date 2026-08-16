"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Layers, ShieldCheck, Sparkles } from "lucide-react";

/**
 * Ultra-Premium 3D Isometric Glass Stack Engine.
 * 5 thick refractive glass document slabs with luminous edge highlights,
 * glowing emerald/cyan energy nodes, and smooth scroll convergence.
 */
export function InteractiveGlassFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Dynamic scroll separation -> convergence
  const spread = useTransform(scrollYProgress, [0.1, 0.75], [65, 14]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.8], [55, 60]);
  const rotateZ = useTransform(scrollYProgress, [0.1, 0.8], [-45, -35]);
  const stackScale = useTransform(scrollYProgress, [0.6, 1], [0.95, 1.1]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.9], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, #08060E 12%, #020204 50%, #08060E 88%, var(--bg) 100%)",
      }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-8">
        {/* Ambient Dark-Space Nebula */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(139, 92, 246, 0.3) 0%, rgba(34, 211, 238, 0.18) 45%, rgba(16, 185, 129, 0.1) 75%, transparent 100%)",
          }}
        />

        {/* 3D Isometric Stage Container */}
        <div className="relative flex size-full max-h-[520px] max-w-3xl items-center justify-center [perspective:1600px]">
          <motion.div
            style={{
              scale: stackScale,
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center"
          >
            {/* Luminous Floating Energy Spark Nodes */}
            <motion.div
              style={{ opacity: glowOpacity }}
              animate={{
                y: [-6, 6, -6],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-24 -left-12 size-4 rounded-full bg-emerald-400 blur-[2px] shadow-[0_0_30px_8px_rgba(52,211,153,0.9)]"
            />
            <motion.div
              style={{ opacity: glowOpacity }}
              animate={{
                y: [6, -6, 6],
                scale: [1.2, 0.9, 1.2],
              }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="pointer-events-none absolute -top-20 right-8 size-4 rounded-full bg-cyan-400 blur-[2px] shadow-[0_0_30px_8px_rgba(34,211,238,0.9)]"
            />

            {/* Isometric Glass Stack: 5 Layered Prismatic Slabs */}
            <motion.div
              style={{
                rotateX,
                rotateZ,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[340px] sm:w-[460px] h-[220px] sm:h-[290px]"
            >
              {[0, 1, 2, 3, 4].map((layerIndex) => {
                const isTop = layerIndex === 4;
                return (
                  <motion.div
                    key={layerIndex}
                    style={{
                      transform: `translateZ(${layerIndex * 22}px)`,
                      marginBottom: layerIndex * -12,
                    }}
                    className={`absolute inset-0 rounded-[28px] transition-all duration-300 ${
                      isTop
                        ? "border-[2px] border-cyan-300/80 bg-gradient-to-br from-white/[0.28] via-cyan-400/[0.15] to-violet-500/[0.12] backdrop-blur-[14px] shadow-[0_36px_90px_-15px_rgba(34,211,238,0.5),inset_0_2.5px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(0,0,0,0.5)]"
                        : "border-[1.5px] border-cyan-400/40 bg-gradient-to-br from-white/[0.15] via-violet-500/[0.08] to-transparent backdrop-blur-[10px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    }`}
                  >
                    {/* Glass Prismatic Reflection Bevel */}
                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-transparent via-white/[0.12] to-white/[0.25] pointer-events-none" />

                    {/* Top Sheet Details */}
                    {isTop && (
                      <div className="flex h-full flex-col justify-between p-7 sm:p-9">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-[12px] font-mono font-bold tracking-widest text-cyan-200 uppercase">
                            <Layers className="size-4 text-cyan-300" />
                            <span>Merged_Document_Master.pdf</span>
                          </span>
                          <span className="rounded-full bg-emerald-400/25 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                            Ready
                          </span>
                        </div>

                        <div className="space-y-3 opacity-70">
                          <div className="h-2.5 w-4/5 rounded-full bg-white/50 shadow-sm" />
                          <div className="h-2.5 w-full rounded-full bg-white/35 shadow-sm" />
                          <div className="h-2.5 w-3/5 rounded-full bg-white/25 shadow-sm" />
                        </div>

                        <div className="flex items-center justify-between border-t border-white/25 pt-3 text-[11px] text-white/80 font-mono">
                          <span>100% In-Memory Sandbox</span>
                          <span className="text-emerald-400">0 B Network Egress</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Headline & Call to Action */}
        <div className="relative z-20 flex flex-col items-center gap-3.5 pb-6 text-center">
          <h2 className="max-w-xl text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight text-white [text-shadow:0_4px_35px_rgba(0,0,0,0.9)]">
            Every page, in one place
          </h2>
          <p className="max-w-md text-[14.5px] leading-relaxed text-white/80">
            Processed entirely on your device with sub-millisecond local WebAssembly execution. Nothing is ever uploaded.
          </p>

          <Link
            href="/pdf-merger"
            className="clay mt-2 flex h-11.5 items-center gap-2 px-8 text-[14px] font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
          >
            <span>Merge a PDF Free</span>
            <ArrowRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
