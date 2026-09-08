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
  let settings: Record<string, unknown> | null = null;
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
        addressBn={settings?.addressBn as string}
        facebookUrl={settings?.facebookUrl as string}
        youtubeUrl={settings?.youtubeUrl as string}
        footerAdminName={settings?.footerAdminName as string}
        footerAdminNameBn={settings?.footerAdminNameBn as string}
        footerAdminTitle={settings?.footerAdminTitle as string}
        footerAdminTitleBn={settings?.footerAdminTitleBn as string}
        footerAdminImage={
          settings?.footerAdminImage as {
            asset: { _ref: string };
          } | null
        }
        footerAdminBio={settings?.footerAdminBio as string}
        footerAdminBioBn={settings?.footerAdminBioBn as string}
      />
    </>
  );
}
