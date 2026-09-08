"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryLightbox, {
  GalleryLightboxItem,
} from "@/components/GalleryLightbox";

interface GalleryClientProps {
  images: GalleryLightboxItem[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  // Read initial tab from URL query param; default to '90s'
  const [activeTab, setActiveTab] = useState<"90s" | "historic">(() => {
    return tabParam === "historic" ? "historic" : "90s";
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync tab with URL if searchParams change
  useEffect(() => {
    if (tabParam === "historic" || tabParam === "90s") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Tab change handler with URL sync
  const handleTabChange = (tab: "90s" | "historic") => {
    setActiveTab(tab);
    setLightboxIndex(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/gallery?tab=${tab}`);
    }
  };

  // Filter based on selected category
  const filteredImages = images.filter((img) => {
    if (activeTab === "historic") {
      return img.category === "historic" || img.category === "historical";
    }
    return (
      img.category === "90s" ||
      !img.category ||
      (img.category !== "historic" && img.category !== "historical")
    );
  });

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex justify-center mb-10 sm:mb-14">
        <div className="inline-flex p-1.5 rounded-full bg-[#060E1F]/90 border border-[#D4AF37]/30 backdrop-blur-xl shadow-2xl">
          {/* Tab 1: 90s Vintage Album */}
          <button
            onClick={() => handleTabChange("90s")}
            className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 font-heading ${
              activeTab === "90s"
                ? "bg-gradient-to-r from-[#006a4e] to-[#008764] text-white shadow-[0_0_18px_rgba(0,106,78,0.7)] border border-[#D4AF37]/60"
                : "text-[#C2CFC8] hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="lang-bn-only">৯০-এর স্মৃতি অ্যালবাম</span>
            <span className="lang-en-only">90s Vintage Album</span>
          </button>

          {/* Tab 2: Historic Gallery */}
          <button
            onClick={() => handleTabChange("historic")}
            className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 font-heading ${
              activeTab === "historic"
                ? "bg-gradient-to-r from-[#006a4e] to-[#008764] text-white shadow-[0_0_18px_rgba(0,106,78,0.7)] border border-[#D4AF37]/60"
                : "text-[#C2CFC8] hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="lang-bn-only">ঐতিহাসিক গ্যালারি</span>
            <span className="lang-en-only">Historic Gallery</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredImages.map((item, index) => (
            <ScrollReveal
              key={item._id}
              delay={Math.min(index * 0.04, 0.4)}
              duration={0.4}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group glass-panel border border-[#D4AF37]/25 shadow-lg"
                onClick={() => setLightboxIndex(index)}
              >
                {item.image?.asset && (
                  <Image
                    src={urlFor(item.image)
                      .width(600)
                      .height(600)
                      .quality(85)
                      .url()}
                    alt={item.captionBn || item.caption || "Gallery photo"}
                    fill
                    className="aspect-square object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E1F]/90 via-[#060E1F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                  <div className="w-full">
                    {(item.caption || item.captionBn) && (
                      <p className="text-white text-xs sm:text-sm font-bold font-heading line-clamp-2 leading-snug">
                        <span className="lang-bn-only">
                          {item.captionBn || item.caption}
                        </span>
                        <span className="lang-en-only">
                          {item.caption || item.captionBn}
                        </span>
                      </p>
                    )}
                    {item.year && (
                      <p className="text-[#D4AF37] text-xs font-semibold font-heading mt-1">
                        <span className="lang-bn-only">সাল: {item.year}</span>
                        <span className="lang-en-only">Year: {item.year}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
          <ImageIcon size={56} className="text-[#D4AF37] mx-auto mb-4" />
          <p className="text-white text-lg sm:text-xl font-bold font-heading">
            <span className="lang-bn-only">
              এই ক্যাটাগরিতে এখনো কোনো ছবি যোগ করা হয়নি।
            </span>
            <span className="lang-en-only">
              No photos added to this category yet.
            </span>
          </p>
        </div>
      )}

      {/* Lightbox Modal with Next/Previous Controls */}
      <GalleryLightbox
        items={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
