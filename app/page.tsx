import { AmbientBlob } from "./components/ambient-blob";
import { Nav } from "./components/nav";
import { Dock } from "./components/dock";
import { Hero } from "./components/hero";
import { ToolGrid } from "./components/tool-grid";
import { InteractiveGlassFilm } from "./components/story/interactive-glass-film";
import { FeaturedToolsReel } from "./components/story/featured-tools-reel";
import { AdSlot } from "./components/ad-slot";
import { HomeSearchBar } from "./components/home-search-bar";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AmbientBlob />
      <Nav />
        <Dock />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-28 space-y-24 sm:space-y-32">
        <Hero />
        <ToolGrid />
        <HomeSearchBar />
        <FeaturedToolsReel />
        <InteractiveGlassFilm />
        <AdSlot slot="homepage" />
        <Footer />
      </main>
    </div>
  );
}
