"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  bookId: string;
  price: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  bookTitle,
  bookId,
  price,
}: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    paymentMethod: "bkash" as "bkash" | "nagad",
    paymentRef: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          bookTitle,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
          paymentRef: formData.paymentRef,
          amount: price,
        }),
      });

      if (!res.ok) throw new Error("Purchase failed");
      setStep("success");
    } catch {
      setStep("form");
      alert("Something went wrong. Please try again.");
    }
  };

  const resetAndClose = () => {
    setStep("form");
    setFormData({ email: "", phone: "", paymentMethod: "bkash", paymentRef: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#060E1F]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="glass-panel rounded-3xl w-full max-w-md my-auto overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#0B1B3D]/95 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass-panel-dark bg-[#060E1F] p-4 sm:p-6 relative border-b border-[#D4AF37]/20 shrink-0">
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 text-white/70 hover:text-[#D4AF37] transition-colors p-2 rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 pr-8">
                <CreditCard className="text-[#D4AF37] shrink-0" size={24} />
                <div className="min-w-0">
                  <h3 className="text-white font-heading font-bold text-lg sm:text-xl truncate">
                    ডিজিটাল বই ক্রয় / Purchase
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm font-medium truncate">{bookTitle}</p>
                </div>
              </div>
              <div className="mt-3 text-[#D4AF37] text-2xl sm:text-3xl font-heading font-bold">
                ৳{price}
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              {step === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      ইমেইল / Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner min-h-[44px]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      ফোন নম্বর / Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner min-h-[44px]"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      পেমেন্ট মেথড / Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["bkash", "nagad"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: method })
                          }
                          className={`px-4 py-3 min-h-[44px] rounded-2xl border text-sm font-bold transition-all ${
                            formData.paymentMethod === method
                              ? "border-[#f42a41] bg-[#f42a41]/20 text-white shadow-md"
                              : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {method === "bkash" ? "bKash" : "Nagad"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      ট্রানজেকশন আইডি / TrxID
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.paymentRef}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentRef: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner min-h-[44px]"
                      placeholder="e.g. ABC123XYZ"
                    />
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-heading">
                    আমাদের {formData.paymentMethod === "bkash" ? "bKash" : "Nagad"}{" "}
                    নম্বরে ৳{price} সেন্ড মানি করুন এবং ট্রানজেকশন আইডি উপরে প্রদান করুন।
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 min-h-[48px] bg-[#f42a41] hover:bg-[#d81e34] text-white font-bold font-heading rounded-2xl transition-all duration-300 shadow-[0_8px_24px_rgba(244,42,65,0.35)] text-base"
                  >
                    পেমেন্ট সাবমিট করুন
                  </button>
                </form>
              )}

              {step === "processing" && (
                <div className="text-center py-12">
                  <Loader2
                    size={44}
                    className="text-[#D4AF37] animate-spin mx-auto"
                  />
                  <p className="text-white font-heading font-bold text-base sm:text-lg mt-4">
                    অর্ডার প্রসেস করা হচ্ছে...
                  </p>
                </div>
              )}

              {step === "success" && (
                <div className="text-center py-6 sm:py-8">
                  <CheckCircle
                    size={52}
                    className="text-[#006a4e] mx-auto"
                  />
                  <h4 className="text-white font-heading font-bold text-xl sm:text-2xl mt-4">
                    পেমেন্ট সফল হয়েছে!
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xs mx-auto font-heading leading-relaxed">
                    আপনার পেমেন্ট রিসিভ করা হয়েছে। ভেরিফিকেশনের পর ইমেইলে ডাউনলোড লিংক পেয়ে যাবেন।
                  </p>
                  <button
                    onClick={resetAndClose}
                    className="mt-6 px-8 py-3 min-h-[44px] bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-2xl text-sm font-bold transition-colors font-heading shadow-md"
                  >
                    বন্ধ করুন
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
