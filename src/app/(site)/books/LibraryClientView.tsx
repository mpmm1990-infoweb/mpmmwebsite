"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Bookmark, Tag } from "lucide-react";
import { urlFor } from "@/sanity/image";

export interface BookData {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current: string };
  coverImage?: { asset: { _ref: string } };
  price?: number;
  isFree?: boolean;
  pdfUrl?: string;
  externalLink?: string;
  author?: string;
  publishYear?: string;
  pageCount?: number;
}

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
  return (
    <div className="bg-[#0B1B3D]/70 backdrop-blur-md rounded-3xl border border-[#D4AF37]/20 p-5 sm:p-6 shadow-xl mb-8">
      {/* Slider Section Header (NO arrows, NO 'View All' button) */}
      <div className="mb-5 pb-3 border-b border-[#D4AF37]/15">
        <h2 className="font-heading font-bold text-lg sm:text-xl text-white flex items-center gap-2">
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

      {/* Horizontal Carousel Track */}
      <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide py-2 scroll-smooth">
        {books.map((book) => (
          <div
            key={book._id}
            className="w-[150px] sm:w-[170px] lg:w-[190px] shrink-0 flex-shrink-0 group"
          >
            <Link href={`/books/${book.slug?.current || ""}`} className="block">
              {/* Cover Image (NO floating badge) */}
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
              </div>

              {/* Compact Meta Info & Bottom Rokomari Price */}
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

                {/* Bottom Rokomari Price */}
                <div className="pt-1 flex items-center justify-between">
                  {book.isFree || !book.price ? (
                    <span className="text-xs font-bold font-heading text-[#006a4e]">
                      <span className="lang-bn-only">ফ্রি</span>
                      <span className="lang-en-only">Free</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold font-heading text-[#D4AF37]">
                      <span className="lang-bn-only">৳{book.price}</span>
                      <span className="lang-en-only">TK. {book.price}</span>
                    </span>
                  )}
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
  const displayBooks = books && books.length > 0 ? books : fallbackBooks;
  const freeBooks = displayBooks.filter((b) => b.isFree);

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-navy-gradient heritage-pattern pb-16">
      
      {/* ── 1. COMPACT PAGE HEADER (Reduced Top Gap) ── */}
      <section className="pt-20 md:pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold font-heading">
                <span className="lang-bn-only">ডিজিটাল লাইব্রেরি</span>
                <span className="lang-en-only">Digital Library</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        
        {/* ── 2. MAIN HORIZONTAL SLIDER: ALL E-BOOKS ── */}
        <HorizontalSlider
          titleBn="সকল ইবুক ও স্মারকগ্রন্থ"
          titleEn="All E-Books & Publications"
          subtitleBn="১৯৯০ প্রথম ব্যাচ পুলিশ স্মৃতি জাদুঘর ইবুক সংগ্রহ"
          subtitleEn="Explore 1990 Batch Police Memorial Library"
          books={displayBooks}
        />

        {/* ── 3. SECOND HORIZONTAL SLIDER: FREE E-BOOKS (If Available) ── */}
        {freeBooks.length > 0 && (
          <HorizontalSlider
            titleBn="ফ্রি ইবুক সংগ্রহ"
            titleEn="Free E-Book Collection"
            subtitleBn="বিনা মূল্যে সরাসরি পড়ার উপযোগী বইসমূহ"
            subtitleEn="Read & Download Free E-Books"
            books={freeBooks}
          />
        )}

      </div>
    </div>
  );
}
