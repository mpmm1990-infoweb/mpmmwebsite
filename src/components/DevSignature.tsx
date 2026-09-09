"use client";

import { useEffect } from "react";

export default function DevSignature() {
  useEffect(() => {
    console.log(
      "%c\uD83D\uDE80 Developed by Tanvir Kabir | https://about.me/tanvir-kabir",
      "color: #D4AF37; font-size: 14px; font-weight: bold; background: #060E1F; padding: 6px 12px; border-radius: 6px; border-left: 3px solid #006a4e;"
    );
  }, []);

  return null;
}
