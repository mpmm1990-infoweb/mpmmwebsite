import { sanityFetch } from "@/sanity/client";
import { GLOBAL_SETTINGS_QUERY } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function SiteLayout({
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
    <>
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
    </>
  );
}
