import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/client";
import { GALLERY_QUERY } from "@/lib/queries";
import GalleryClient from "./GalleryClient";
import { GalleryLightboxItem } from "@/components/GalleryLightbox";

export const metadata: Metadata = {
  title: "Gallery — Modern Police Memorial Museum",
  description:
    "A visual journey through decades of service by the Modern Police First Batch of 1990.",
};

export default async function GalleryPage() {
  let images: GalleryLightboxItem[] = [];

  try {
    images = await sanityFetch<GalleryLightboxItem[]>(
      GALLERY_QUERY,
      {},
      ["galleryImage"]
    );
  } catch {
    // CMS not configured
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-28 sm:py-36 md:py-40 bg-navy-gradient overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-md">
            <span className="lang-bn-only">ছবি ও স্মৃতির গ্যালারি</span>
            <span className="lang-en-only">Photo & Memory Gallery</span>
          </h1>
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Gallery Client View with URL Tab Synchronization */}
      <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center py-20 text-[#D4AF37] font-heading text-lg">
                <span className="lang-bn-only">গ্যালারি লোড হচ্ছে...</span>
                <span className="lang-en-only">Loading gallery...</span>
              </div>
            }
          >
            <GalleryClient images={images || []} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
