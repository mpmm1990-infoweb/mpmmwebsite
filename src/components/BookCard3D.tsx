"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import { ShoppingCart } from "lucide-react";

interface BookCard3DProps {
  title: string;
  titleBn?: string;
  slug: string;
  coverImage?: {
    asset: { _ref: string };
  };
  price?: number;
  isFree?: boolean;
  author?: string;
}

export default function BookCard3D({
  title,
  titleBn,
  slug,
  coverImage,
  price = 0,
  isFree = false,
  author,
}: BookCard3DProps) {
  return (
    <Link href={`/books/${slug}`} className="block perspective-container group h-full">
      <motion.div
        className="relative glass-panel rounded-2xl overflow-hidden shadow-heritage border border-[#D4AF37]/25 flex flex-col h-full"
        whileHover={{
          rotateY: -6,
          rotateX: 4,
          scale: 1.04,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cover Image (No floating badge) */}
        <div className="relative aspect-[3/4] bg-[#060E1F]/60 overflow-hidden shrink-0">
          {coverImage?.asset ? (
            <Image
              src={urlFor(coverImage).width(400).height(533).url()}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] flex items-center justify-center p-6 text-center">
              <span className="text-white font-heading text-lg font-bold">
                <span className="lang-bn-only">{titleBn || title}</span>
                <span className="lang-en-only">{title || titleBn}</span>
              </span>
            </div>
          )}

          {/* Glass Hover overlay */}
          <div className="absolute inset-0 bg-[#060E1F]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white font-bold bg-[#f42a41] hover:bg-[#d81e34] px-5 py-2.5 rounded-full shadow-lg border border-white/30 transform group-hover:scale-105 transition-transform font-heading text-xs sm:text-sm">
              <ShoppingCart size={16} />
              <span className="lang-bn-only">বিবরণ দেখুন</span>
              <span className="lang-en-only">View Details</span>
            </div>
          </div>
        </div>

        {/* Text Info & Rokomari-Style Bottom Price */}
        <div className="p-4 bg-[#060E1F]/90 backdrop-blur-md flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-heading font-bold text-white text-sm sm:text-base line-clamp-2 leading-snug">
              <span className="lang-bn-only">{titleBn || title}</span>
              <span className="lang-en-only">{title || titleBn}</span>
            </h3>
            {author && (
              <p className="text-[#C2CFC8] text-xs mt-1.5 font-heading truncate">
                <span className="lang-bn-only">{author}</span>
                <span className="lang-en-only">{author}</span>
              </p>
            )}
          </div>

          {/* Rokomari Style Price Display at Bottom */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
            {isFree || price === 0 ? (
              <span className="font-heading font-bold text-xs sm:text-sm text-[#006a4e]">
                <span className="lang-bn-only">ফ্রি</span>
                <span className="lang-en-only">Free</span>
              </span>
            ) : (
              <span className="font-heading font-bold text-xs sm:text-sm text-[#D4AF37]">
                <span className="lang-bn-only">৳{price}</span>
                <span className="lang-en-only">TK. {price}</span>
              </span>
            )}
          </div>
        </div>

        {/* Metallic Gold bottom accent */}
        <div className="h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#E8C85A]" />
      </motion.div>
    </Link>
  );
}
