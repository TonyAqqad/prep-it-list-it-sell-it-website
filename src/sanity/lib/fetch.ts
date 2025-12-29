import type { QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
