import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Bengali } from "next/font/google";
import { sanityFetch } from "@/sanity/client";
import { GLOBAL_SETTINGS_QUERY } from "@/lib/queries";
import DevSignature from "@/components/DevSignature";
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

interface GlobalSettingsData {
  siteTitle?: string;
  siteTitleBn?: string;
  siteDescription?: string;
  favicon?: {
    asset?: {
      url?: string;
    };
  };
}

export async function generateMetadata(): Promise<Metadata> {
  let settings: GlobalSettingsData | null = null;
  try {
    settings = await sanityFetch<GlobalSettingsData>(GLOBAL_SETTINGS_QUERY, {}, ["globalSettings"]);
  } catch {
    // fallback
  }

  const faviconUrl = settings?.favicon?.asset?.url || undefined;

  return {
    title: settings?.siteTitle
      ? `${settings.siteTitleBn || settings.siteTitle} — Modern Police Memorial Museum`
      : "Modern Police Memorial Museum — আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০",
    description:
      settings?.siteDescription ||
      "A heritage memorial website honoring the Modern Police First Batch of 1990. Explore history, videos, gallery, digital library, and prominent members.",
    keywords: [
      "Modern Police Memorial Museum",
      "আধুনিক পুলিশ প্রথম ব্যাচ",
      "1990",
      "Bangladesh Police",
      "Memorial",
    ],
    authors: [{ name: "Tanvir Kabir", url: "https://about.me/tanvir-kabir" }],
    creator: "Tanvir Kabir",
    verification: {
      google: "iYRn2EL7DM1rLsqwBiKOiTEi7Pnup_3tVPK75x9SJ2k",
    },
    icons: faviconUrl
      ? {
          icon: [{ url: faviconUrl }],
          shortcut: [{ url: faviconUrl }],
          apple: [{ url: faviconUrl }],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: GlobalSettingsData | null = null;
  try {
    settings = await sanityFetch<GlobalSettingsData>(GLOBAL_SETTINGS_QUERY, {}, ["globalSettings"]);
  } catch {
    // fallback
  }

  const faviconUrl = settings?.favicon?.asset?.url;

  return (
    <html
      lang="bn"
      data-lang="bn"
      className={`${playfair.variable} ${inter.variable} ${notoSerifBengali.variable} h-full overflow-x-hidden`}
    >
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} sizes="any" />
            <link rel="shortcut icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden w-full max-w-full">
        <DevSignature />
        {children}
      </body>
    </html>
  );
}
