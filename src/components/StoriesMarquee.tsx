"use client";

import { useState } from "react";
import Image from "next/image";
import { Feather, Quote, PlusCircle } from "lucide-react";
import { urlFor } from "@/sanity/image";
import ShareStoryModal from "./ShareStoryModal";

export interface StoryData {
  _id: string;
  name?: string;
  nameBn?: string;
  designation?: string;
  designationBn?: string;
  content?: string;
  contentBn?: string;
  photo?: { asset: { _ref: string } };
}

interface StoriesMarqueeProps {
  stories: StoryData[];
}

// Sample fallback stories if CMS has no stories uploaded yet
const fallbackStories: StoryData[] = [
  {
    _id: "s1",
    name: "A. K. M. Jahangir Hossain",
    nameBn: "এ. কে. এম. জাহাঙ্গীর হোসেন",
    designation: "Additional DIG (Retd.)",
    designationBn: "অতিরিক্ত ডিআইজি (অবসরপ্রাপ্ত)",
    content:
      " In 1990, joining the Modern Police First Batch was the greatest honor of my life. Serving our nation during critical transitions built lifelong brotherhood.",
    contentBn:
      "১৯৯০ সালে আধুনিক পুলিশের প্রথম ব্যাচে যোগদান করা আমার জীবনের অন্যতম গর্বের বিষয় ছিল। দেশের আইন শৃঙ্খলা রক্ষায় সেদিনের শপথ আজও বুকে লালন করি।",
  },
  {
    _id: "s2",
    name: "Mohammad Shamsul Haque",
    nameBn: "মোহাম্মদ শামসুল হক",
    designation: "Superintendent of Police",
    designationBn: "পুলিশ সুপার (অবসরপ্রাপ্ত)",
    content:
      "Through decades of service across multiple districts, our batch maintained strict integrity, discipline, and commitment to justice.",
    contentBn:
      "সুদীর্ঘ কর্মজীবনে একাধিক জেলায় দায়িত্ব পালনকালে আমাদের ১৯৯০ ব্যাচের সততা, শৃঙ্খলা ও দেশপ্রেম সহকর্মীদের জন্য দৃষ্টান্ত হয়ে আছে।",
  },
  {
    _id: "s3",
    name: "Rafiqul Islam",
    nameBn: "রফিকুল ইসলাম",
    designation: "Commandant (Retd.)",
    designationBn: "কমান্ড্যান্ট (অবসরপ্রাপ্ত)",
    content:
      "The rigorous training of 1990 forged our spirit. This memorial museum ensures that future generations remember our shared sacrifice.",
    contentBn:
      "১৯৯০ সালের কঠোর প্রশিক্ষণ আমাদের ইস্পাতদৃঢ় মনোবল গড়ে দিয়েছিল। এই স্মারক জাদুঘর আমাদের ভবিষ্যৎ প্রজন্মকে অনুপ্রাণিত করবে।",
  },
  {
    _id: "s4",
    name: "Syed Abdul Quddus",
    nameBn: "সৈয়দ আব্দুল কুদ্দুস",
    designation: "Deputy Commissioner",
    designationBn: "উপ-পুলিশ কমিশনার",
    content:
      "Every hardship we faced in the field was overcome by our unity. First Batch 1990 will forever remain a symbol of excellence.",
    contentBn:
      "মাঠপর্যায়ের প্রতিটি চ্যালেঞ্জ আমরা একতাবদ্ধ হয়ে মোকাবেলা করেছি। ১৯৯০ ব্যাচ সবসময় পেশাদারিত্বের এক উজ্জ্বল প্রতীক।",
  },
];

export default function StoriesMarquee({ stories }: StoriesMarqueeProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const displayStories = stories && stories.length > 0 ? stories : fallbackStories;
  
  // Duplicate array to guarantee seamless infinite looping
  const marqueeList = [...displayStories, ...displayStories, ...displayStories];

  return (
    <div className="w-full relative overflow-hidden py-4">
      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Left/Right Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#060E1F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#060E1F] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item._id}-${idx}`}
              className="w-72 sm:w-80 md:w-96 shrink-0 glass-panel glass-panel-hover p-6 rounded-3xl border border-[#D4AF37]/20 shadow-heritage flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote size={28} className="text-[#D4AF37]/40" />
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#006a4e]/40 border border-[#006a4e] text-white">
                    <span className="lang-bn-only">জীবনের গল্প</span>
                    <span className="lang-en-only">Officer Journey</span>
                  </span>
                </div>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-4 font-heading italic">
                  &ldquo;<span className="lang-bn-only">{item.contentBn || item.content}</span>
                  <span className="lang-en-only">{item.content || item.contentBn}</span>&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                {item.photo?.asset ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden relative border border-[#D4AF37]/50 shrink-0">
                    <Image
                      src={urlFor(item.photo).width(100).height(100).url()}
                      alt={item.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold font-heading text-lg shrink-0">
                    {(item.nameBn || item.name || "?").charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-sm sm:text-base font-heading truncate">
                    <span className="lang-bn-only">{item.nameBn || item.name}</span>
                    <span className="lang-en-only">{item.name || item.nameBn}</span>
                  </h4>
                  <p className="text-[#D4AF37] text-xs font-heading font-medium truncate">
                    <span className="lang-bn-only">{item.designationBn || item.designation}</span>
                    <span className="lang-en-only">{item.designation || item.designationBn}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Story CTA Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 border border-white/20"
        >
          <Feather size={20} className="shrink-0" />
          <span className="lang-bn-only">আপনার গল্প শেয়ার করুন</span>
          <span className="lang-en-only">Share Your Story</span>
          <PlusCircle size={18} className="shrink-0" />
        </button>
      </div>

      {/* Modal Integration */}
      <ShareStoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
