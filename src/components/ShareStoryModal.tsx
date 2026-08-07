"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, Feather } from "lucide-react";

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareStoryModal({
  isOpen,
  onClose,
}: ShareStoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    story: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      alert("দুঃখিত, কোনো ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({ name: "", designation: "", email: "", story: "" });
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
          onClick={handleReset}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="glass-panel rounded-3xl w-full max-w-lg my-auto overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#0B1B3D]/95 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="glass-panel-dark bg-[#060E1F] p-4 sm:p-6 relative border-b border-[#D4AF37]/20 shrink-0">
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 text-white/70 hover:text-[#D4AF37] transition-colors p-2 rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Feather size={20} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold text-lg sm:text-xl">
                    <span className="lang-bn-only">আপনার গল্প শেয়ার করুন</span>
                    <span className="lang-en-only">Share Your Journey Story</span>
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm font-medium">
                    <span className="lang-bn-only">কর্মজীবনের অভিজ্ঞতা ও স্মৃতিগাথা পাঠিয়ে দিন</span>
                    <span className="lang-en-only">Submit your experiences & officer stories</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <span className="lang-bn-only">আপনার নাম *</span>
                      <span className="lang-en-only">Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner min-h-[44px]"
                      placeholder="e.g. মোঃ শরিফুল ইসলাম"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <span className="lang-bn-only">পদবী / ব্যাচ (ঐচ্ছিক)</span>
                      <span className="lang-en-only">Rank / Designation (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({ ...formData, designation: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner min-h-[44px]"
                      placeholder="e.g. সহকারী পুলিশ সুপার (অবসরপ্রাপ্ত)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5 font-heading">
                      <span className="lang-bn-only">ইমেইল ঠিকানা *</span>
                      <span className="lang-en-only">Email Address *</span>
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
                      <span className="lang-bn-only">আপনার গল্প / অভিজ্ঞতা *</span>
                      <span className="lang-en-only">Your Story / Experience *</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.story}
                      onChange={(e) =>
                        setFormData({ ...formData, story: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:ring-2 focus:ring-[#f42a41] focus:border-[#f42a41] outline-none transition shadow-inner"
                      placeholder="এখানে আপনার গল্প বা অভিজ্ঞতা লিখুন..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 min-h-[48px] bg-[#f42a41] hover:bg-[#d81e34] text-white font-bold font-heading rounded-2xl transition-all duration-300 shadow-[0_8px_24px_rgba(244,42,65,0.35)] text-base flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        <span className="lang-bn-only">গল্পটি পাঠিয়ে দিন</span>
                        <span className="lang-en-only">Submit Story</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle size={56} className="text-[#006a4e] mx-auto mb-4" />
                  <h4 className="text-white font-heading font-bold text-2xl">
                    <span className="lang-bn-only">গল্পটি সফলভাবে জমা হয়েছে!</span>
                    <span className="lang-en-only">Story Submitted Successfully!</span>
                  </h4>
                  <p className="text-white/80 text-sm mt-3 leading-relaxed font-heading max-w-sm mx-auto">
                    <span className="lang-bn-only">
                      আপনার দেওয়া ইমেইলে একটি নিশ্চিতকরণ বার্তা পাঠানো হয়েছে। পর্যালোচনার পর এটি জাদুঘরে যোগ করা হবে।
                    </span>
                    <span className="lang-en-only">
                      A confirmation email has been sent to your inbox. Once reviewed, it will be published to the museum stories archive.
                    </span>
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-8 py-3 bg-[#f42a41] text-white font-bold font-heading rounded-2xl shadow-md hover:bg-[#d81e34] transition-all"
                  >
                    <span className="lang-bn-only">বন্ধ করুন</span>
                    <span className="lang-en-only">Close</span>
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
