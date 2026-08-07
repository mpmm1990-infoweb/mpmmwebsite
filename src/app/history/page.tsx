import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { HISTORY_QUERY } from "@/lib/queries";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PortableTextRenderer from "./PortableTextRenderer";

export const metadata: Metadata = {
  title: "History — Modern Police Memorial Museum",
  description: "The complete history of the Modern Police First Batch of 1990.",
};

interface TimelineEvent {
  year: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  image?: { asset: { _ref: string } };
}

interface HistoryData {
  title?: string;
  titleBn?: string;
  body?: unknown[];
  coverImage?: { asset: { _ref: string } };
  timeline?: TimelineEvent[];
}

export default async function HistoryPage() {
  let data: HistoryData | null = null;
  try {
    data = await sanityFetch<HistoryData>(HISTORY_QUERY, {}, ["history"]);
  } catch {
    // CMS not configured
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative py-28 sm:py-36 md:py-44 bg-navy-gradient overflow-hidden w-full max-w-full">
        {data?.coverImage?.asset && (
          <Image
            src={urlFor(data.coverImage).width(1920).quality(80).url()}
            alt=""
            fill
            className="object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#006a4e]/85 via-[#0B1B3D]/90 to-[#060E1F]/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
            <span className="lang-bn-only">{data?.titleBn || "আমাদের ইতিহাস"}</span>
            <span className="lang-en-only">{data?.title || "Our History"}</span>
          </h1>
          <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 sm:mt-6 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
        </div>
      </section>

      {/* Body Content */}
      {data?.body && (
        <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl border border-[#D4AF37]/20 shadow-xl prose-heritage">
                <PortableTextRenderer value={data.body} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Timeline */}
      {data?.timeline && data.timeline.length > 0 && (
        <section className="py-12 sm:py-16 md:py-24 heritage-pattern w-full max-w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeading title="Timeline of Honor" titleBn="গুরুত্বপূর্ণ ঘটনাবলী" />

            <div className="relative mt-10 sm:mt-12">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

              {data.timeline.map((event, index) => (
                <ScrollReveal
                  key={index}
                  delay={index * 0.1}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`relative flex flex-col md:flex-row items-start gap-6 mb-10 sm:mb-12 ${
                      index % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Year badge */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-[#060E1F] rounded-full border-2 border-[#D4AF37] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <span className="text-[#D4AF37] text-xs font-bold font-heading">
                        {event.year}
                      </span>
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                        index % 2 === 0
                          ? "md:pr-8 md:text-right"
                          : "md:pl-8"
                      }`}
                    >
                      <div className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-3xl border border-[#D4AF37]/20 shadow-heritage">
                        <h3 className="font-heading font-bold text-white text-lg sm:text-xl leading-snug">
                          <span className="lang-bn-only">{event.titleBn || event.title}</span>
                          <span className="lang-en-only">{event.title || event.titleBn}</span>
                        </h3>
                        {event.descriptionBn || event.description ? (
                          <p className="text-white/85 text-sm mt-3 leading-relaxed font-heading">
                            <span className="lang-bn-only">{event.descriptionBn || event.description}</span>
                            <span className="lang-en-only">{event.description || event.descriptionBn}</span>
                          </p>
                        ) : null}
                        {event.image?.asset && (
                          <div className="mt-4 rounded-2xl overflow-hidden shadow-md border border-[#D4AF37]/20">
                            <Image
                              src={urlFor(event.image)
                                .width(600)
                                .height(300)
                                .url()}
                              alt={event.title}
                              width={600}
                              height={300}
                              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback if no data */}
      {!data && (
        <section className="py-24 text-center px-4">
          <div className="glass-panel p-8 rounded-3xl max-w-md mx-auto border border-[#D4AF37]/20">
            <p className="text-white font-heading text-lg font-bold">
              <span className="lang-bn-only">সিএমএস-এ ইতিহাসের তথ্য যোগ করার পর এখানে প্রদর্শিত হবে।</span>
              <span className="lang-en-only">History content will be displayed here once added to CMS.</span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
