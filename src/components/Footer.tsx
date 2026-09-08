"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, X, User } from "lucide-react";
import { urlFor } from "@/sanity/image";

interface FooterProps {
  footerText?: string;
  footerTextBn?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  addressBn?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  // Footer Admin Panel
  footerAdminName?: string;
  footerAdminNameBn?: string;
  footerAdminTitle?: string;
  footerAdminTitleBn?: string;
  footerAdminImage?: { asset: { _ref: string } } | null;
  footerAdminBio?: string;
  footerAdminBioBn?: string;
}

export default function Footer({
  footerText = "Modern Police Memorial Museum - First Batch 1990",
  footerTextBn = "আধুনিক পুলিশ স্মৃতি জাদুঘর - প্রথম ব্যাচ ১৯৯০",
  contactEmail,
  contactPhone,
  address,
  addressBn,
  facebookUrl,
  youtubeUrl,
  footerAdminName,
  footerAdminNameBn,
  footerAdminTitle,
  footerAdminTitleBn,
  footerAdminImage,
  footerAdminBio,
  footerAdminBioBn,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasAdminPanel =
    footerAdminName || footerAdminNameBn;

  return (
    <>
      {/* ─────────────── Footer ─────────────── */}
      <footer className="relative mt-20 text-white/90 w-full max-w-full overflow-x-hidden">
        {/* Top Metallic Gold Glow Accent */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_12px_rgba(212,175,55,0.6)]" />

        {/* Dark Glass Footer Box */}
        <div className="glass-panel-dark bg-[#060E1F]/95 border-t border-[#D4AF37]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-10">

              {/* About Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#D4AF37] font-heading">
                    🇧🇩 PPMP
                  </span>
                </div>
                <p className="text-base leading-relaxed font-heading mb-2 text-white font-medium lang-bn-only">
                  {footerTextBn}
                </p>
                <p className="text-base leading-relaxed font-heading mb-2 text-white font-medium lang-en-only">
                  {footerText}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading text-lg text-[#D4AF37] font-bold mb-4">
                  <span className="lang-bn-only">গুরুত্বপূর্ণ লিংক</span>
                  <span className="lang-en-only">Quick Links</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { href: "/", labelBn: "হোম", labelEn: "Home" },
                    {
                      href: "/about-us",
                      labelBn: "আমাদের সম্পর্কে",
                      labelEn: "About Us",
                    },
                    {
                      href: "/videos",
                      labelBn: "ভিডিও আর্কাইভ",
                      labelEn: "Video Archive",
                    },
                    {
                      href: "/books",
                      labelBn: "ডিজিটাল লাইব্রেরি",
                      labelEn: "Digital Library",
                    },
                    {
                      href: "/gallery",
                      labelBn: "ঐতিহাসিক গ্যালারি",
                      labelEn: "Historical Gallery",
                    },
                    {
                      href: "/words-and-verses",
                      labelBn: "কথা ও গাথা",
                      labelEn: "Words & Verses",
                    },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-white/80 hover:text-[#D4AF37] transition-all duration-300 min-h-[36px]"
                      >
                        <span className="text-[15px] font-heading group-hover:translate-x-1 transition-transform lang-bn-only">
                          {link.labelBn}
                        </span>
                        <span className="text-[15px] font-heading group-hover:translate-x-1 transition-transform lang-en-only">
                          {link.labelEn}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h4 className="font-heading text-lg text-[#D4AF37] font-bold mb-4">
                  <span className="lang-bn-only">যোগাযোগ</span>
                  <span className="lang-en-only">Contact Us</span>
                </h4>
                <ul className="space-y-3">
                  {contactEmail && (
                    <li className="flex items-center gap-3 text-sm text-white/80">
                      <Mail size={16} className="text-[#D4AF37] shrink-0" />
                      <a
                        href={`mailto:${contactEmail}`}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </li>
                  )}
                  {contactPhone && (
                    <li className="flex items-center gap-3 text-sm text-white/80">
                      <Phone size={16} className="text-[#D4AF37] shrink-0" />
                      <a
                        href={`tel:${contactPhone}`}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        {contactPhone}
                      </a>
                    </li>
                  )}
                  {(address || addressBn) && (
                    <li className="flex items-start gap-3 text-sm text-white/80">
                      <MapPin
                        size={16}
                        className="text-[#D4AF37] shrink-0 mt-0.5"
                      />
                      <span className="lang-bn-only">
                        {addressBn || address}
                      </span>
                      <span className="lang-en-only">
                        {address || addressBn}
                      </span>
                    </li>
                  )}
                </ul>

                {/* Social Links */}
                {(facebookUrl || youtubeUrl) && (
                  <div className="flex items-center gap-4 mt-6">
                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-white/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060E1F] transition-all duration-300 shadow-md"
                        aria-label="Facebook"
                      >
                        <span className="text-sm font-bold">f</span>
                      </a>
                    )}
                    {youtubeUrl && (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-white/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060E1F] transition-all duration-300 shadow-md"
                        aria-label="YouTube"
                      >
                        <span className="text-sm font-bold">▶</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Admin Panel Column */}
              <div>
                <h4 className="font-heading text-lg text-[#D4AF37] font-bold mb-4">
                  <span className="lang-bn-only">অ্যাডমিন প্যানেল</span>
                  <span className="lang-en-only">Admin Panel</span>
                </h4>

                {hasAdminPanel ? (
                  <div>
                    <p className="text-xs text-[#94A59B] font-heading mb-2">
                      <span className="lang-bn-only">পরিচালনাকারী</span>
                      <span className="lang-en-only">Managed by</span>
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group inline-flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer text-left"
                    >
                      {footerAdminImage?.asset ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors shrink-0">
                          <Image
                            src={urlFor(footerAdminImage)
                              .width(64)
                              .height(64)
                              .quality(80)
                              .url()}
                            alt={footerAdminName || "Admin"}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#0B1B3D] border border-[#D4AF37]/40 group-hover:border-[#D4AF37] flex items-center justify-center transition-colors shrink-0">
                          <User size={14} className="text-[#D4AF37]" />
                        </div>
                      )}
                      <span className="font-heading font-semibold text-sm group-hover:translate-x-0.5 transition-transform">
                        <span className="lang-bn-only">
                          {footerAdminNameBn || footerAdminName}
                        </span>
                        <span className="lang-en-only">
                          {footerAdminName || footerAdminNameBn}
                        </span>
                      </span>
                    </button>

                    {(footerAdminTitle || footerAdminTitleBn) && (
                      <p className="text-[#D4AF37]/70 text-xs font-heading mt-2 pl-10">
                        <span className="lang-bn-only">
                          {footerAdminTitleBn || footerAdminTitle}
                        </span>
                        <span className="lang-en-only">
                          {footerAdminTitle || footerAdminTitleBn}
                        </span>
                      </p>
                    )}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-all duration-300 min-h-[36px]"
                      >
                        <span className="text-[15px] font-heading group-hover:translate-x-1 transition-transform lang-bn-only">
                          ওয়েবসাইট ভিজিট করুন
                        </span>
                        <span className="text-[15px] font-heading group-hover:translate-x-1 transition-transform lang-en-only">
                          Visit Website
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <div className="text-xs text-white/70">
                <p className="font-heading text-sm lang-bn-only">
                  © {currentYear} আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০। সর্বস্বত্ব
                  সংরক্ষিত।
                </p>
                <p className="font-heading text-sm lang-en-only">
                  © {currentYear} Modern Police Memorial Museum — First Batch
                  1990. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────── Floating Admin Modal ─────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-[#0B1B3D] via-[#060E1F] to-[#0B1B3D] border border-[#D4AF37]/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#D4AF37]/20 border border-white/20 hover:border-[#D4AF37]/50 text-white/70 hover:text-[#D4AF37] transition-all duration-200 z-10"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Admin Image */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-xl scale-125 pointer-events-none" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37]/70 shadow-[0_0_24px_rgba(212,175,55,0.35)] overflow-hidden bg-[#0B1B3D]">
                  {footerAdminImage?.asset ? (
                    <Image
                      src={urlFor(footerAdminImage)
                        .width(224)
                        .height(224)
                        .quality(90)
                        .url()}
                      alt={footerAdminName || "Admin"}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D4AF37]">
                      <User size={40} />
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
                <span className="lang-bn-only">
                  {footerAdminNameBn || footerAdminName}
                </span>
                <span className="lang-en-only">
                  {footerAdminName || footerAdminNameBn}
                </span>
              </h3>

              {/* Admin Title */}
              {(footerAdminTitle || footerAdminTitleBn) && (
                <p className="text-[#D4AF37] font-heading font-semibold text-sm sm:text-base mb-4">
                  <span className="lang-bn-only">
                    {footerAdminTitleBn || footerAdminTitle}
                  </span>
                  <span className="lang-en-only">
                    {footerAdminTitle || footerAdminTitleBn}
                  </span>
                </p>
              )}

              {/* Divider */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mb-4" />

              {/* Admin Bio */}
              {(footerAdminBio || footerAdminBioBn) && (
                <p className="text-white/75 text-sm leading-relaxed font-heading">
                  <span className="lang-bn-only">
                    {footerAdminBioBn || footerAdminBio}
                  </span>
                  <span className="lang-en-only">
                    {footerAdminBio || footerAdminBioBn}
                  </span>
                </p>
              )}
            </div>

            {/* Bottom gold accent */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>
        </div>
      )}
    </>
  );
}
