import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPreview({ data }: { data: unknown[] }) {
  const images = (data || []) as Array<{
    _id: string;
    image: { asset: { _ref: string } };
    caption?: string;
    captionBn?: string;
    year?: string;
    category?: string;
  }>;

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Historical Gallery"
          titleBn="ঐতিহাসিক গ্যালারি"
        />

        {images.length > 0 ? (
          <div className="mt-8">
            <GalleryGrid images={images} />
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl p-6 sm:p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
            <ImageIcon size={56} className="text-[#D4AF37] mx-auto mb-4" />
            <p className="text-white font-heading text-lg font-medium">
              সিএমএস-এ ছবি যোগ করার পর এখানে প্রদর্শিত হবে।
            </p>
          </div>
        )}

        <ScrollReveal className="text-center mt-12 sm:mt-14">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 group border border-white/20"
          >
            <span className="font-heading lang-bn-only">সম্পূর্ণ গ্যালারি দেখুন</span>
            <span className="lang-en-only">View Full Gallery</span>
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
