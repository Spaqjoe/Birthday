import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const VIDEO_BUCKET = "Media";

// Lazy singleton — only instantiated when actually called at runtime,
// not during Next.js build-time page-data collection.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars are not set.");
    _client = createClient(url, key);
  }
  return _client;
}

// Constructs the public storage URL directly from the env var — no client
// instantiation required, so it's safe to call at module level.
export function getVideoUrl(filename: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return `/${filename}`; // fallback to /public during local dev without .env.local
  return `${base}/storage/v1/object/public/${VIDEO_BUCKET}/${filename}`;
}
