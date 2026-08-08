import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import KothaOGathaMarquee from "@/components/KothaOGathaMarquee";
import { KothaOGathaItem } from "@/components/KothaOGathaDetailModal";

export default function MembersPreview({ data }: { data: unknown[] }) {
  const items = (data || []) as KothaOGathaItem[];

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Words & Verses (Kotha & Gatha)"
          titleBn="কথা ও গাথা (সাহিত্য ও স্মৃতিকথা)"
        />

        {/* Infinite Marquee Slider with Detail & Submission Modals */}
        <div className="mt-8">
          <KothaOGathaMarquee items={items} />
        </div>

        {/* View All Kotha & Gatha Page Link */}
        <ScrollReveal className="text-center mt-12 sm:mt-14">
          <Link
            href="/words-and-verses"
            className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 bg-white/10 hover:bg-[#006a4e] text-white rounded-full font-bold font-heading text-base hover:shadow-lg hover:scale-105 transition-all duration-300 group border border-[#D4AF37]/30"
          >
            <span className="font-heading lang-bn-only">সকল কবিতা ও গল্প দেখুন</span>
            <span className="lang-en-only">View All Words & Verses</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1.5 transition-transform shrink-0"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
