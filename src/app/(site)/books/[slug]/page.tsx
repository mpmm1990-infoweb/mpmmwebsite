import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, FileText, User, ArrowLeft } from "lucide-react";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { BOOK_BY_SLUG_QUERY, RELATED_BOOKS_QUERY } from "@/lib/queries";
import BookPurchaseClient from "./BookPurchaseClient";

interface BookData {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current: string };
  coverImage?: { asset: { _ref: string } };
  description?: string;
  descriptionBn?: string;
  price?: number;
  isFree?: boolean;
  pdfFile?: { asset: { url: string } };
  supabasePdfPath?: string;
  author?: string;
  publishYear?: string;
  pageCount?: number;
}

interface RelatedBook {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current: string };
  coverImage?: { asset: { _ref: string } };
  price?: number;
  isFree?: boolean;
  author?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let book: BookData | null = null;
  try {
    book = await sanityFetch<BookData>(BOOK_BY_SLUG_QUERY, { slug }, ["book"]);
  } catch {
    // fallback
  }

  return {
    title: book?.title
      ? `${book.title} — Digital Library`
      : "Book — Digital Library",
    description: book?.description || "A publication from the memorial museum.",
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let book: BookData | null = null;
  let relatedBooks: RelatedBook[] = [];

  try {
    [book, relatedBooks] = await Promise.all([
      sanityFetch<BookData>(BOOK_BY_SLUG_QUERY, { slug }, ["book"]),
      sanityFetch<RelatedBook[]>(RELATED_BOOKS_QUERY, { slug }, ["book"]),
    ]);
  } catch {
    // CMS not configured
  }

  if (!book) {
    notFound();
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ── Hero Banner ── */}
      <section className="relative py-20 sm:py-24 md:py-28 overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="absolute inset-0 heritage-pattern opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-sm font-heading font-semibold mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="lang-bn-only">ডিজিটাল লাইব্রেরিতে ফিরুন</span>
            <span className="lang-en-only">Back to Library</span>
          </Link>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md max-w-3xl">
            <span className="lang-bn-only">{book.titleBn || book.title}</span>
            <span className="lang-en-only">{book.title || book.titleBn}</span>
          </h1>
          <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* ── Main 3-Column Grid ── */}
      <section className="py-10 sm:py-14 md:py-16 heritage-pattern w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">

            {/* ─── LEFT COLUMN: Cover Image (span 3) ─── */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-none group">
                <div
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_30px_80px_-10px_rgba(212,175,55,0.25)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {book.coverImage?.asset ? (
                    <Image
                      src={urlFor(book.coverImage).width(500).height(700).url()}
                      alt={book.title || "Book cover"}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#006a4e] via-[#0B1B3D] to-[#060E1F] flex flex-col items-center justify-center p-6 gap-3">
                      <BookOpen size={48} className="text-[#D4AF37]/60" />
                      <span className="text-white font-heading text-base font-bold text-center leading-snug">
                        <span className="lang-bn-only">{book.titleBn || book.title}</span>
                        <span className="lang-en-only">{book.title || book.titleBn}</span>
                      </span>
                    </div>
                  )}

                  {/* Free / Price badge overlay */}
                  <div className="absolute top-3 left-3">
                    {book.isFree ? (
                      <span className="px-3 py-1 rounded-full bg-[#006a4e] text-white text-xs font-bold font-heading shadow-lg border border-white/20">
                        <span className="lang-bn-only">ফ্রি</span>
                        <span className="lang-en-only">Free</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#060E1F] text-xs font-bold font-heading shadow-lg">
                        ৳{book.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── MIDDLE COLUMN: Book Details (span 6) ─── */}
            <div className="lg:col-span-6">
              <div className="bg-[#0B1B3D]/80 backdrop-blur-md rounded-3xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-2xl space-y-6">

                {/* Title */}
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                    <span className="lang-bn-only">{book.titleBn || book.title}</span>
                    <span className="lang-en-only">{book.title || book.titleBn}</span>
                  </h2>
                  {book.author && (
                    <p className="mt-2 text-[#C2CFC8] text-sm font-heading flex items-center gap-1.5">
                      <User size={14} className="text-[#D4AF37] shrink-0" />
                      <span className="lang-bn-only">লেখক: <span className="text-[#D4AF37] font-semibold">{book.author}</span></span>
                      <span className="lang-en-only">Author: <span className="text-[#D4AF37] font-semibold">{book.author}</span></span>
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className={`text-4xl sm:text-5xl font-heading font-bold ${book.isFree ? "text-[#006a4e]" : "text-[#D4AF37]"}`}>
                    {book.isFree ? (
                      <>
                        <span className="lang-bn-only">ফ্রি</span>
                        <span className="lang-en-only">Free</span>
                      </>
                    ) : (
                      `৳${book.price}`
                    )}
                  </span>
                  {!book.isFree && (
                    <span className="text-[#C2CFC8] text-xs font-heading border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#D4AF37]/10">
                      <span className="lang-bn-only">সেন্ড মানি করুন</span>
                      <span className="lang-en-only">Manual Payment</span>
                    </span>
                  )}
                </div>

                {/* Detail Badges */}
                <div className="flex flex-wrap gap-3">
                  {book.author && (
                    <div className="flex items-center gap-2 bg-white/5 border border-[#D4AF37]/25 px-4 py-2.5 rounded-2xl">
                      <User size={14} className="text-[#D4AF37] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#C2CFC8] font-heading uppercase tracking-wider">
                          <span className="lang-bn-only">লেখক</span>
                          <span className="lang-en-only">Author</span>
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-white font-heading">{book.author}</p>
                      </div>
                    </div>
                  )}
                  {book.publishYear && (
                    <div className="flex items-center gap-2 bg-white/5 border border-[#D4AF37]/25 px-4 py-2.5 rounded-2xl">
                      <CalendarDays size={14} className="text-[#D4AF37] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#C2CFC8] font-heading uppercase tracking-wider">
                          <span className="lang-bn-only">প্রকাশকাল</span>
                          <span className="lang-en-only">Published</span>
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-white font-heading">{book.publishYear}</p>
                      </div>
                    </div>
                  )}
                  {book.pageCount && (
                    <div className="flex items-center gap-2 bg-white/5 border border-[#D4AF37]/25 px-4 py-2.5 rounded-2xl">
                      <FileText size={14} className="text-[#D4AF37] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#C2CFC8] font-heading uppercase tracking-wider">
                          <span className="lang-bn-only">পৃষ্ঠা</span>
                          <span className="lang-en-only">Pages</span>
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-white font-heading">{book.pageCount}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <BookPurchaseClient
                    bookId={book._id}
                    bookTitle={book.title || ""}
                    bookTitleBn={book.titleBn || book.title || ""}
                    price={book.price || 0}
                    isFree={book.isFree || false}
                  />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

                {/* Description */}
                <div>
                  <h3 className="text-[#D4AF37] font-heading font-bold text-base uppercase tracking-wider mb-3">
                    <span className="lang-bn-only">বইয়ের সারসংক্ষেপ</span>
                    <span className="lang-en-only">About This Book</span>
                  </h3>
                  <div className="lang-bn-only">
                    {book.descriptionBn ? (
                      <p className="text-white/85 leading-loose font-heading text-sm sm:text-base">{book.descriptionBn}</p>
                    ) : (
                      <p className="text-white/40 italic text-sm font-heading">বিবরণ এখনো যোগ করা হয়নি।</p>
                    )}
                  </div>
                  <div className="lang-en-only">
                    {book.description ? (
                      <p className="text-white/85 leading-relaxed text-sm sm:text-base">{book.description}</p>
                    ) : (
                      <p className="text-white/40 italic text-sm">No description available yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: Related Books Sidebar (span 3) ─── */}
            <div className="lg:col-span-3">
              <div className="bg-[#060E1F]/80 backdrop-blur-md rounded-3xl border border-[#D4AF37]/20 p-5 shadow-xl sticky top-24">
                <h3 className="font-heading font-bold text-[#D4AF37] text-sm uppercase tracking-widest mb-4 pb-3 border-b border-[#D4AF37]/20">
                  <span className="lang-bn-only">এ জাতীয় আরও বই</span>
                  <span className="lang-en-only">Related Books</span>
                </h3>

                {relatedBooks && relatedBooks.length > 0 ? (
                  <div className="space-y-4">
                    {relatedBooks.map((rb) => (
                      <Link
                        key={rb._id}
                        href={`/books/${rb.slug?.current}`}
                        className="flex gap-3 group/rb hover:bg-white/5 rounded-2xl p-2 -m-2 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-14 h-[74px] shrink-0 rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-md">
                          {rb.coverImage?.asset ? (
                            <Image
                              src={urlFor(rb.coverImage).width(120).height(160).url()}
                              alt={rb.title || ""}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] flex items-center justify-center">
                              <BookOpen size={16} className="text-[#D4AF37]/60" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex flex-col justify-between py-0.5">
                          <p className="text-white text-xs font-heading font-semibold leading-snug line-clamp-2 group-hover/rb:text-[#D4AF37] transition-colors">
                            <span className="lang-bn-only">{rb.titleBn || rb.title}</span>
                            <span className="lang-en-only">{rb.title || rb.titleBn}</span>
                          </p>
                          {rb.author && (
                            <p className="text-[#C2CFC8] text-[11px] font-heading truncate mt-1">{rb.author}</p>
                          )}
                          <p className={`text-xs font-bold font-heading mt-1 ${rb.isFree ? "text-[#006a4e]" : "text-[#D4AF37]"}`}>
                            {rb.isFree ? (
                              <>
                                <span className="lang-bn-only">ফ্রি</span>
                                <span className="lang-en-only">Free</span>
                              </>
                            ) : (
                              `৳${rb.price}`
                            )}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-xs font-heading italic text-center py-4">
                    <span className="lang-bn-only">আর কোনো বই পাওয়া যায়নি।</span>
                    <span className="lang-en-only">No other books found.</span>
                  </p>
                )}

                {/* View All */}
                <div className="mt-5 pt-4 border-t border-[#D4AF37]/15">
                  <Link
                    href="/books"
                    className="block text-center text-xs font-heading font-semibold text-[#D4AF37] hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5"
                  >
                    <span className="lang-bn-only">সব বই দেখুন →</span>
                    <span className="lang-en-only">View All Books →</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
