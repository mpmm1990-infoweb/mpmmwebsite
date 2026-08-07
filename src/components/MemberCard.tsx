"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";

interface MemberCardProps {
  name: string;
  nameBn?: string;
  photo?: {
    asset: { _ref: string };
  };
  rank?: string;
  rankBn?: string;
  isDeceased?: boolean;
}

export default function MemberCard({
  name,
  nameBn,
  photo,
  rank,
  rankBn,
  isDeceased = false,
}: MemberCardProps) {
  return (
    <motion.div
      className="shrink-0 w-48 sm:w-56 md:w-60 group"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="glass-panel rounded-2xl overflow-hidden shadow-heritage border border-[#D4AF37]/20">
        {/* Photo */}
        <div className="relative aspect-[3/4] bg-[#060E1F]/60 overflow-hidden">
          {photo?.asset ? (
            <Image
              src={urlFor(photo).width(240).height(320).url()}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 192px, 240px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] flex items-center justify-center">
              <span className="text-[#D4AF37]/30 font-heading text-4xl sm:text-5xl font-bold">
                {(nameBn || name).charAt(0)}
              </span>
            </div>
          )}

          {/* Deceased Ribbon */}
          {isDeceased && (
            <div className="absolute top-3 left-0 bg-[#0B1B3D] text-[#D4AF37] text-[10px] tracking-widest uppercase px-3 py-1 font-bold shadow-md border-r border-y border-[#D4AF37]/40">
              In Memoriam
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#060E1F]/80 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="p-3.5 sm:p-4 text-center bg-[#060E1F]/90 backdrop-blur-md">
          <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug line-clamp-2">
            {nameBn || name}
          </h3>
          {nameBn && (
            <p className="text-[#C2CFC8] text-xs mt-0.5 line-clamp-1">{name}</p>
          )}
          {rankBn ? (
            <p className="text-[#D4AF37] text-xs font-bold mt-2 font-heading tracking-wide line-clamp-1">
              {rankBn}
            </p>
          ) : rank ? (
            <p className="text-[#D4AF37] text-xs font-bold mt-2 uppercase tracking-wider line-clamp-1">
              {rank}
            </p>
          ) : null}
        </div>

        {/* Metallic Gold bottom accent */}
        <div className="h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#E8C85A]" />
      </div>
    </motion.div>
  );
}
