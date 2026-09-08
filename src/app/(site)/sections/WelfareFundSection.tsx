"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Coins, Receipt, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export interface WelfareFundData {
  totalCollection?: number;
  totalExpense?: number;
}

interface WelfareFundSectionProps {
  data?: WelfareFundData | null;
}

function CountUpNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const formattedEn = `৳ ${displayValue.toLocaleString("en-IN")}`;
  const formattedBn = `৳ ${displayValue.toLocaleString("bn-BD")}`;

  return (
    <span ref={ref} className="inline-block tabular-nums font-bold">
      <span className="lang-en-only">{formattedEn}</span>
      <span className="lang-bn-only">{formattedBn}</span>
    </span>
  );
}

export default function WelfareFundSection({ data }: WelfareFundSectionProps) {
  const totalCollection = Number(data?.totalCollection) || 0;
  const totalExpense = Number(data?.totalExpense) || 0;
  const currentBalance = totalCollection - totalExpense;

  // Percentage calculations
  const expensePercentage =
    totalCollection > 0
      ? Math.min(100, Math.max(0, (totalExpense / totalCollection) * 100))
      : 0;
  const balancePercentage =
    totalCollection > 0
      ? Math.max(0, 100 - expensePercentage)
      : 100;

  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <section
      id="welfare-fund"
      className="py-16 sm:py-20 md:py-28 heritage-pattern w-full max-w-full overflow-x-hidden relative"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#006a4e]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading (No Subtitle as per user requirement) */}
        <SectionHeading
          title="Welfare Fund Balance"
          titleBn="ওয়েলফেয়ার ফান্ড ব্যালেন্স"
        />

        {/* 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-8">
          {/* Card 1: Total Fund Collected (Blue/Gold theme) */}
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-[#D4AF37]/30 bg-[#0B1B3D]/80 hover:bg-[#132B5E]/85 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1B3D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-inner group-hover:scale-105 transition-transform">
                    <Coins size={28} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 font-medium">
                    <span className="lang-en-only">Total Collection</span>
                    <span className="lang-bn-only">মোট প্রাপ্ত অনুদান</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-medium text-[#C2CFC8] mb-2">
                  <span className="lang-en-only">Total Fund Collected</span>
                  <span className="lang-bn-only">সর্বমোট প্রাপ্ত অনুদান</span>
                </h3>

                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#D4AF37] font-heading drop-shadow-md">
                  <CountUpNumber value={totalCollection} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94A59B]">
                <span className="lang-en-only">All batches & contributors</span>
                <span className="lang-bn-only">সকল সদস্য ও শুভানুধ্যায়ী</span>
                <span className="text-[#D4AF37] font-semibold">100%</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Total Expenses (Red/Gold theme) */}
          <ScrollReveal delay={0.2}>
            <div className="h-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-[#f42a41]/40 bg-[#0B1B3D]/80 hover:bg-[#132B5E]/85 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#060E1F] border border-[#f42a41]/50 flex items-center justify-center text-[#f42a41] shadow-inner group-hover:scale-105 transition-transform">
                    <Receipt size={28} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#f42a41]/15 text-[#f42a41] border border-[#f42a41]/40 font-medium">
                    <span className="lang-en-only">Disbursed</span>
                    <span className="lang-bn-only">মোট ব্যয়</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-medium text-[#C2CFC8] mb-2">
                  <span className="lang-en-only">Total Expenses</span>
                  <span className="lang-bn-only">কল্যাণমূলক কাজে মোট ব্যয়</span>
                </h3>

                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#f42a41] font-heading drop-shadow-md">
                  <CountUpNumber value={totalExpense} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94A59B]">
                <span className="lang-en-only">Welfare & support funds</span>
                <span className="lang-bn-only">চিকিৎসা ও কল্যাণ অনুদান</span>
                <span className="text-[#f42a41] font-semibold">
                  {expensePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Current Balance (Emerald Green/Gold glowing theme) */}
          <ScrollReveal delay={0.3}>
            <div className="h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#D4AF37] bg-gradient-to-br from-[#006a4e]/50 via-[#0B1B3D]/90 to-[#060E1F]/95 hover:border-[#E8C85A] transition-all duration-300 shadow-[0_0_30px_rgba(0,106,78,0.35),0_0_15px_rgba(212,175,55,0.2)] group relative overflow-hidden">
              {/* Highlight decorative corner gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/25 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#006a4e]/40 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg group-hover:scale-105 transition-transform">
                    <ShieldCheck size={30} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#006a4e]/50 text-white border border-[#D4AF37] font-semibold shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    <span className="lang-en-only">Current Balance</span>
                    <span className="lang-bn-only">বর্তমান তহবিল</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-[#F4F7F5] mb-2">
                  <span className="lang-en-only">Current Balance</span>
                  <span className="lang-bn-only">বর্তমানে সংরক্ষিত তহবিল</span>
                </h3>

                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#E8C85A] font-heading font-extrabold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <CountUpNumber value={currentBalance} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#C2CFC8]">
                <span className="lang-en-only">Available in reserve</span>
                <span className="lang-bn-only">সংরক্ষিত স্থিত স্থিতি</span>
                <span className="text-[#E8C85A] font-bold">
                  {balancePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sleek Horizontal Progress Bar (Expenses vs Remaining Balance) */}
        <ScrollReveal delay={0.4} className="mt-10 sm:mt-14">
          <div
            ref={barRef}
            className="rounded-2xl glass-panel p-6 sm:p-8 border border-[#D4AF37]/25 bg-[#060E1F]/80 backdrop-blur-xl shadow-2xl"
          >
            {/* Header / Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                  <span className="lang-en-only">Fund Utilization & Reserve Ratio</span>
                  <span className="lang-bn-only">তহবিল ব্যবহার ও উদ্বৃত্ত অনুপাত</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#C2CFC8] mt-1">
                  <span className="lang-en-only">
                    Comparison between completed welfare support and currently available balance
                  </span>
                  <span className="lang-bn-only">
                    সম্পন্ন কল্যাণমূলক অনুদান ও বর্তমানে সংরক্ষিত ব্যালেন্সের তুলনামূলক চিত্র
                  </span>
                </p>
              </div>

              {/* Badges Legend */}
              <div className="flex items-center gap-4 text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f42a41] shadow-[0_0_8px_rgba(244,42,65,0.7)]" />
                  <span className="text-[#C2CFC8]">
                    <span className="lang-en-only">Expenses:</span>
                    <span className="lang-bn-only">ব্যয়:</span>{" "}
                    <strong className="text-white">{expensePercentage.toFixed(1)}%</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#008764] shadow-[0_0_8px_rgba(0,135,100,0.7)]" />
                  <span className="text-[#C2CFC8]">
                    <span className="lang-en-only">Balance:</span>
                    <span className="lang-bn-only">উদ্বৃত্ত:</span>{" "}
                    <strong className="text-white">{balancePercentage.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Bar Track */}
            <div className="w-full h-5 sm:h-6 rounded-full bg-[#0B1B3D] border border-[#D4AF37]/30 p-1 flex overflow-hidden shadow-inner">
              {/* Expense Portion (Red) */}
              <motion.div
                className="h-full rounded-l-full bg-gradient-to-r from-[#f42a41] to-[#d81e34] shadow-[0_0_12px_rgba(244,42,65,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: barInView ? `${expensePercentage}%` : "0%" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Balance Portion (Green / Gold) */}
              <motion.div
                className="h-full rounded-r-full bg-gradient-to-r from-[#006a4e] via-[#008764] to-[#D4AF37] shadow-[0_0_12px_rgba(0,106,78,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: barInView ? `${balancePercentage}%` : "0%" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Bottom Details */}
            <div className="flex justify-between items-center mt-3 text-xs text-[#94A59B]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#f42a41] font-semibold">
                  <span className="lang-en-only">Disbursed:</span>
                  <span className="lang-bn-only">ব্যয়িত:</span>
                </span>
                <span className="lang-en-only">৳ {totalExpense.toLocaleString("en-IN")}</span>
                <span className="lang-bn-only">৳ {totalExpense.toLocaleString("bn-BD")}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-semibold">
                  <span className="lang-en-only">Available:</span>
                  <span className="lang-bn-only">সংরক্ষিত:</span>
                </span>
                <span className="lang-en-only">৳ {currentBalance.toLocaleString("en-IN")}</span>
                <span className="lang-bn-only">৳ {currentBalance.toLocaleString("bn-BD")}</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
