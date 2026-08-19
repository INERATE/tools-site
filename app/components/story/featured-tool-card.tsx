"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, type ComponentType } from "react";
import type { IconProps } from "../icons/icon-shell";

/** One panel in the featured-tools reel — plays its icon's own animation once it scrolls into view. */
export function FeaturedToolCard({
  href,
  icon: Icon,
  title,
  description,
  index,
}: {
  href: string;
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  index: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.08 }}
      onViewportEnter={() => setActive(true)}
      className="clay-card group w-[248px] shrink-0 snap-start p-5 sm:w-[272px]"
    >
      <Link href={href} className="flex h-full flex-col gap-4">
        <span className="clay-icon grid size-12 place-items-center text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
          <Icon active={active} size={24} />
        </span>
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-[15px] font-bold tracking-tight text-[var(--text)]">{title}</h3>
          <p className="text-[13px] leading-[1.55] text-[var(--text-dim)]">{description}</p>
        </div>
        <span className="flex items-center gap-1 text-[12.5px] font-semibold text-[var(--accent)]">
          Open
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
