import { AmbientBlob } from "./components/ambient-blob";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { ToolGrid } from "./components/tool-grid";
import { StorySection } from "./components/story/story-section";
import { FilmSection } from "./components/story/film-section";

/**
 * StorySection is deliberately outside <main>: GSAP pins it by copying the
 * measured width onto a fixed element, so inside max-w-5xl the pinned stage
 * would be 64rem wide instead of edge-to-edge. Do not add overflow, transform
 * or filter to any ancestor here either — both break `position: fixed` pinning.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <Hero />
        <ToolGrid />
      </main>
      <StorySection />
      <FilmSection />
    </div>
  );
}
