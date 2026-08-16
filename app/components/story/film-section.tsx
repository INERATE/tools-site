"use client";

import { InteractiveGlassFilm } from "./interactive-glass-film";

export function FilmSection() {
  return (
    <section aria-label="Product film" className="relative w-full overflow-hidden">
      <InteractiveGlassFilm />
    </section>
  );
}
