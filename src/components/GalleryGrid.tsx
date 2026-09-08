"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "./ScrollReveal";
import GalleryLightbox, { GalleryLightboxItem } from "./GalleryLightbox";

interface GalleryGridProps {
  images: GalleryLightboxItem[];
  showFilter?: boolean;
}

const categories = [
  { value: "all", labelBn: "সকল", labelEn: "All" },
  { value: "90s", labelBn: "৯০-এর অ্যালবাম", labelEn: "90s Vintage Album" },
  { value: "historic", labelBn: "ঐতিহাসিক গ্যালারি", labelEn: "Historic Gallery" },
];

export default function GalleryGrid({
  images,
  showFilter = false,
}: GalleryGridProps) {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => {
          if (filter === "historic") {
            return img.category === "historic" || img.category === "historical";
          }
          if (filter === "90s") {
            return img.category === "90s" || !img.category || (img.category !== "historic" && img.category !== "historical");
          }
          return img.category === filter;
        });

  return (
    <>
      {/* Filters */}
      {showFilter && (
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 font-heading ${
                filter === cat.value
                  ? "bg-[#f42a41] text-white shadow-[0_8px_24px_rgba(244,42,65,0.35)] border border-white/30"
                  : "glass-panel text-white/80 hover:bg-white/15 border border-[#D4AF37]/25"
              }`}
            >
              <span className="lang-bn-only">{cat.labelBn}</span>
              <span className="lang-en-only">{cat.labelEn}</span>
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
        {filtered.map((item, index) => (
          <ScrollReveal
            key={item._id}
            delay={Math.min(index * 0.04, 0.4)}
            duration={0.4}
          >
            <motion.div
              className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer group glass-panel border border-[#D4AF37]/20 shadow-heritage"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightboxIndex(index)}
            >
              {item.image?.asset && (
                <Image
                  src={urlFor(item.image)
                    .width(600)
                    .height(600)
                    .quality(85)
                    .url()}
                  alt={item.captionBn || item.caption || "Gallery image"}
                  fill
                  className="aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060E1F]/90 via-[#060E1F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  {(item.caption || item.captionBn) && (
                    <p className="text-white text-xs sm:text-sm font-bold font-heading leading-snug line-clamp-2">
                      <span className="lang-bn-only">{item.captionBn || item.caption}</span>
                      <span className="lang-en-only">{item.caption || item.captionBn}</span>
                    </p>
                  )}
                  {item.year && (
                    <p className="text-[#D4AF37] text-[11px] sm:text-xs mt-1 font-bold font-heading uppercase tracking-wider">
                      {item.year}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal with Next/Previous Controls */}
      <GalleryLightbox
        items={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
