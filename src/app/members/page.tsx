import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { KOTHA_O_GATHA_QUERY } from "@/lib/queries";
import KothaOGathaMarquee from "@/components/KothaOGathaMarquee";
import { KothaOGathaItem } from "@/components/KothaOGathaDetailModal";
import MembersClient from "./MembersClient";

export const metadata: Metadata = {
  title: "Words & Verses (Kotha & Gatha) — Modern Police Memorial Museum",
  description:
    "Explore poems, stories, and literary works contributed by officers of the Modern Police First Batch of 1990.",
};

export default async function MembersPage() {
  let items: KothaOGathaItem[] = [];

  try {
    items = await sanityFetch<KothaOGathaItem[]>(KOTHA_O_GATHA_QUERY, {}, ["kothaOGatha"]);
  } catch {
    // CMS not configured — fallback handles UI
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-28 sm:py-36 md:py-40 bg-navy-gradient overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-md">
            <span className="lang-bn-only">কথা ও গাথা (সাহিত্য ও স্মৃতিকথা)</span>
            <span className="lang-en-only">Words & Verses (Literary Archive)</span>
          </h1>
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Infinite Kotha & Gatha Marquee Section */}
      <section className="py-12 sm:py-16 heritage-pattern w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading gold-underline pb-3">
              <span className="lang-bn-only">গল্প, কবিতা ও স্মৃতিকথা</span>
              <span className="lang-en-only">Poems, Stories & Verses</span>
            </h2>
          </div>

          <KothaOGathaMarquee items={items} />
        </div>
      </section>

      {/* Kotha & Gatha Filterable Directory */}
      <section className="py-12 sm:py-16 md:py-20 heritage-pattern w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MembersClient items={items} />
        </div>
      </section>
    </div>
  );
}
