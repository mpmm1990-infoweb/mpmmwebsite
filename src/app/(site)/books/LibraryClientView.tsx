"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  History,
  ShieldCheck,
  Feather,
  FileCheck,
  Bookmark,
  ArrowRight,
  Tag,
} from "lucide-react";
import { urlFor } from "@/sanity/image";

export interface BookData {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current: string };
  coverImage?: { asset: { _ref: string } };
  price?: number;
  isFree?: boolean;
  author?: string;
  publishYear?: string;
  pageCount?: number;
}

interface CategoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  count: number;
  icon: React.ElementType;
}

const categories: CategoryItem[] = [
  { id: "history", nameBn: "ইতিহাস ও ঐতিহ্য", nameEn: "History & Heritage", count: 12, icon: History },
  { id: "police", nameBn: "বাংলাদেশ পুলিশ", nameEn: "Bangladesh Police", count: 18, icon: ShieldCheck },
  { id: "reminiscence", nameBn: "স্মৃতিকথা ও অভিজ্ঞতা", nameEn: "Reminiscence", count: 9, icon: Feather },
  { id: "research", nameBn: "গবেষণা ও সংকলন", nameEn: "Research", count: 14, icon: Sparkles },
  { id: "literature", nameBn: "সাহিত্য ও কবিতা", nameEn: "Literature & Poetry", count: 7, icon: BookOpen },
  { id: "documents", nameBn: "নথিপত্র ও স্মারক", nameEn: "Documents & Records", count: 5, icon: FileCheck },
];

// Fallback books if CMS has no books uploaded yet
const fallbackBooks: BookData[] = [
  {
    _id: "fb1",
    title: "Modern Police Memorial Museum 1990",
    titleBn: "আধুনিক পুলিশ স্মারকগ্রন্থ ১৯৯০",
    slug: { current: "modern-police-memorial-1990" },
    author: "১৯৯০ প্রথম ব্যাচ স্মরণিকা কমিটি",
    price: 250,
    isFree: false,
    publishYear: "২০২৪",
  },
  {
    _id: "fb2",
    title: "History of Bangladesh Police First Batch",
    titleBn: "প্রথম ব্যাচ ১৯৯০: ইতিহাস ও ইতিহাসবিদ",
    slug: { current: "first-batch-1990-history" },
    author: "মোহাম্মদ শামসুল হক",
    price: 0,
    isFree: true,
    publishYear: "২০২৩",
  },
  {
    _id: "fb3",
    title: "Memoirs of Sharda Police Academy",
    titleBn: "শারদা একাডেমির স্মৃতিকথা",
    slug: { current: "memoirs-of-sharda" },
    author: "রফিকুল ইসলাম",
    price: 180,
    isFree: false,
    publishYear: "২০২২",
  },
  {
    _id: "fb4",
    title: "Duty Beyond Duty — Police Stories",
    titleBn: "কর্তব্যের ব্যাকুলতা — পুলিশ জীবনের গল্প",
    slug: { current: "duty-beyond-duty" },
    author: "সৈয়দ আব্দুল কুদ্দুস",
    price: 0,
    isFree: true,
    publishYear: "২০২১",
  },
  {
    _id: "fb5",
    title: "Police Reform & Heritage Journal",
    titleBn: "পুলিশ সংস্কার ও ঐতিহ্য সাময়িকী",
    slug: { current: "police-reform-journal" },
    author: "এ. কে. এম. জাহাঙ্গীর হোসেন",
    price: 300,
    isFree: false,
    publishYear: "২০২৪",
  },
  {
    _id: "fb6",
    title: "1990 Batch Commemorative Volume",
    titleBn: "১৯৯০ স্মারক সংকলন ও নথি",
    slug: { current: "1990-commemorative-volume" },
    author: "জাদুঘর সংকলন বোর্ড",
    price: 0,
    isFree: true,
    publishYear: "২০২০",
  },
];

interface HorizontalSliderProps {
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  books: BookData[];
}

function HorizontalSlider({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  books,
}: HorizontalSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -350 : 350;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0B1B3D]/70 backdrop-blur-md rounded-3xl border border-[#D4AF37]/20 p-5 sm:p-6 shadow-xl mb-8">
      {/* Slider Section Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#D4AF37]/15">
        <div>
          <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2">
            <Bookmark size={20} className="text-[#D4AF37] shrink-0" />
            <span className="lang-bn-only">{titleBn}</span>
            <span className="lang-en-only">{titleEn}</span>
          </h2>
          {(subtitleBn || subtitleEn) && (
            <p className="text-xs text-[#C2CFC8] font-heading mt-0.5">
              <span className="lang-bn-only">{subtitleBn}</span>
              <span className="lang-en-only">{subtitleEn}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Left/Right Scroll Arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll("left")}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#060E1F] border border-[#D4AF37]/30 flex items-center justify-center transition-all shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#060E1F] border border-[#D4AF37]/30 flex items-center justify-center transition-all shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* View All Link */}
          <Link
            href="/books"
            className="inline-flex items-center gap-1 text-xs font-bold font-heading text-[#D4AF37] hover:text-white transition-colors bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full"
          >
            <span className="lang-bn-only">সব দেখুন</span>
            <span className="lang-en-only">View All</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
      >
        {books.map((book) => (
          <div
            key={book._id}
            className="w-[150px] sm:w-[170px] lg:w-[190px] shrink-0 flex-shrink-0 group"
          >
            <Link href={`/books/${book.slug?.current || ""}`} className="block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#060E1F] border border-[#D4AF37]/25 shadow-md group-hover:border-[#D4AF37] group-hover:shadow-[0_12px_28px_rgba(212,175,55,0.2)] transition-all duration-300">
                {book.coverImage?.asset ? (
                  <Image
                    src={urlFor(book.coverImage).width(300).height(400).url()}
                    alt={book.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#006a4e] via-[#0B1B3D] to-[#060E1F] flex flex-col items-center justify-center p-3 text-center">
                    <BookOpen size={28} className="text-[#D4AF37]/60 mb-2" />
                    <span className="text-white font-heading text-xs font-bold leading-tight line-clamp-3">
                      <span className="lang-bn-only">{book.titleBn || book.title}</span>
                      <span className="lang-en-only">{book.title || book.titleBn}</span>
                    </span>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-2 right-2">
                  {book.isFree ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#006a4e] text-white text-[10px] font-bold font-heading border border-white/20 shadow-sm">
                      <span className="lang-bn-only">ফ্রি</span>
                      <span className="lang-en-only">Free</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[#f42a41] text-white text-[10px] font-bold font-heading border border-white/20 shadow-sm">
                      ৳{book.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Compact Meta Info */}
              <div className="mt-2.5 space-y-1">
                <h3 className="text-white font-heading font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  <span className="lang-bn-only">{book.titleBn || book.title}</span>
                  <span className="lang-en-only">{book.title || book.titleBn}</span>
                </h3>

                {book.author && (
                  <p className="text-[#C2CFC8] text-[11px] font-heading truncate">
                    {book.author}
                  </p>
                )}

                <div className="pt-0.5 flex items-center justify-between">
                  <span className={`text-xs font-bold font-heading ${book.isFree ? "text-[#006a4e]" : "text-[#D4AF37]"}`}>
                    {book.isFree ? (
                      <>
                        <span className="lang-bn-only">ফ্রি ইবুক</span>
                        <span className="lang-en-only">Free E-Book</span>
                      </>
                    ) : (
                      `৳${book.price}`
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LibraryClientView({ books }: { books: BookData[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayBooks = books && books.length > 0 ? books : fallbackBooks;
  const freeBooks = displayBooks.filter((b) => b.isFree);
  const paidBooks = displayBooks.filter((b) => !b.isFree);

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-navy-gradient heritage-pattern pb-16">
      
      {/* ── 1. COMPACT PAGE HEADER (Replaces Giant Header) ── */}
      <section className="pt-28 md:pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold font-heading">
                <span className="lang-bn-only">ডিজিটাল লাইব্রেরি</span>
                <span className="lang-en-only">Digital Library</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
              <span className="lang-bn-only">১৯৯০ ব্যাচ পুলিশ স্মারক ও প্রকাশনা সংগ্রহ</span>
              <span className="lang-en-only">1990 Batch Police Memorial & Publications</span>
            </h1>
          </div>

          <div className="text-xs text-[#C2CFC8] font-heading flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl w-fit">
            <Tag size={14} className="text-[#D4AF37]" />
            <span className="lang-bn-only">মোট বই: <strong className="text-white">{displayBooks.length} টি</strong></span>
            <span className="lang-en-only">Total Books: <strong className="text-white">{displayBooks.length}</strong></span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ── 2. ROKOMARI-STYLE CATEGORY GRID ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#D4AF37]" />
              <span className="lang-bn-only">জনপ্রিয় ক্যাটাগরি</span>
              <span className="lang-en-only">Popular Categories</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isSelected ? "all" : cat.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all duration-300 group shadow-md ${
                    isSelected
                      ? "bg-[#D4AF37] border-[#D4AF37] text-[#060E1F]"
                      : "bg-[#0B1B3D]/80 hover:bg-[#132B5E] border-[#D4AF37]/25 text-white hover:border-[#D4AF37]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#060E1F] text-[#D4AF37]"
                        : "bg-white/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#060E1F]"
                    }`}
                  >
                    <IconComp size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-heading font-bold text-xs truncate ${
                        isSelected ? "text-[#060E1F]" : "text-white group-hover:text-[#D4AF37]"
                      }`}
                    >
                      <span className="lang-bn-only">{cat.nameBn}</span>
                      <span className="lang-en-only">{cat.nameEn}</span>
                    </p>
                    <p
                      className={`text-[10px] font-heading truncate mt-0.5 ${
                        isSelected ? "text-[#060E1F]/70" : "text-[#C2CFC8]"
                      }`}
                    >
                      <span className="lang-bn-only">{cat.count} টি বই</span>
                      <span className="lang-en-only">{cat.count} books</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 3. HORIZONTAL SLIDERS (Rokomari Sections) ── */}

        {/* Section A: All E-Books & Publications */}
        <HorizontalSlider
          titleBn="সকল ইবুক ও স্মারকগ্রন্থ"
          titleEn="All E-Books & Publications"
          subtitleBn="১৯৯০ প্রথম ব্যাচ পুলিশ স্মৃতি জাদুঘর ইবুক সংগ্রহ"
          subtitleEn="Explore 1990 Batch Police Memorial Library"
          books={displayBooks}
        />

        {/* Section B: Free E-Books Collection */}
        {freeBooks.length > 0 && (
          <HorizontalSlider
            titleBn="ফ্রি ইবুক সংগ্রহ"
            titleEn="Free E-Book Collection"
            subtitleBn="বিনা মূল্যে সরাসরি পড়ার উপযোগী বইসমূহ"
            subtitleEn="Read & Download Free E-Books"
            books={freeBooks}
          />
        )}

        {/* Section C: Paid / Featured Publications */}
        {paidBooks.length > 0 && (
          <HorizontalSlider
            titleBn="বিশেষ প্রকাশনা ও গবেষণা গ্রন্থ"
            titleEn="Featured Research & Publications"
            subtitleBn="ডিজিটাল প্রক্রিয়ায় ক্রয়ের উপযোগী বিশেষ বই"
            subtitleEn="Premium Digital Library Publications"
            books={paidBooks}
          />
        )}

      </div>
    </div>
  );
}
