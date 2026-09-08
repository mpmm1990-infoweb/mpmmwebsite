"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryLightbox, {
  GalleryLightboxItem,
} from "@/components/GalleryLightbox";

type GalleryTab = "90s_photos" | "group_activities" | "social_works";

interface GalleryPreviewProps {
  data: unknown[];
}

const TABS: { value: GalleryTab; labelBn: string; labelEn: string }[] = [
  {
    value: "90s_photos",
    labelBn: "৯০-এর স্মৃতি অ্যালবাম",
    labelEn: "90s Photos",
  },
  {
    value: "group_activities",
    labelBn: "গ্রুপ অ্যাক্টিভিটিস",
    labelEn: "Group Activities",
  },
  {
    value: "social_works",
    labelBn: "সামাজিক কার্যক্রম",
    labelEn: "Social Works",
  },
];

export default function GalleryPreview({ data }: GalleryPreviewProps) {
  const images = (data || []) as GalleryLightboxItem[];
  const [activeTab, setActiveTab] = useState<GalleryTab>("90s_photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter based on selected category tab — exact match only
  const filteredImages = images.filter(
    (img) => img.category === activeTab
  );

  // Strict 6-item limit for homepage preview
  const displayImages = filteredImages.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Gallery" titleBn="গ্যালারি" />

        {/* 3-Slot Segmented Tab Switcher (Pill Style) */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#060E1F]/90 border border-[#D4AF37]/30 backdrop-blur-xl shadow-xl gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setLightboxIndex(null);
                }}
                className={`px-3 sm:px-5 md:px-7 py-2.5 rounded-full text-[11px] sm:text-sm md:text-base font-bold transition-all duration-300 font-heading whitespace-nowrap ${
                  activeTab === tab.value
                    ? "bg-gradient-to-r from-[#006a4e] to-[#008764] text-white shadow-[0_0_15px_rgba(0,106,78,0.6)] border border-[#D4AF37]/60"
                    : "text-[#C2CFC8] hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="lang-bn-only">{tab.labelBn}</span>
                <span className="lang-en-only">{tab.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Strict 6-Item Masonry Layout — 2 or 3 Columns */}
        {displayImages.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-2 sm:gap-4 md:gap-5 mt-6">
            {displayImages.map((item, index) => (
              <ScrollReveal
                key={item._id}
                delay={index * 0.05}
                duration={0.4}
                className="mb-2 sm:mb-4 md:mb-5 break-inside-avoid"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full rounded-md sm:rounded-xl overflow-hidden cursor-pointer group glass-panel border border-[#D4AF37]/30 shadow-md"
                  onClick={() => setLightboxIndex(index)}
                >
                  {item.image?.asset && (
                    <img
                      src={urlFor(item.image)
                        .width(600)
                        .quality(85)
                        .auto("format")
                        .url()}
                      alt={item.captionBn || item.caption || "Gallery image"}
                      loading="lazy"
                      className="w-full h-auto block rounded-md sm:rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#060E1F]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3 md:p-4">
                    <div className="w-full">
                      {(item.caption || item.captionBn) && (
                        <p className="text-white text-[11px] sm:text-xs md:text-sm font-bold font-heading line-clamp-2 leading-snug">
                          <span className="lang-bn-only">
                            {item.captionBn || item.caption}
                          </span>
                          <span className="lang-en-only">
                            {item.caption || item.captionBn}
                          </span>
                        </p>
                      )}
                      {item.year && (
                        <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold font-heading mt-0.5">
                          {item.year}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 glass-panel rounded-3xl p-6 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
            <ImageIcon size={48} className="text-[#D4AF37] mx-auto mb-3" />
            <p className="text-white font-heading text-base sm:text-lg font-medium">
              <span className="lang-bn-only">
                এই ক্যাটাগরিতে এখনো কোনো ছবি যোগ করা হয়নি।
              </span>
              <span className="lang-en-only">
                No photos added to this category yet.
              </span>
            </p>
          </div>
        )}

        {/* View More Button — links to matching gallery tab */}
        <ScrollReveal className="text-center mt-10 sm:mt-14">
          <Link
            href={`/gallery?tab=${activeTab}`}
            className="inline-flex items-center gap-2.5 min-h-[48px] px-8 py-3.5 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-sm sm:text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 group border border-white/20"
          >
            <span className="font-heading lang-bn-only">আরও ছবি দেখুন</span>
            <span className="lang-en-only">View More Photos</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform shrink-0"
            />
          </Link>
        </ScrollReveal>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={displayImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
