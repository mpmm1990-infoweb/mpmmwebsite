import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer — Modern Police Memorial Museum",
  description: "Developer information page.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DeveloperPage() {
  return (
    <main className="min-h-screen bg-[#060E1F] flex items-center justify-center px-4 py-16">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#006a4e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0B1B3D]/90 border border-[#D4AF37]/35 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.1)] overflow-hidden backdrop-blur-xl">
        {/* Gold top accent */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="p-10 sm:p-12 flex flex-col items-center text-center gap-6">
          {/* Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <span className="text-3xl select-none" aria-hidden="true">🇧🇩</span>
          </div>

          {/* Gold divider */}
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />

          {/* Attribution block */}
          <div className="space-y-1">
            <p className="text-[#94A59B] text-xs uppercase tracking-widest font-mono font-semibold">
              Designed &amp; Developed by
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-wide">
              Tanvir Kabir
            </h1>
            <a
              href="https://about.me/tanvir-kabir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#D4AF37] hover:text-[#E8C85A] text-sm font-mono transition-colors duration-200 underline underline-offset-4 decoration-[#D4AF37]/40 hover:decoration-[#E8C85A]"
            >
              https://about.me/tanvir-kabir
            </a>
          </div>

          {/* Details grid */}
          <div className="w-full mt-2 grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#060E1F]/70 border border-[#D4AF37]/15 text-left">
              <span className="text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest shrink-0 pt-0.5 w-24">Project</span>
              <span className="text-white/80 text-sm leading-relaxed">Modern Police Memorial Museum — First Batch 1990</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#060E1F]/70 border border-[#D4AF37]/15 text-left">
              <span className="text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest shrink-0 pt-0.5 w-24">Stack</span>
              <span className="text-white/80 text-sm leading-relaxed">Next.js 16 · Sanity CMS · Tailwind CSS · Framer Motion</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#060E1F]/70 border border-[#D4AF37]/15 text-left">
              <span className="text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest shrink-0 pt-0.5 w-24">Year</span>
              <span className="text-white/80 text-sm leading-relaxed">2025 – 2026</span>
            </div>
          </div>

          {/* Gold divider */}
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent rounded-full" />

          <p className="text-[#94A59B] text-[11px] font-mono">
            This page is intentionally hidden from search engines.
          </p>
        </div>

        {/* Gold bottom accent */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>
    </main>
  );
}
