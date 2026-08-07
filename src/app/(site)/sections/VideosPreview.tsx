import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import VideoEmbed from "@/components/VideoEmbed";

interface VideoData {
  _id: string;
  title?: string;
  titleBn?: string;
  youtubeUrl?: string;
  description?: string;
}

export default function VideosPreview({ data }: { data: unknown[] }) {
  const videos = (data || []) as VideoData[];

  return (
    <section className="py-16 sm:py-20 md:py-28 heritage-pattern relative w-full max-w-full overflow-x-hidden">
      {/* Gold accent top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Video Archive"
          titleBn="ভিডিও আর্কাইভ"
        />

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {videos.map((video, index) => (
              <ScrollReveal key={video._id} delay={index * 0.15}>
                <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-[#D4AF37]/20 shadow-2xl hover:border-[#D4AF37]/50 hover:scale-[1.02] transition-all duration-300 group">
                  {video.youtubeUrl && (
                    <VideoEmbed
                      youtubeUrl={video.youtubeUrl}
                      title={video.title}
                    />
                  )}
                  <div className="mt-4">
                    <h3 className="text-white font-heading font-bold text-base line-clamp-2 leading-snug">
                      <span className="lang-bn-only">{video.titleBn || video.title}</span>
                      <span className="lang-en-only">{video.title || video.titleBn}</span>
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl p-6 sm:p-8 max-w-lg mx-auto border border-[#D4AF37]/20 shadow-xl">
            <Play size={56} className="text-[#D4AF37] mx-auto mb-4" />
            <p className="text-white/90 font-heading text-lg font-medium">
              <span className="lang-bn-only">সিএমএস-এ ভিডিও যোগ করার পর এখানে প্রদর্শিত হবে।</span>
              <span className="lang-en-only">Videos will appear here once added to CMS.</span>
            </p>
          </div>
        )}

        <ScrollReveal className="text-center mt-12 sm:mt-14">
          <Link
            href="/videos"
            className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 bg-[#f42a41] hover:bg-[#d81e34] text-white rounded-full font-bold font-heading text-base shadow-[0_8px_24px_rgba(244,42,65,0.35)] hover:scale-105 transition-all duration-300 group border border-white/20"
          >
            <span className="font-heading lang-bn-only">সকল ভিডিও দেখুন</span>
            <span className="lang-en-only">View All Videos</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1.5 transition-transform shrink-0"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
