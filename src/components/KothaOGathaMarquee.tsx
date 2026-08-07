"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, PenTool, PlusCircle, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import SubmitWordsModal from "./SubmitWordsModal";
import KothaOGathaDetailModal, { KothaOGathaItem } from "./KothaOGathaDetailModal";

interface KothaOGathaMarqueeProps {
  items: KothaOGathaItem[];
}

// Curated literary fallback items if CMS items aren't uploaded yet
const fallbackItems: KothaOGathaItem[] = [
  {
    _id: "kg1",
    name: "এ. কে. এম. জাহাঙ্গীর হোসেন",
    nameBn: "এ. কে. এম. জাহাঙ্গীর হোসেন",
    designation: "অতিরিক্ত ডিআইজি (অবসরপ্রাপ্ত)",
    designationBn: "অতিরিক্ত ডিআইজি (অবসরপ্রাপ্ত)",
    category: "poem",
    title: "১৯৯০ এর শপথ গাথা",
    titleBn: "১৯৯০ এর শপথ গাথা",
    contentBn: `সেদিন সকালে রাজপথে দাঁড়িয়ে
শপথ নিয়েছিলাম দেশমাতার নামে,
রক্তে আগুন, চোখে আগামীর স্বপ্ন,
আইন ও ন্যায়ের পতাকা উড়াবো প্রতিটি গ্রামে।

তিনটি দশক পার হলো আজ স্মৃতির আলোয়,
স্মৃতির জাদুঘরে ফিরে পাই পুরোনো সেই সাথী,
১৯৯০ ব্যাচ ইতিহাস হয়ে রবে,
দেশপ্রেমের নিভে যাওয়া প্রদীপে জ্বালিয়ে বাতি।`,
    content: "Our Oath of 1990 — A poem dedicated to the brave officers of 1990.",
  },
  {
    _id: "kg2",
    name: "মোহাম্মদ শামসুল হক",
    nameBn: "মোহাম্মদ শামসুল হক",
    designation: "পুলিশ সুপার (অবসরপ্রাপ্ত)",
    designationBn: "পুলিশ সুপার (অবসরপ্রাপ্ত)",
    category: "story",
    title: "কুয়াশা ঘেরা এক রাত্রির ডিউটি",
    titleBn: "কুয়াশা ঘেরা এক রাত্রির ডিউটি",
    contentBn: `১৯৯৫ সালের এক শীতের রাত। যমুনার পাড়ে ঘন কুয়াশায় ঢেকে আছে চারিদিক। আমরা খবর পেলাম সীমান্ত পার হয়ে একদল অপরাধী ঢুকছে। জীবনের ঝুঁকি নিয়ে আমরা ধাওয়া করেছিলাম। সকালে যখন অপারেশন শেষ হলো, সহকর্মীদের হাসিমুখ দেখে বুঝেছিলাম—দেশের সেবা করার চেয়ে বড় কোনো প্রাপ্তি নেই।`,
    content: "A foggy winter night's duty on the banks of Jamuna river during 1995 operations.",
  },
  {
    _id: "kg3",
    name: "রফিকুল ইসলাম",
    nameBn: "রফিকুল ইসলাম",
    designation: "কমান্ড্যান্ট (অবসরপ্রাপ্ত)",
    designationBn: "কমান্ড্যান্ট (অবসরপ্রাপ্ত)",
    category: "reminiscence",
    title: "শারদা একাদেমির সেই দিনগুলো",
    titleBn: "শারদা একাদেমির সেই দিনগুলো",
    contentBn: `শারদা সারদা একাডেমির সুবর্ণ রোদ, ভোরে বিগলের সুর আর প্যারেডের তালে তালে হাজারো বুটের শব্দ। সেখানে যে বন্ধুত্বের ভিত্তি তৈরি হয়েছিল, তা দীর্ঘ ৩৫ বছর পরও অটুট। আমরা শুধু সহকর্মী ছিলাম না, ছিলাম এক পরিবারের ভাই।`,
    content: "Reminiscence of training days at Sharda Police Academy in 1990.",
  },
  {
    _id: "kg4",
    name: "সৈয়দ আব্দুল কুদ্দুস",
    nameBn: "সৈয়দ আব্দুল কুদ্দুস",
    designation: "উপ-পুলিশ কমিশনার",
    designationBn: "উপ-পুলিশ কমিশনার",
    category: "poem",
    title: "স্মৃতির মিনার",
    titleBn: "স্মৃতির মিনার",
    contentBn: `স্যালুট জানাই তোমারে ভাই, হারিয়ে গেছ যারা,
স্মৃতির আকাশে তোমরা আজ জ্বলজ্বলে এক তারা।
ডিউটির মাঠে ক্লান্তি ভুলে দিয়েছ জীবন বলি,
তোমাদের পথ ধরেই আজও আমরা সম্মুখে চলি।`,
    content: "A memorial poem honoring the fallen heroes of 1990 First Batch.",
  },
];

const categoryBadgeStyles: Record<string, { labelBn: string; labelEn: string; color: string }> = {
  poem: { labelBn: "কবিতা", labelEn: "Poem", color: "bg-[#f42a41] text-white border-[#f42a41]" },
  story: { labelBn: "গল্প", labelEn: "Story", color: "bg-[#006a4e] text-white border-[#008764]" },
  reminiscence: { labelBn: "স্মৃতিগাথা", labelEn: "Reminiscence", color: "bg-[#0B1B3D] text-[#D4AF37] border-[#D4AF37]/50" },
  other: { labelBn: "অন্যান্য", labelEn: "Other", color: "bg-white/20 text-white border-white/30" },
};

export default function KothaOGathaMarquee({ items }: KothaOGathaMarqueeProps) {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KothaOGathaItem | null>(null);

  const displayList = items && items.length > 0 ? items : fallbackItems;
  // Duplicate list to guarantee seamless infinite marquee loop
  const marqueeList = [...displayList, ...displayList, ...displayList];

  return (
    <div className="w-full relative overflow-hidden py-4">
      {/* Infinite Horizontal Marquee Slider */}
      <div className="relative w-full overflow-hidden group">
        {/* Fading side edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#060E1F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#060E1F] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeList.map((item, idx) => {
            const badge = categoryBadgeStyles[item.category || "story"] || categoryBadgeStyles.story;

            return (
              <div
                key={`${item._id}-${idx}`}
                onClick={() => setSelectedItem(item)}
                className="w-72 sm:w-80 shrink-0 glass-panel glass-panel-hover p-6 rounded-3xl border border-[#D4AF37]/25 shadow-heritage cursor-pointer transition-all duration-300 flex flex-col justify-between group/card hover:border-[#D4AF37]/60"
              >
                <div>
                  {/* Top Bar: Category Badge & Open Action */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border shadow-sm ${badge.color}`}>
                      <span className="lang-bn-only">{badge.labelBn}</span>
                      <span className="lang-en-only">{badge.labelEn}</span>
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37] group-hover/card:bg-[#D4AF37] group-hover/card:text-[#060E1F] transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Strictly Title Only (No long text to break layout) */}
                  <h3 className="text-white font-bold text-lg sm:text-xl font-heading leading-snug line-clamp-2 group-hover/card:text-[#D4AF37] transition-colors">
                    <span className="lang-bn-only">{item.titleBn || item.title}</span>
                    <span className="lang-en-only">{item.title || item.titleBn}</span>
                  </h3>
                </div>

                {/* Author Info: Name & Designation Only */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  {item.photo?.asset ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#D4AF37]/50 shrink-0">
                      <Image
                        src={urlFor(item.photo).width(100).height(100).url()}
                        alt={item.name || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold font-heading text-sm shrink-0">
                      {(item.nameBn || item.name || "?").charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm font-heading truncate">
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
            );
          })}
        </div>
      </div>

      {/* Share Your Words Submission CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setSubmitModalOpen(true)}
          className="inline-flex items-center gap-3 min-h-[50px] px-8 py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base shadow-[0_8px_24px_rgba(244,42,65,0.4)] hover:scale-105 transition-all duration-300 border border-white/20"
        >
          <PenTool size={20} className="shrink-0 text-white" />
          <span className="lang-bn-only">লেখা জমা দিন (কথা ও গাথা)</span>
          <span className="lang-en-only">Share Your Words & Verses</span>
          <PlusCircle size={18} className="shrink-0" />
        </button>
      </div>

      {/* Floating Detail Modal Window */}
      <KothaOGathaDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Submission Modal Form */}
      <SubmitWordsModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
      />
    </div>
  );
}
