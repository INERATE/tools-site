import { FileStack, Image as ImageIcon, FileText, Scissors, Droplets, FileType } from "lucide-react";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { ToolCard } from "./components/tool-card";
import { AmbientBlob } from "./components/ambient-blob";

const TOOLS = [
  { href: "/pdf-merger", icon: <FileStack strokeWidth={1.75} />, title: "PDF Merger", description: "Combine multiple PDFs into one, in your browser.", live: true },
  { href: "/pdf-split", icon: <Scissors strokeWidth={1.75} />, title: "PDF Splitter", description: "Pull pages out of a PDF or split it apart." },
  { href: "/watermark-remover", icon: <Droplets strokeWidth={1.75} />, title: "Watermark Remover", description: "Strip watermarks from PDF pages." },
  { href: "/pdf-to-image", icon: <ImageIcon strokeWidth={1.75} />, title: "PDF to Image", description: "Export PDF pages as PNG or JPG." },
  { href: "/docx-to-pdf", icon: <FileType strokeWidth={1.75} />, title: "DOCX to PDF", description: "Convert Word documents to PDF." },
  { href: "/resume-builder", icon: <FileText strokeWidth={1.75} />, title: "Resume Builder", description: "Build and export a clean resume PDF." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <Hero />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </main>
    </div>
  );
}
