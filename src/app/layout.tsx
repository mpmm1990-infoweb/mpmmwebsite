import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Bengali } from "next/font/google";
import { sanityFetch } from "@/sanity/client";
import { GLOBAL_SETTINGS_QUERY } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch global settings from Sanity
  let settings = null;
  try {
    settings = await sanityFetch<Record<string, unknown>>(
      GLOBAL_SETTINGS_QUERY,
      {},
      ["globalSettings"]
    );
  } catch {
    // CMS not configured yet — use defaults
  }

  return (
    <html
      lang="bn"
      data-lang="bn"
      className={`${playfair.variable} ${inter.variable} ${notoSerifBengali.variable} h-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden w-full max-w-full">
        <Navbar
          logo={settings?.logo as never}
          siteTitle={(settings?.siteTitle as string) || "PPMP"}
          siteTitleBn={
            (settings?.siteTitleBn as string) ||
            "আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০"
          }
          navLinks={settings?.navLinks as never}
        />

        <main className="flex-1 w-full max-w-full overflow-x-hidden pt-[calc(3px+4rem)] md:pt-[calc(3px+5rem)]">
          {children}
        </main>

        <Footer
          footerText={settings?.footerText as string}
          footerTextBn={settings?.footerTextBn as string}
          contactEmail={settings?.contactEmail as string}
          contactPhone={settings?.contactPhone as string}
          address={settings?.address as string}
          facebookUrl={settings?.facebookUrl as string}
          youtubeUrl={settings?.youtubeUrl as string}
        />
      </body>
    </html>
  );
}
