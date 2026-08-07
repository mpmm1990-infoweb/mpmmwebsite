import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { BOOK_BY_SLUG_QUERY } from "@/lib/queries";
import ScrollReveal from "@/components/ScrollReveal";
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
  try {
    book = await sanityFetch<BookData>(BOOK_BY_SLUG_QUERY, { slug }, ["book"]);
  } catch {
    // CMS not configured
  }

  if (!book) {
    notFound();
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-28 sm:py-32 md:py-36 bg-navy-gradient overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            {book.titleBn || book.title}
          </h1>
          {book.titleBn && (
            <p className="text-[#D4AF37] font-heading text-xs sm:text-base mt-3 uppercase tracking-widest font-bold">
              {book.title}
            </p>
          )}
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Book Detail */}
      <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-5 sm:p-10 md:p-12 rounded-3xl border border-[#D4AF37]/25 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Cover */}
              <ScrollReveal direction="left">
                <div className="perspective-container max-w-xs sm:max-w-sm mx-auto md:max-w-none">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-liquid border border-[#D4AF37]/30">
                    {book.coverImage?.asset ? (
                      <Image
                        src={urlFor(book.coverImage).width(600).height(800).url()}
                        alt={book.title || "Book cover"}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#006a4e] to-[#0B1B3D] flex items-center justify-center p-6">
                        <span className="text-white font-heading text-xl sm:text-2xl font-bold text-center">
                          {book.titleBn || book.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* Details */}
              <ScrollReveal direction="right">
                <div>
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
                    {book.author && (
                      <div className="bg-white/10 border border-[#D4AF37]/30 px-3.5 sm:px-4 py-2 rounded-2xl backdrop-blur-md">
                        <p className="text-[11px] sm:text-xs text-[#C2CFC8] font-heading">লেখক / Author</p>
                        <p className="text-xs sm:text-sm font-bold text-[#D4AF37] font-heading">
                          {book.author}
                        </p>
                      </div>
                    )}
                    {book.publishYear && (
                      <div className="bg-white/10 border border-[#D4AF37]/30 px-3.5 sm:px-4 py-2 rounded-2xl backdrop-blur-md">
                        <p className="text-[11px] sm:text-xs text-[#C2CFC8] font-heading">প্রকাশকাল / Year</p>
                        <p className="text-xs sm:text-sm font-bold text-[#D4AF37] font-heading">
                          {book.publishYear}
                        </p>
                      </div>
                    )}
                    {book.pageCount && (
                      <div className="bg-white/10 border border-[#D4AF37]/30 px-3.5 sm:px-4 py-2 rounded-2xl backdrop-blur-md">
                        <p className="text-[11px] sm:text-xs text-[#C2CFC8] font-heading">পৃষ্ঠা / Pages</p>
                        <p className="text-xs sm:text-sm font-bold text-[#D4AF37] font-heading">
                          {book.pageCount}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className={`text-3xl sm:text-4xl font-heading font-bold ${
                        book.isFree ? "text-[#006a4e]" : "text-[#D4AF37]"
                      }`}
                    >
                      {book.isFree ? "ফ্রি / Free" : `৳${book.price}`}
                    </span>
                  </div>

                  {/* Description */}
                  {book.descriptionBn ? (
                    <p className="text-white leading-relaxed mb-4 font-heading text-base sm:text-lg font-medium">
                      {book.descriptionBn}
                    </p>
                  ) : null}
                  {book.description && (
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-8">
                      {book.description}
                    </p>
                  )}

                  {/* Purchase/Download */}
                  <BookPurchaseClient
                    bookId={book._id}
                    bookTitle={book.title || ""}
                    price={book.price || 0}
                    isFree={book.isFree || false}
                    freePdfUrl={book.pdfFile?.asset?.url}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
