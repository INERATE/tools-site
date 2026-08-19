"use client";

import type { TextStats } from "../lib/text-stats";
import { StatTile } from "./stat-tile";

function minutes(n: number): string {
  if (n < 1) return "<1 min";
  return `${Math.ceil(n)} min`;
}

export function StatsGrid({ stats }: { stats: TextStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <StatTile label="Words" value={stats.words} />
      <StatTile label="Characters" value={stats.characters} />
      <StatTile label="No spaces" value={stats.charactersNoSpaces} />
      <StatTile label="Sentences" value={stats.sentences} />
      <StatTile label="Paragraphs" value={stats.paragraphs} />
      <StatTile label="Reading time" value={minutes(stats.readingMinutes)} />
    </div>
  );
}
