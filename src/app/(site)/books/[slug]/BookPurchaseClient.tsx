"use client";

import { useState } from "react";
import { Download, ShoppingCart, AlertCircle } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface BookPurchaseClientProps {
  bookId: string;
  bookSlug?: string;
  bookTitle: string;
  bookTitleBn?: string;
  price: number;
  isFree: boolean;
  downloadUrl?: string;
  downloadId?: string;
}

export default function BookPurchaseClient({
  bookId,
  bookSlug,
  bookTitle,
  bookTitleBn,
  price,
  isFree,
  downloadUrl,
  downloadId,
}: BookPurchaseClientProps) {
  const [showModal, setShowModal] = useState(false);

  // ─── FREE BOOK: Direct download or external drive link ──────────────────────
  if (isFree) {
    const finalDownloadUrl = downloadUrl || (downloadId ? `/api/download/${downloadId}` : "");

    if (!finalDownloadUrl) {
      return (
        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 text-[#C2CFC8] rounded-2xl font-bold font-heading border border-white/15 text-sm sm:text-base cursor-not-allowed opacity-80"
          >
            <Download size={20} className="shrink-0 text-[#D4AF37]" />
            <span className="lang-bn-only">পিডিএফটি ডাউনলোড করুন</span>
            <span className="lang-en-only">Download PDF</span>
          </button>
          <span className="text-xs text-[#D4AF37] font-heading flex items-center gap-1">
            <AlertCircle size={14} />
            <span className="lang-bn-only">ডাউনলোড ফাইল শীঘ্রই যুক্ত করা হবে</span>
            <span className="lang-en-only">Download link coming soon</span>
          </span>
        </div>
      );
    }

    return (
      <a
        href={finalDownloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-[#006a4e] hover:bg-[#008764] text-white rounded-2xl font-bold font-heading hover:shadow-[0_8px_24px_rgba(0,106,78,0.4)] hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto shadow-lg"
      >
        <Download size={20} className="shrink-0" />
        <span className="lang-bn-only">পিডিএফটি ডাউনলোড করুন</span>
        <span className="lang-en-only">Download PDF</span>
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
        bookSlug={bookSlug}
        price={price}
      />
    </>
  );
}
