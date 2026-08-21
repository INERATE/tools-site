"use client";

import { BarChart3, Briefcase, Palette } from "lucide-react";
import { Block } from "./canvas-stage";

export function DemoPage({
  selected,
  onSelect,
  pageIndex = 0,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  pageIndex?: number;
}) {
  if (pageIndex === 0) {
    return (
      <div className="relative p-10 font-sans text-slate-800">
        {/* Abstract organic background shape top right */}
        <div className="pointer-events-none absolute -top-4 right-0 size-48 rounded-full bg-indigo-500/20 blur-2xl" />

        {/* Hero Section with mountain graphic */}
        <div className="relative mb-8 flex items-center justify-between gap-6">
          <div className="max-w-[340px]">
            <Block id="hero-title" selected={selected} onSelect={onSelect} font="Poppins" size={28}>
              <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-slate-900">
                Grow Your Business With Our{" "}
                <span className="text-indigo-600">Solutions</span>
              </h1>
            </Block>

            <Block id="hero-subtitle" selected={selected} onSelect={onSelect} font="Inter" size={11}>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                We provide the best business solutions to help you grow faster, improve productivity, and increase revenue.
              </p>
            </Block>
          </div>

          {/* Graphic / Image illustration mockup */}
          <div className="relative h-44 w-52 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <svg
              className="absolute bottom-0 w-full text-slate-900/30"
              viewBox="0 0 200 120"
              fill="currentColor"
            >
              <polygon points="0,120 40,50 90,120" opacity="0.8" />
              <polygon points="60,120 120,20 170,120" opacity="0.9" />
              <polygon points="130,120 165,65 200,120" opacity="0.7" />
            </svg>
            <div className="absolute top-3 right-3 size-10 rounded-full bg-white/20 backdrop-blur-md" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-[10px] font-semibold tracking-wide">Enterprise 2026</p>
              <p className="text-[8px] opacity-80">Strategic Growth Deck</p>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <Briefcase className="size-4" />
          </div>
          <div>
            <Block id="about-title" selected={selected} onSelect={onSelect} font="Poppins" size={13}>
              <h2 className="text-[13px] font-bold text-slate-900">About Us</h2>
            </Block>
            <Block id="about-desc" selected={selected} onSelect={onSelect} font="Inter" size={10}>
              <p className="mt-1 text-[10.5px] leading-relaxed text-slate-500">
                We are a team of experienced professionals dedicated to providing top-notch services to accelerate client transformations.
              </p>
            </Block>
          </div>
        </div>

        {/* Our Services Section */}
        <div>
          <Block id="services-header" selected={selected} onSelect={onSelect} font="Poppins" size={15}>
            <h2 className="mb-3.5 text-[15px] font-bold tracking-tight text-slate-900">Our Services</h2>
          </Block>

          <div className="grid grid-cols-3 gap-3.5">
            {/* Card 1 */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md">
              <div className="grid size-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <Briefcase className="size-4" />
              </div>
              <Block id="service-1-title" selected={selected} onSelect={onSelect} font="Poppins" size={11}>
                <h3 className="mt-2.5 text-[11px] font-bold text-slate-900">Business Strategy</h3>
              </Block>
              <Block id="service-1-desc" selected={selected} onSelect={onSelect} font="Inter" size={9}>
                <p className="mt-1 text-[9.5px] leading-relaxed text-slate-500">
                  We help you build powerful strategies for sustainable business growth.
                </p>
              </Block>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md">
              <div className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 className="size-4" />
              </div>
              <Block id="service-2-title" selected={selected} onSelect={onSelect} font="Poppins" size={11}>
                <h3 className="mt-2.5 text-[11px] font-bold text-slate-900">Market Analysis</h3>
              </Block>
              <Block id="service-2-desc" selected={selected} onSelect={onSelect} font="Inter" size={9}>
                <p className="mt-1 text-[9.5px] leading-relaxed text-slate-500">
                  Get in-depth market insights to make data-driven decisions.
                </p>
              </Block>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md">
              <div className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Palette className="size-4" />
              </div>
              <Block id="service-3-title" selected={selected} onSelect={onSelect} font="Poppins" size={11}>
                <h3 className="mt-2.5 text-[11px] font-bold text-slate-900">Branding & Design</h3>
              </Block>
              <Block id="service-3-desc" selected={selected} onSelect={onSelect} font="Inter" size={9}>
                <p className="mt-1 text-[9.5px] leading-relaxed text-slate-500">
                  We create stunning brands that connect with your target audience.
                </p>
              </Block>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 2 Mockup Specimen
  return (
    <div className="p-10 font-sans text-slate-800">
      <Block id={`p${pageIndex}-title`} selected={selected} onSelect={onSelect} font="Poppins" size={20}>
        <h2 className="text-[20px] font-bold text-slate-900">Project Overview & Timeline</h2>
      </Block>
      <Block id={`p${pageIndex}-desc`} selected={selected} onSelect={onSelect} font="Inter" size={11}>
        <p className="mt-2 text-[11px] text-slate-500">
          Page {pageIndex + 1} specimen preview showing multi-page scroll and layout stability.
        </p>
      </Block>
      <div className="mt-6 flex flex-col gap-3">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <span className="grid size-6 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
              {step}
            </span>
            <span className="text-[11px] font-medium text-slate-700">Milestone {step}: Execution Phase</span>
          </div>
        ))}
      </div>
    </div>
  );
}
