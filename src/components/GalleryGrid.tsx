"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "./ScrollReveal";

interface GalleryItem {
  _id: string;
  image: {
    asset: { _ref: string };
  };
  caption?: string;
  captionBn?: string;
  year?: string;
  category?: string;
}

interface GalleryGridProps {
  images: GalleryItem[];
  showFilter?: boolean;
}

const categories = [
  { value: "all", labelBn: "সকল", labelEn: "All" },
  { value: "events", labelBn: "অনুষ্ঠান", labelEn: "Events" },
  { value: "training", labelBn: "প্রশিক্ষণ", labelEn: "Training" },
  { value: "reunions", labelBn: "পুনর্মিলনী", labelEn: "Reunions" },
  { value: "ceremonies", labelBn: "প্যারেড", labelEn: "Ceremonies" },
  { value: "historical", labelBn: "ঐতিহাসিক", labelEn: "Historical" },
  { value: "other", labelBn: "অন্যান্য", labelEn: "Other" },
];

export default function GalleryGrid({
  images,
  showFilter = false,
}: GalleryGridProps) {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <>
      {/* Filters */}
      {showFilter && (
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 sm:px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 font-heading ${
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
      <div className="gallery-grid">
        {filtered.map((item, index) => (
          <ScrollReveal
            key={item._id}
            delay={index * 0.05}
            duration={0.5}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden cursor-pointer group glass-panel border border-[#D4AF37]/20 shadow-heritage"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(item)}
            >
              {item.image?.asset && (
                <Image
                  src={urlFor(item.image)
                    .width(600)
                    .quality(85)
                    .url()}
                  alt={item.caption || "Gallery image"}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#060E1F]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <p className="text-white text-base font-bold font-heading leading-snug">
                    <span className="lang-bn-only">{item.captionBn || item.caption}</span>
                    <span className="lang-en-only">{item.caption || item.captionBn}</span>
                  </p>
                  {item.year && (
                    <p className="text-[#D4AF37] text-xs mt-1 font-bold font-heading uppercase tracking-widest">{item.year}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#060E1F]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-[#D4AF37] transition-colors z-20 bg-white/10 p-2 rounded-full border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] relative glass-panel-dark rounded-3xl p-3 border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.image?.asset && (
                <Image
                  src={urlFor(lightbox.image)
                    .width(1200)
                    .quality(90)
                    .url()}
                  alt={lightbox.captionBn || lightbox.caption || "Gallery image"}
                  width={1200}
                  height={800}
                  className="max-h-[75vh] w-auto rounded-2xl object-contain mx-auto"
                />
              )}

              {(lightbox.caption || lightbox.captionBn || lightbox.year) && (
                <div className="p-4 bg-[#060E1F]/95 backdrop-blur-md rounded-b-2xl border-t border-white/10 mt-2">
                  <p className="text-white font-bold text-lg font-heading">
                    <span className="lang-bn-only">{lightbox.captionBn || lightbox.caption}</span>
                    <span className="lang-en-only">{lightbox.caption || lightbox.captionBn}</span>
                  </p>
                  {lightbox.year && (
                    <p className="text-[#D4AF37] text-sm mt-1 font-bold font-heading">{lightbox.year}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
