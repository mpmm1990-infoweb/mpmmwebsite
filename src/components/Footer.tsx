import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  footerText?: string;
  footerTextBn?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  addressBn?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
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
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
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
                <span className="text-2xl font-bold text-[#D4AF37] font-heading">🇧🇩 PPMP</span>
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
                  { href: "/history", labelBn: "আমাদের সম্পর্কে", labelEn: "About Us" },
                  { href: "/videos", labelBn: "ভিডিও আর্কাইভ", labelEn: "Video Archive" },
                  { href: "/books", labelBn: "ডিজিটাল লাইব্রেরি", labelEn: "Digital Library" },
                  { href: "/gallery", labelBn: "ঐতিহাসিক গ্যালারি", labelEn: "Historical Gallery" },
                  { href: "/members", labelBn: "জীবনের গল্প ও সদস্যগণ", labelEn: "Journeys & Members" },
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
                    <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="lang-bn-only">{addressBn || address}</span>
                    <span className="lang-en-only">{address || addressBn}</span>
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

            {/* Developer Column */}
            <div>
              <h4 className="font-heading text-lg text-[#D4AF37] font-bold mb-4">
                <span className="lang-bn-only">ডেভেলপার</span>
                <span className="lang-en-only">Developer</span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="YOUR_PORTFOLIO_LINK_HERE"
                    target="_blank"
                    rel="noopener noreferrer"
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
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <div className="text-xs text-white/70">
              <p className="font-heading text-sm lang-bn-only">© {currentYear} আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০। সর্বস্বত্ব সংরক্ষিত।</p>
              <p className="font-heading text-sm lang-en-only">© {currentYear} Modern Police Memorial Museum — First Batch 1990. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
