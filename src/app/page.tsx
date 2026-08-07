import { sanityFetch } from "@/sanity/client";
import {
  HERO_QUERY,
  HISTORY_QUERY,
  VIDEOS_PREVIEW_QUERY,
  BOOKS_PREVIEW_QUERY,
  GALLERY_PREVIEW_QUERY,
  KOTHA_O_GATHA_PREVIEW_QUERY,
} from "@/lib/queries";
import HeroSection from "./sections/HeroSection";
import HistoryPreview from "./sections/HistoryPreview";
import VideosPreview from "./sections/VideosPreview";
import BooksPreview from "./sections/BooksPreview";
import GalleryPreview from "./sections/GalleryPreview";
import MembersPreview from "./sections/MembersPreview";

// Type definitions
interface HeroData {
  title?: string;
  titleBn?: string;
  subtitle?: string;
  subtitleBn?: string;
  backgroundImage?: { asset: { _ref: string } };
  bgImages?: Array<{ asset: { _ref: string } }>;
  badgeImage?: { asset: { _ref: string } };
  ctaText?: string;
  ctaTextBn?: string;
  ctaLink?: string;
}

interface HistoryData {
  title?: string;
  titleBn?: string;
  excerpt?: string;
  excerptBn?: string;
  coverImage?: { asset: { _ref: string } };
}

export default async function HomePage() {
  // Fetch all homepage data in parallel
  let hero: HeroData | null = null;
  let history: HistoryData | null = null;
  let videos: unknown[] = [];
  let books: unknown[] = [];
  let gallery: unknown[] = [];
  let kothaOGathaItems: unknown[] = [];

  try {
    [hero, history, videos, books, gallery, kothaOGathaItems] = await Promise.all([
      sanityFetch<HeroData>(HERO_QUERY, {}, ["hero"]),
      sanityFetch<HistoryData>(HISTORY_QUERY, {}, ["history"]),
      sanityFetch<unknown[]>(VIDEOS_PREVIEW_QUERY, {}, ["video"]),
      sanityFetch<unknown[]>(BOOKS_PREVIEW_QUERY, {}, ["book"]),
      sanityFetch<unknown[]>(GALLERY_PREVIEW_QUERY, {}, ["galleryImage"]),
      sanityFetch<unknown[]>(KOTHA_O_GATHA_PREVIEW_QUERY, {}, ["kothaOGatha"]),
    ]);
  } catch {
    // CMS not configured — fallback handles UI
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <HeroSection data={hero} />
      <HistoryPreview data={history} />
      <VideosPreview data={videos || []} />
      <BooksPreview data={books || []} />
      <GalleryPreview data={gallery || []} />
      <MembersPreview data={kothaOGathaItems || []} />
    </div>
  );
}
