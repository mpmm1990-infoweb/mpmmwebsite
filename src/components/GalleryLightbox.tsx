"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";

export interface GalleryLightboxItem {
  _id: string;
  image: {
    asset: { _ref: string };
  };
  caption?: string;
  captionBn?: string;
  year?: string;
  category?: string;
}

interface GalleryLightboxProps {
  items: GalleryLightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#060E1F]/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 select-none"
          onClick={onClose}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 sm:top-6 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            {/* Counter */}
            <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/30 text-xs sm:text-sm font-semibold text-[#D4AF37] pointer-events-auto">
              <span className="lang-en-only">
                {currentIndex + 1} / {items.length}
              </span>
              <span className="lang-bn-only">
                {(currentIndex + 1).toLocaleString("bn-BD")} / {items.length.toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Close Button */}
            <button
              className="text-white/80 hover:text-[#D4AF37] transition-colors bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center pointer-events-auto shadow-lg"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Prev Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-[#D4AF37] bg-black/60 hover:bg-black/90 p-2.5 sm:p-3 rounded-full border border-[#D4AF37]/30 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Navigation Next Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-[#D4AF37] bg-black/60 hover:bg-black/90 p-2.5 sm:p-3 rounded-full border border-[#D4AF37]/30 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Main Modal Image Container */}
          <motion.div
            key={currentItem._id}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-w-5xl w-full max-h-[88vh] relative glass-panel-dark rounded-2xl sm:rounded-3xl p-2 sm:p-4 border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.image?.asset && (
              <div className="relative w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={urlFor(currentItem.image)
                    .width(1400)
                    .quality(92)
                    .url()}
                  alt={currentItem.captionBn || currentItem.caption || "Gallery photo"}
                  width={1400}
                  height={900}
                  priority
                  className="max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-md"
                />
              </div>
            )}

            {/* Captions and metadata footer */}
            {(currentItem.caption || currentItem.captionBn || currentItem.year) && (
              <div className="w-full mt-3 px-3 py-2.5 bg-[#060E1F]/90 backdrop-blur-md rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-center sm:text-left">
                <p className="text-white font-bold text-sm sm:text-base font-heading">
                  <span className="lang-bn-only">{currentItem.captionBn || currentItem.caption}</span>
                  <span className="lang-en-only">{currentItem.caption || currentItem.captionBn}</span>
                </p>
                {currentItem.year && (
                  <span className="text-[#D4AF37] text-xs sm:text-sm font-semibold font-heading shrink-0 px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    <span className="lang-bn-only">সাল: {currentItem.year}</span>
                    <span className="lang-en-only">Year: {currentItem.year}</span>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
