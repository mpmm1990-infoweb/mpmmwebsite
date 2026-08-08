"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, BookOpen, PenTool, User, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "@/components/ScrollReveal";
import KothaOGathaDetailModal, { KothaOGathaItem } from "@/components/KothaOGathaDetailModal";

interface MembersClientProps {
  items: KothaOGathaItem[];
}

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

export default function MembersClient({ items }: MembersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<KothaOGathaItem | null>(null);

  const displayList = items && items.length > 0 ? items : fallbackItems;

  const filteredItems = displayList.filter((item) => {
    // Category Filter
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;

    // Search term
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const nameMatch = item.name?.toLowerCase().includes(term);
    const nameBnMatch = item.nameBn?.toLowerCase().includes(term);
    const titleMatch = item.title?.toLowerCase().includes(term);
    const titleBnMatch = item.titleBn?.toLowerCase().includes(term);

    return nameMatch || nameBnMatch || titleMatch || titleBnMatch;
  });

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="mb-10 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-3xl border border-[#D4AF37]/20 shadow-xl">
        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="খুঁজুন / Search title or author..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] transition shadow-inner min-h-[44px]"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap font-heading ${
              categoryFilter === "all"
                ? "bg-[#f42a41] text-white shadow-[0_8px_24px_rgba(244,42,65,0.35)] border border-white/30"
                : "glass-panel text-white/80 hover:bg-white/15 border border-[#D4AF37]/20"
            }`}
          >
            <span className="lang-bn-only">সকল লেখা ({displayList.length})</span>
            <span className="lang-en-only">All ({displayList.length})</span>
          </button>
          <button
            onClick={() => setCategoryFilter("poem")}
            className={`px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap font-heading ${
              categoryFilter === "poem"
                ? "bg-[#f42a41] text-white shadow-[0_8px_24px_rgba(244,42,65,0.35)] border border-white/30"
                : "glass-panel text-white/80 hover:bg-white/15 border border-[#D4AF37]/20"
            }`}
          >
            <span className="lang-bn-only">কবিতা</span>
            <span className="lang-en-only">Poems</span>
          </button>
          <button
            onClick={() => setCategoryFilter("story")}
            className={`px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap font-heading ${
              categoryFilter === "story"
                ? "bg-[#006a4e] text-white shadow-lg border border-white/30"
                : "glass-panel text-white/80 hover:bg-white/15 border border-[#D4AF37]/20"
            }`}
          >
            <span className="lang-bn-only">গল্প</span>
            <span className="lang-en-only">Stories</span>
          </button>
          <button
            onClick={() => setCategoryFilter("reminiscence")}
            className={`px-5 py-2.5 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap font-heading ${
              categoryFilter === "reminiscence"
                ? "bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]"
                : "glass-panel text-white/80 hover:bg-white/15 border border-[#D4AF37]/20"
            }`}
          >
            <span className="lang-bn-only">স্মৃতিগাথা</span>
            <span className="lang-en-only">Reminiscence</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const badge = categoryBadgeStyles[item.category || "story"] || categoryBadgeStyles.story;

            return (
              <ScrollReveal key={item._id} delay={index * 0.05}>
                <div
                  onClick={() => setSelectedItem(item)}
                  className="glass-panel glass-panel-hover rounded-3xl p-6 border border-[#D4AF37]/20 shadow-heritage flex flex-col justify-between cursor-pointer group hover:border-[#D4AF37]/60 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border shadow-sm ${badge.color}`}>
                        <span className="lang-bn-only">{badge.labelBn}</span>
                        <span className="lang-en-only">{badge.labelEn}</span>
                      </span>

                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#060E1F] transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-lg sm:text-xl font-heading leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      <span className="lang-bn-only">{item.titleBn || item.title}</span>
                      <span className="lang-en-only">{item.title || item.titleBn}</span>
                    </h3>
                  </div>

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
                        <User size={18} />
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
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
          <BookOpen size={56} className="text-[#D4AF37] mx-auto mb-4" />
          <p className="text-white font-heading text-xl font-bold">
            <span className="lang-bn-only">কোনো লেখা পাওয়া যায়নি</span>
            <span className="lang-en-only">No submissions found</span>
          </p>
        </div>
      )}

      {/* Floating Detail Modal */}
      <KothaOGathaDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
