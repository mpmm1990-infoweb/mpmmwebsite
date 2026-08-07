"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { urlFor } from "@/sanity/image";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavLink {
  label: string;
  labelBn?: string;
  href: string;
}

interface NavbarProps {
  logo?: {
    asset: { _ref: string };
  };
  siteTitle?: string;
  siteTitleBn?: string;
  navLinks?: NavLink[];
}

const defaultNavLinks: NavLink[] = [
  { label: "Home", labelBn: "হোম", href: "/" },
  { label: "History", labelBn: "ইতিহাস", href: "/history" },
  { label: "Videos", labelBn: "ভিডিও", href: "/videos" },
  { label: "Library", labelBn: "লাইব্রেরি", href: "/books" },
  { label: "Gallery", labelBn: "গ্যালারি", href: "/gallery" },
  { label: "Words & Verses", labelBn: "কথা ও গাথা", href: "/members" },
];

export default function Navbar({
  logo,
  siteTitle = "PPMP",
  siteTitleBn = "আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০",
  navLinks,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 pt-2 max-w-full overflow-x-hidden">
      {/* Metallic Gold accent line top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

      {/* Glass Navbar Container */}
      <nav className="glass-panel-dark rounded-2xl mx-auto border border-[#D4AF37]/20 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Site Title */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0">
              {logo?.asset ? (
                <Image
                  src={urlFor(logo).width(48).height(48).url()}
                  alt={siteTitle}
                  width={44}
                  height={44}
                  className="rounded-full border border-[#D4AF37]/60 shadow-md group-hover:scale-105 transition-transform shrink-0"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold font-heading text-base sm:text-lg shrink-0">
                  🇧🇩
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-[#D4AF37] font-heading text-xs sm:text-sm md:text-base font-bold tracking-wide group-hover:text-white transition-colors lang-bn-only truncate">
                  {siteTitleBn}
                </span>
                <span className="text-[#D4AF37] font-bold text-xs sm:text-sm tracking-wide group-hover:text-white transition-colors lang-en-only truncate">
                  {siteTitle}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "text-[#D4AF37] font-bold bg-white/10 shadow-inner"
                        : "text-white/80 hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                  >
                    <span className="text-[15px] font-heading font-medium tracking-wide lang-bn-only">
                      {link.labelBn || link.label}
                    </span>
                    <span className="text-[14px] font-medium tracking-wide lang-en-only">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-1 left-3 right-3 h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="ml-4 pl-4 border-l border-[#D4AF37]/30">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2 shrink-0">
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/90 hover:text-[#D4AF37] transition-colors p-2 min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl bg-white/10 border border-white/10"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/10 rounded-b-2xl bg-[#060E1F]/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-4 space-y-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 min-h-[48px] rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border-l-4 border-[#D4AF37] shadow-md"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="block font-heading text-base lang-bn-only">{link.labelBn || link.label}</span>
                      <span className="block text-sm lang-en-only">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
