import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { BOOKS_QUERY } from "@/lib/queries";
import LibraryClientView, { BookData } from "./LibraryClientView";

export const metadata: Metadata = {
  title: "Digital Library — Modern Police Memorial Museum",
  description:
    "Browse, read and purchase digital publications from the Modern Police Memorial Museum.",
};

export default async function BooksPage() {
  let books: BookData[] = [];
  try {
    books = await sanityFetch<BookData[]>(BOOKS_QUERY, {}, ["book"]);
  } catch {
    // CMS not configured fallback
  }

  return <LibraryClientView books={books} />;
}
