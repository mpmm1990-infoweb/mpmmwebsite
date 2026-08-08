"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  Hash,
  Info,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  bookTitleBn?: string;
  bookId: string;
  bookSlug?: string;
  price: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  bookTitle,
  bookTitleBn,
  bookId,
  bookSlug,
  price,
}: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    paymentMethod: "bkash" as "bkash" | "nagad",
    paymentRef: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // ─── Hardcoded merchant numbers (set these as your real bKash/Nagad numbers) ───
  const merchantNumbers: Record<"bkash" | "nagad", string> = {
    bkash: "01XXXXXXXXX", // ← Replace with your real bKash merchant number
    nagad: "01XXXXXXXXX", // ← Replace with your real Nagad merchant number
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Basic phone validation
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setErrorMsg("সঠিক বাংলাদেশি ফোন নম্বর দিন (যেমন: 01XXXXXXXXX)।");
      return;
    }

    if (formData.paymentRef.trim().length < 4) {
      setErrorMsg("সঠিক ট্রানজেকশন আইডি দিন।");
      return;
    }

    setStep("processing");

    try {
      // Step 1: Save order to database (non-blocking if DB table is uninitialized)
      try {
        const purchaseRes = await fetch("/api/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId,
            bookTitle,
            email: formData.email,
            phone: formData.phone,
            paymentMethod: formData.paymentMethod,
            paymentRef: formData.paymentRef.trim(),
            amount: price,
          }),
        });

        if (!purchaseRes.ok) {
          const err = await purchaseRes.json().catch(() => ({}));
          console.warn("Database purchase record save warning:", err);
        }
      } catch (dbErr) {
        console.warn("Database purchase record save non-blocking warning:", dbErr);
      }

      // Step 2: Send dual emails (user confirmation + admin alert)
      const emailRes = await fetch("/api/send-purchase-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle,
          bookTitleBn: bookTitleBn || bookTitle,
          bookSlug: bookSlug || bookId,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
          paymentRef: formData.paymentRef.trim(),
          amount: price,
        }),
      });

      const emailData = await emailRes.json().catch(() => ({}));

      if (!emailRes.ok || emailData.success === false) {
        throw new Error(emailData?.error || emailData?.message || "পেমেন্ট তথ্য সাবমিট করতে সমস্যা হয়েছে।");
      }

      setStep("success");
    } catch (err: any) {
      console.error("Payment submission error:", err);
      setStep("form");
      setErrorMsg(
        err?.message || "সাবমিট করতে সমস্যা হয়েছে। ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।"
      );
    }
  };

  const resetAndClose = () => {
    setStep("form");
    setErrorMsg("");
    setFormData({ email: "", phone: "", paymentMethod: "bkash", paymentRef: "" });
    onClose();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/8 text-white text-sm placeholder:text-white/35 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition shadow-inner min-h-[44px]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#060E1F]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="glass-panel rounded-3xl w-full max-w-md my-auto overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#0B1B3D]/95 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="glass-panel-dark bg-[#060E1F] px-5 sm:px-6 pt-5 pb-4 relative border-b border-[#D4AF37]/20 shrink-0">
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 text-white/60 hover:text-[#D4AF37] transition-colors p-2 rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-white/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 shrink-0">
                  <CreditCard className="text-[#D4AF37]" size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-heading font-bold text-base sm:text-lg leading-snug">
                    ডিজিটাল বই ক্রয়
                  </h3>
                  <p className="text-white/60 text-xs font-medium mt-0.5 line-clamp-1">
                    {bookTitleBn || bookTitle}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[#D4AF37] text-3xl sm:text-4xl font-heading font-bold">
                  ৳{price}
                </span>
                <span className="text-white/50 text-xs font-heading">
                  সহজ পেমেন্ট
                </span>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="px-5 sm:px-6 py-5 space-y-4 overflow-y-auto flex-1">

              {/* ── STEP: FORM ── */}
              {step === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Payment Instructions Banner */}
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-4 flex gap-3">
                    <Info size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="text-xs text-white/80 font-heading leading-relaxed space-y-1">
                      <p>
                        <span className="text-[#D4AF37] font-bold">
                          {formData.paymentMethod === "bkash" ? "bKash" : "Nagad"} নম্বর:
                        </span>{" "}
                        <span className="font-bold text-white select-all">
                          {merchantNumbers[formData.paymentMethod]}
                        </span>
                      </p>
                      <p>
                        উপরের নম্বরে{" "}
                        <strong className="text-[#D4AF37]">৳{price}</strong> সেন্ড মানি করুন,
                        তারপর নিচের ফর্মটি পূরণ করুন।
                      </p>
                      <p className="text-[#D4AF37]/80 text-[11px]">
                        পেমেন্ট যাচাইয়ের পর ১-ক্লিকে ইমেইলে ডাউনলোড লিংক পাঠানো হবে।
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <Mail size={13} className="text-[#D4AF37]" />
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                    <p className="text-white/40 text-[11px] mt-1 font-heading">
                      এই ইমেইলে বইটির ডাউনলোড লিংক পাঠানো হবে।
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <Phone size={13} className="text-[#D4AF37]" />
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-heading">
                      পেমেন্ট মাধ্যম *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["bkash", "nagad"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: method })
                          }
                          className={`px-4 py-3 min-h-[46px] rounded-2xl border text-sm font-bold transition-all font-heading flex items-center justify-center ${
                            formData.paymentMethod === method
                              ? method === "bkash"
                                ? "border-[#E2136E] bg-[#E2136E]/20 text-[#E2136E] shadow-md"
                                : "border-[#F68A1E] bg-[#F68A1E]/20 text-[#F68A1E] shadow-md"
                              : method === "bkash"
                                ? "border-white/20 bg-white/5 text-white/70 hover:border-[#E2136E] hover:text-[#E2136E] hover:bg-[#E2136E]/10"
                                : "border-white/20 bg-white/5 text-white/70 hover:border-[#F68A1E] hover:text-[#F68A1E] hover:bg-[#F68A1E]/10"
                          }`}
                        >
                          {method === "bkash" ? "bKash" : "Nagad"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TrxID */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <Hash size={13} className="text-[#D4AF37]" />
                      ট্রানজেকশন আইডি (TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.paymentRef}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentRef: e.target.value })
                      }
                      className={inputClass}
                      placeholder="যেমন: ABC1234567XYZ"
                    />
                    <p className="text-white/40 text-[11px] mt-1 font-heading">
                      {formData.paymentMethod === "bkash" ? "bKash" : "Nagad"} অ্যাপে পাঠানোর পর TrxID পাবেন।
                    </p>
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <div className="bg-[#f42a41]/15 border border-[#f42a41]/40 rounded-2xl px-4 py-3 text-[#f42a41] text-xs font-heading">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 min-h-[50px] bg-[#f42a41] hover:bg-[#d81e34] text-white font-bold font-heading rounded-2xl transition-all duration-300 shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-[1.01] text-base mt-2"
                  >
                    পেমেন্ট নিশ্চিত করুন ও জমা দিন
                  </button>
                </form>
              )}

              {/* ── STEP: PROCESSING ── */}
              {step === "processing" && (
                <div className="text-center py-14">
                  <Loader2
                    size={48}
                    className="text-[#D4AF37] animate-spin mx-auto"
                  />
                  <p className="text-white font-heading font-bold text-base sm:text-lg mt-5">
                    অর্ডার প্রসেস করা হচ্ছে...
                  </p>
                  <p className="text-white/50 font-heading text-xs mt-2">
                    একটু অপেক্ষা করুন, বন্ধ করবেন না।
                  </p>
                </div>
              )}

              {/* ── STEP: SUCCESS ── */}
              {step === "success" && (
                <div className="text-center py-6 sm:py-8">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#006a4e]/20 border-2 border-[#006a4e] mx-auto mb-5"
                  >
                    <CheckCircle size={44} className="text-[#006a4e]" />
                  </motion.div>

                  <h4 className="text-white font-heading font-bold text-xl sm:text-2xl">
                    ধন্যবাদ!
                  </h4>

                  <p className="text-white/85 text-sm mt-4 max-w-xs mx-auto font-heading leading-relaxed">
                    আপনার পেমেন্ট রিকোয়েস্টটি গ্রহণ করা হয়েছে। ট্রানজেকশন যাচাই সম্পন্ন হওয়ার পর খুব শীঘ্রই আপনার প্রদত্ত ইমেইলে পিডিএফ বইটি পাঠিয়ে দেওয়া হবে।
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 bg-[#006a4e]/15 border border-[#006a4e]/30 rounded-2xl px-4 py-2.5">
                    <Mail size={14} className="text-[#006a4e] shrink-0" />
                    <p className="text-[#C2CFC8] text-xs font-heading">
                      <span className="text-white font-bold">{formData.email}</span> — এ কনফার্মেশন পাঠানো হয়েছে।
                    </p>
                  </div>

                  <p className="text-white/40 text-[11px] mt-4 font-heading">
                    (ইনবক্সে না পেলে Spam/Junk ফোল্ডার চেক করুন।)
                  </p>

                  <button
                    onClick={resetAndClose}
                    className="mt-6 px-8 py-3 min-h-[44px] bg-[#D4AF37] hover:bg-[#E8C85A] text-[#060E1F] rounded-2xl text-sm font-bold transition-colors font-heading shadow-md hover:scale-105"
                  >
                    ঠিক আছে, বন্ধ করুন
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
