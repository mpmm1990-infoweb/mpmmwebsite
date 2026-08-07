import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

interface HistoryData {
  title?: string;
  titleBn?: string;
  excerpt?: string;
  excerptBn?: string;
  coverImage?: { asset: { _ref: string } };
}

export default function HistoryPreview({
  data,
}: {
  data: HistoryData | null;
}) {
  const titleBn = data?.titleBn || "আমাদের ইতিহাস";
  const title = data?.title || "Our History";
  const excerptBn =
    data?.excerptBn ||
    "১৯৯০ সালের আধুনিক পুলিশ প্রথম ব্যাচ বাংলাদেশের আইন শৃঙ্খলা রক্ষায় এক বিশেষ স্থান দখল করে আছে। তাহাদের নিষ্ঠা ও ত্যাগের গাথা আজ বহমান।";
  const excerpt =
    data?.excerpt ||
    "The Modern Police First Batch of 1990 holds a special place in the history of Bangladesh's law enforcement. Their journey of dedication and service continues to inspire generations.";

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={title}
          titleBn={titleBn}
        />

        <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/20 shadow-2xl mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-heritage aspect-[4/3] border border-[#D4AF37]/30 group">
                {data?.coverImage?.asset ? (
                  <Image
                    src={urlFor(data.coverImage).width(800).height(600).url()}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] flex items-center justify-center">
                    <span className="text-[#D4AF37]/30 font-heading text-6xl sm:text-7xl font-bold">
                      1990
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E1F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 glass-badge px-4 py-1.5 rounded-full text-xs font-bold font-heading border border-[#D4AF37]/50 text-[#D4AF37]">
                  প্রথম ব্যাচ ১৯৯০
                </div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <p className="text-white/95 text-base sm:text-lg md:text-xl leading-relaxed font-heading lang-bn-only font-medium">
                  {excerptBn}
                </p>
                <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed lang-en-only">
                  {excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href="/history"
                    className="inline-flex items-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-2xl font-bold font-heading text-sm sm:text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 group border border-white/20"
                  >
                    <span className="lang-bn-only">সম্পূর্ণ ইতিহাস পড়ুন</span>
                    <span className="lang-en-only">Read Full History</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1.5 transition-transform shrink-0"
                    />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
