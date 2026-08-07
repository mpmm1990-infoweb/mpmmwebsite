"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<"bn" | "en">("bn");

  // On mount, check if there's a saved language, otherwise default to "bn"
  useEffect(() => {
    const saved = localStorage.getItem("preferred-lang") as "bn" | "en";
    if (saved) {
      setLang(saved);
      document.documentElement.setAttribute("data-lang", saved);
    } else {
      document.documentElement.setAttribute("data-lang", "bn");
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    localStorage.setItem("preferred-lang", newLang);
    document.documentElement.setAttribute("data-lang", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300 bg-[#060E1F]/60 backdrop-blur-md"
      aria-label="Toggle Language"
      title={lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
    >
      <Globe size={15} className="text-[#D4AF37]" />
      <span className="text-xs font-bold text-white tracking-wider">
        {lang === "bn" ? "EN" : "BN"}
      </span>
    </button>
  );
}
