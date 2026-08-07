"use client";

import { useMemo } from "react";

interface VideoEmbedProps {
  youtubeUrl: string;
  title?: string;
  className?: string;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoEmbed({
  youtubeUrl,
  title = "Video",
  className = "",
}: VideoEmbedProps) {
  const videoId = useMemo(() => extractVideoId(youtubeUrl), [youtubeUrl]);

  if (!videoId) {
    return (
      <div
        className={`aspect-video bg-navy/10 rounded-xl flex items-center justify-center ${className}`}
      >
        <p className="text-warm-gray text-sm">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div
      className={`aspect-video rounded-xl overflow-hidden shadow-heritage ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  );
}
