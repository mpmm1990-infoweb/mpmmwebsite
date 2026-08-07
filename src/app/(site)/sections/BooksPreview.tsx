import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import BookCard3D from "@/components/BookCard3D";

interface BookData {
  _id: string;
  title?: string;
  titleBn?: string;
  slug?: { current: string };
  coverImage?: { asset: { _ref: string } };
  price?: number;
  isFree?: boolean;
  author?: string;
}

export default function BooksPreview({ data }: { data: unknown[] }) {
  const books = (data || []) as BookData[];

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Digital Library"
          titleBn="ডিজিটাল লাইব্রেরি"
        />

        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {books.map((book, index) => (
              <ScrollReveal key={book._id} delay={index * 0.15}>
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
            <p className="text-white font-heading text-lg lang-bn-only font-medium">
              সিএমএস-এ বই যোগ করার পর এখানে প্রদর্শিত হবে।
            </p>
            <p className="text-white/70 lang-en-only text-base">
              Books will appear here once added to the CMS.
            </p>
          </div>
        )}

        <ScrollReveal className="text-center mt-12 sm:mt-14">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 group border border-white/20"
          >
            <span className="font-heading lang-bn-only">সম্পূর্ণ লাইব্রেরি ব্রাউজ করুন</span>
            <span className="lang-en-only">Browse Full Library</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1.5 transition-transform shrink-0"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
