"use client";

import { useState } from "react";
import { Search, Play } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import VideoEmbed from "@/components/VideoEmbed";

export interface VideoData {
  _id: string;
  title?: string;
  titleBn?: string;
  youtubeUrl?: string;
  description?: string;
  descriptionBn?: string;
  publishedAt?: string;
}

interface VideosClientProps {
  videos: VideoData[];
}

export default function VideosClient({ videos }: VideosClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const titleMatch = video.title?.toLowerCase().includes(term);
    const titleBnMatch = video.titleBn?.toLowerCase().includes(term);
    const descMatch = video.description?.toLowerCase().includes(term);
    const descBnMatch = video.descriptionBn?.toLowerCase().includes(term);
    return titleMatch || titleBnMatch || descMatch || descBnMatch;
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-10 sm:mb-14 max-w-md mx-auto">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite-dark/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search video archive..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md text-white text-sm placeholder:text-white/40 shadow-liquid focus:outline-none focus:ring-2 focus:ring-flag-red/60 focus:border-flag-red transition"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video, index) => (
            <ScrollReveal key={video._id} delay={index * 0.1}>
              <div className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-3xl border border-white/20 shadow-liquid flex flex-col justify-between group">
                <div>
                  {video.youtubeUrl && (
                    <VideoEmbed
                      youtubeUrl={video.youtubeUrl}
                      title={video.title}
                    />
                  )}
                  <div className="mt-4">
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug">
                      {video.titleBn || video.title}
                    </h3>
                    {video.titleBn && (
                      <p className="text-offwhite-dark/60 text-xs mt-1 uppercase tracking-widest font-medium">
                        {video.title}
                      </p>
                    )}
                    {video.descriptionBn ? (
                      <p className="text-white/80 text-sm mt-3 line-clamp-3 font-heading leading-relaxed">
                        {video.descriptionBn}
                      </p>
                    ) : video.description ? (
                      <p className="text-white/70 text-sm mt-3 line-clamp-3 leading-relaxed">
                        {video.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {video.publishedAt && (
                  <p className="text-offwhite-dark/60 text-xs mt-4 pt-3 border-t border-white/10 font-heading">
                    {new Date(video.publishedAt).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-white/20 shadow-xl">
          <Play size={56} className="text-flag-red mx-auto mb-4" />
          <p className="text-white font-heading text-xl font-bold">
            কোনো ভিডিও পাওয়া যায়নি
          </p>
          <p className="text-offwhite-dark/70 text-sm mt-1">
            অনুগ্রহ করে অন্য কোনো শব্দ অনুসন্ধান করুন।
          </p>
        </div>
      )}
    </div>
  );
}
