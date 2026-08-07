import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { VIDEOS_QUERY } from "@/lib/queries";
import { Play } from "lucide-react";
import VideosClient from "./VideosClient";

export const metadata: Metadata = {
  title: "Video Archive — Modern Police Memorial Museum",
  description:
    "Watch historical footage and commemorative videos from the Modern Police First Batch of 1990.",
};

interface VideoData {
  _id: string;
  title?: string;
  titleBn?: string;
  youtubeUrl?: string;
  description?: string;
  descriptionBn?: string;
  publishedAt?: string;
}

export default async function VideosPage() {
  let videos: VideoData[] = [];
  try {
    videos = await sanityFetch<VideoData[]>(VIDEOS_QUERY, {}, ["video"]);
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
            <span className="lang-bn-only">ভিডিও আর্কাইভ</span>
            <span className="lang-en-only">Video Archive</span>
          </h1>
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {videos && videos.length > 0 ? (
            <VideosClient videos={videos} />
          ) : (
            <div className="text-center py-16 glass-panel rounded-3xl p-6 sm:p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
              <Play size={56} className="text-[#D4AF37] mx-auto mb-4" />
              <p className="text-white text-lg sm:text-xl font-bold font-heading">
                <span className="lang-bn-only">সিএমএস-এ ভিডিও যোগ করার পর এখানে প্রদর্শিত হবে।</span>
                <span className="lang-en-only">Videos will appear here once added to CMS.</span>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
