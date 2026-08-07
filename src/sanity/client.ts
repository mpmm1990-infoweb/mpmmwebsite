import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const sanityClient = createClient({
  ...sanityConfig,
  stega: { enabled: false },
});

// Helper for fetching with ISR-compatible caching
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags,
    },
  });
}
