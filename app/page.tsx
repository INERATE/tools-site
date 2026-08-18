import { AmbientBlob } from "./components/ambient-blob";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { ToolGrid } from "./components/tool-grid";
import { InteractiveGlassFilm } from "./components/story/interactive-glass-film";
import { AdSlot } from "./components/ad-slot";
import { HomeSearchBar } from "./components/home-search-bar";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-12 pb-28 space-y-24 sm:space-y-32">
        <Hero />
        <ToolGrid />
        <HomeSearchBar />
        <InteractiveGlassFilm />
        <AdSlot slot="homepage" />
      </main>
    </div>
  );
}
