"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, bounce: 0, duration: 0.35 };

export function ToolCard({
  href,
  icon,
  title,
  description,
  live,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  live?: boolean;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={live ? { y: -4, scale: 1.015 } : undefined}
      transition={spring}
      className="glass group flex h-full flex-col gap-3 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="text-[var(--accent)] [&>svg]:size-5">{icon}</div>
      <h3 className="text-[15px] font-medium tracking-[-0.01em]">{title}</h3>
      <p className="flex-1 text-[13.5px] leading-relaxed text-[var(--text-dim)]">{description}</p>
      {!live && (
        <span className="self-start rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-wide text-[var(--text-dim)] uppercase">
          Soon
        </span>
      )}
    </motion.div>
  );

  if (!live) return card;
  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}
