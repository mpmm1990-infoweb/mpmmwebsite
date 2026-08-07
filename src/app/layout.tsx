import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-bn",
  subsets: ["bengali"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Modern Police Memorial Museum — আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০",
  description:
    "A heritage memorial website honoring the Modern Police First Batch of 1990. Explore history, videos, gallery, digital library, and prominent members.",
  keywords: [
    "Modern Police Memorial Museum",
    "আধুনিক পুলিশ প্রথম ব্যাচ",
    "1990",
    "Bangladesh Police",
    "Memorial",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-lang="bn"
      className={`${playfair.variable} ${inter.variable} ${notoSerifBengali.variable} h-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
