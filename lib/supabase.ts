import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const VIDEO_BUCKET = "videos";

export function getVideoUrl(filename: string): string {
  const { data } = supabase.storage
    .from(VIDEO_BUCKET)
    .getPublicUrl(filename);
  return data.publicUrl;
}
