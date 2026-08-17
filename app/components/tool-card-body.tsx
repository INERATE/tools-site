"use client";

import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import type { IconProps } from "./icons/icon-shell";

/** Icon, status badge, title and description — the static content of a card. */
export function ToolCardBody({
  Icon,
  active,
  live,
  title,
  description,
}: {
  Icon: ComponentType<IconProps>;
  active: boolean;
  live?: boolean;
  title: string;
  description: string;
}) {
  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="clay-icon relative grid size-12 place-items-center text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
          <Icon active={active} size={24} />
        </div>

        {live ? (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-400 uppercase shadow-sm">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">
            Soon
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
            {title}
          </h3>
          {live && (
            <ArrowUpRight className="size-4 text-[var(--text-dim)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[var(--accent)]" />
          )}
        </div>
        <p className="text-[13.5px] leading-[1.6] text-[var(--text-dim)]">{description}</p>
      </div>
    </div>
  );
}
