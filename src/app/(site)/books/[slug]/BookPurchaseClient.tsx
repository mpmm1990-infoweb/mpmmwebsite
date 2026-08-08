"use client";

import { useState } from "react";
import { Mail, ShoppingCart } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface BookPurchaseClientProps {
  bookId: string;
  bookTitle: string;
  bookTitleBn?: string;
  price: number;
  isFree: boolean;
  // NOTE: freePdfUrl is intentionally NOT accepted as a prop.
  // Free books are handled server-side via /api/download/[id] to keep PDF URLs off the client.
  downloadId?: string; // Supabase-signed download ID for free books
}

export default function BookPurchaseClient({
  bookId,
  bookTitle,
  bookTitleBn,
  price,
  isFree,
  downloadId,
}: BookPurchaseClientProps) {
  const [showModal, setShowModal] = useState(false);

  // ─── FREE BOOK: Secure server-side download link ───────────────────────────
  if (isFree) {
    const href = downloadId ? `/api/download/${downloadId}` : "#";
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-[#006a4e] hover:bg-[#008764] text-white rounded-2xl font-bold font-heading hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto"
      >
        <Mail size={20} className="shrink-0" />
        <span className="lang-bn-only">ফ্রি পিডিএফ ডাউনলোড করুন</span>
        <span className="lang-en-only">Download Free PDF</span>
      </a>
    );
  }

  // ─── PAID BOOK: Open payment modal ─────────────────────────────────────────
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-2xl font-bold font-heading hover:shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto"
      >
        <ShoppingCart size={20} className="shrink-0" />
        <span className="lang-bn-only">৳{price} টাকায় ক্রয় করুন</span>
        <span className="lang-en-only">Buy for ৳{price}</span>
      </button>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bookTitle={bookTitle}
        bookTitleBn={bookTitleBn}
        bookId={bookId}
        price={price}
      />
    </>
  );
}
