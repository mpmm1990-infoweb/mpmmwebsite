"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Feather } from "lucide-react";
import { urlFor } from "@/sanity/image";

export interface KothaOGathaItem {
  _id: string;
  name?: string;
  nameBn?: string;
  designation?: string;
  designationBn?: string;
  category?: string;
  title?: string;
  content?: string;
  photo?: { asset: { _ref: string } };
}

interface KothaOGathaDetailModalProps {
  item: KothaOGathaItem | null;
  onClose: () => void;
}

const categoryLabels: Record<string, { bn: string; en: string }> = {
  poem: { bn: "কবিতা", en: "Poem" },
  story: { bn: "গল্প", en: "Story" },
  reminiscence: { bn: "স্মৃতিগাথা", en: "Reminiscence" },
  other: { bn: "অন্যান্য", en: "Other" },
};

export default function KothaOGathaDetailModal({
  item,
  onClose,
}: KothaOGathaDetailModalProps) {
  if (!item) return null;

  const category = categoryLabels[item.category || "story"] || {
    bn: "গল্প/কবিতা",
    en: "Story/Poem",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#060E1F]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="glass-panel rounded-3xl w-full max-w-2xl my-auto overflow-hidden shadow-2xl border border-[#D4AF37]/35 bg-[#0B1B3D]/95 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="glass-panel-dark bg-[#060E1F] p-5 sm:p-7 relative border-b border-[#D4AF37]/20 shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-[#D4AF37] transition-colors p-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 border border-white/10"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-[#006a4e] text-white border border-white/20 font-heading">
                <span className="lang-bn-only">{category.bn}</span>
                <span className="lang-en-only">{category.en}</span>
              </span>
            </div>

            {/* Unilingual Title — Rendered exactly as the author wrote it */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading leading-snug pr-8">
              {item.title}
            </h2>

            {/* Author Meta — Bilingual */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
              {item.photo?.asset ? (
                <div className="w-11 h-11 rounded-full overflow-hidden relative border border-[#D4AF37]/50 shrink-0">
                  <Image
                    src={urlFor(item.photo).width(120).height(120).url()}
                    alt={item.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold font-heading text-lg shrink-0">
                  <User size={20} />
                </div>
              )}
              <div>
                <h4 className="text-white font-bold text-base font-heading">
                  <span className="lang-bn-only">{item.nameBn || item.name}</span>
                  <span className="lang-en-only">{item.name || item.nameBn}</span>
                </h4>
                <p className="text-[#D4AF37] text-xs font-heading font-medium">
                  <span className="lang-bn-only">{item.designationBn || item.designation}</span>
                  <span className="lang-en-only">{item.designation || item.designationBn}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Full Content Body — Unilingual single field */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-white/95 leading-relaxed font-heading whitespace-pre-wrap text-base sm:text-lg">
            {item.content}
          </div>

          {/* Footer Accent */}
          <div className="p-4 bg-[#060E1F]/90 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#C2CFC8] shrink-0 font-heading">
            <span className="flex items-center gap-1.5">
              <Feather size={14} className="text-[#D4AF37]" />
              <span className="lang-bn-only">আধুনিক পুলিশ স্মৃতি জাদুঘর — কথা ও গাথা</span>
              <span className="lang-en-only">Modern Police Museum — Words & Verses</span>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-xl font-bold transition-all"
            >
              <span className="lang-bn-only">বন্ধ করুন</span>
              <span className="lang-en-only">Close Window</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
