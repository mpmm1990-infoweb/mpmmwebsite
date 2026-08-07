import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { BOOKS_QUERY } from "@/lib/queries";
import ScrollReveal from "@/components/ScrollReveal";
import BookCard3D from "@/components/BookCard3D";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Library — Modern Police Memorial Museum",
  description:
    "Browse and purchase digital publications from the Modern Police Memorial Museum.",
};

interface BookData {
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

export default async function BooksPage() {
  let books: BookData[] = [];
  try {
    books = await sanityFetch<BookData[]>(BOOKS_QUERY, {}, ["book"]);
  } catch {
    // CMS not configured
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-28 sm:py-36 md:py-40 bg-navy-gradient overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-md">
            <span className="lang-bn-only">ডিজিটাল লাইব্রেরি</span>
            <span className="lang-en-only">Digital Library</span>
          </h1>
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books && books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {books.map((book, index) => (
                <ScrollReveal key={book._id} delay={index * 0.1}>
                  <BookCard3D
                    title={book.title || "Untitled"}
                    titleBn={book.titleBn}
                    slug={book.slug?.current || ""}
                    coverImage={book.coverImage as never}
                    price={book.price}
                    isFree={book.isFree}
                    author={book.author}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-panel rounded-3xl p-6 sm:p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
              <BookOpen size={56} className="text-[#D4AF37] mx-auto mb-4" />
              <p className="text-white text-lg sm:text-xl font-bold font-heading">
                <span className="lang-bn-only">সিএমএস-এ বই যোগ করার পর এখানে প্রদর্শিত হবে।</span>
                <span className="lang-en-only">Books will appear here once added to CMS.</span>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
