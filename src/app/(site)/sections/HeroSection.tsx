"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldAlert } from "lucide-react";
import { urlFor } from "@/sanity/image";

interface HeroData {
  title?: string;
  titleBn?: string;
  subtitle?: string;
  subtitleBn?: string;
  backgroundImage?: { asset: { _ref: string } };
  bgImages?: Array<{ asset: { _ref: string } }>;
  badgeImage?: { asset: { _ref: string } };
  ctaText?: string;
  ctaTextBn?: string;
  ctaLink?: string;
}

// Fallback background images if CMS images aren't uploaded yet
const fallbackImages = [
  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80",
];

export default function HeroSection({ data }: { data: HeroData | null }) {
  const title = data?.title || "Modern Police Memorial Museum";
  const titleBn = data?.titleBn || "আধুনিক পুলিশ স্মৃতি জাদুঘর";
  const subtitle = data?.subtitle || "First Batch — 1990";
  const subtitleBn = data?.subtitleBn || "প্রথম ব্যাচ — ১৯৯০";
  const ctaText = data?.ctaText || "Explore Our History";
  const ctaTextBn = data?.ctaTextBn || "আমাদের ঐতিহ্য উন্মোচন করুন";
  const ctaLink = data?.ctaLink || "/history";

  // Build images array
  const rawBgImages = data?.bgImages && data.bgImages.length > 0
    ? data.bgImages
    : data?.backgroundImage
    ? [data.backgroundImage]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slideshow every 6 seconds if multiple images exist
  useEffect(() => {
    const totalCount = rawBgImages.length > 0 ? rawBgImages.length : fallbackImages.length;
    if (totalCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCount);
    }, 6000);

    return () => clearInterval(interval);
  }, [rawBgImages.length]);

  return (
    <section className="relative min-h-screen w-full max-w-full overflow-x-hidden flex items-center justify-center">
      {/* Background Image Cross-Fade Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {rawBgImages.length > 0 ? (
              <Image
                src={urlFor(rawBgImages[currentIndex]).width(1920).quality(85).url()}
                alt=""
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={fallbackImages[currentIndex % fallbackImages.length]}
                alt=""
                fill
                unoptimized
                className="object-cover opacity-40"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark Overlay Gradient: Flag Green (#006a4e) to Deep Navy (#0B1B3D) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95 pointer-events-none" />

      {/* Subdued Heritage Pattern */}
      <div className="absolute inset-0 z-[1] heritage-pattern opacity-50 pointer-events-none" />

      {/* Content Box with Backdrop Blur and Dark Shielding for Crisp Readability */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center pt-24 pb-16 w-full">
        
        <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl border border-[#D4AF37]/30 shadow-2xl backdrop-blur-md bg-[#060E1F]/70 max-w-3xl w-full flex flex-col items-center">
          
          {/* Badge / Emblem */}
          {data?.badgeImage?.asset ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 relative shrink-0"
            >
              <div className="p-1 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <Image
                  src={urlFor(data.badgeImage).width(160).height(160).url()}
                  alt="Memorial Emblem"
                  width={140}
                  height={140}
                  className="rounded-full border-2 border-[#D4AF37]/80 object-cover w-24 h-24 sm:w-32 sm:h-32"
                  priority
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-5 inline-flex p-3 sm:p-4 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0"
            >
              <ShieldAlert size={40} className="text-[#D4AF37] sm:w-12 sm:h-12" />
            </motion.div>
          )}

          {/* Gold Divider */}
          <div className="w-24 sm:w-32 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-5 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />

          {/* Title: STRICT SINGLE LANGUAGE BASED ON LOCALE */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-normal drop-shadow-md">
            <span className="lang-bn-only">{titleBn}</span>
            <span className="lang-en-only">{title}</span>
          </h1>

          {/* Subtitle: STRICT SINGLE LANGUAGE BASED ON LOCALE */}
          <p className="text-[#D4AF37] font-bold text-base sm:text-xl md:text-2xl mt-3 font-heading tracking-wide uppercase drop-shadow-sm">
            <span className="lang-bn-only">{subtitleBn}</span>
            <span className="lang-en-only">{subtitle}</span>
          </p>

          {/* CTA Button: STRICT SINGLE LANGUAGE BASED ON LOCALE */}
          <div className="mt-8">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center gap-3 min-h-[50px] px-8 py-3.5 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base tracking-wide shadow-[0_8px_24px_rgba(244,42,65,0.4)] hover:scale-105 transition-all duration-300 group border border-white/20"
            >
              <span className="lang-bn-only">{ctaTextBn}</span>
              <span className="lang-en-only">{ctaText}</span>
              <ChevronDown
                size={20}
                className="group-hover:translate-y-1 transition-transform duration-300 text-white shrink-0"
              />
            </Link>
          </div>

          {/* Slideshow Indicators */}
          {(rawBgImages.length > 1 || fallbackImages.length > 1) && (
            <div className="flex items-center gap-2 mt-6">
              {(rawBgImages.length > 0 ? rawBgImages : fallbackImages).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-8 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 sm:w-6 h-9 sm:h-10 border-2 border-[#D4AF37]/60 rounded-full flex items-start justify-center p-1 sm:p-1.5 backdrop-blur-sm bg-black/20">
          <motion.div
            className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
