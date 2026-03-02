/**
 * Run this script once to create the Supabase storage bucket and upload the video.
 * Requires your service role key (not the anon key).
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<your-key> node scripts/setup-storage.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://arnemejrgebsiywnkujj.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error(
    "Error: SUPABASE_SERVICE_ROLE_KEY env var is required.\n" +
    "Get it from: https://supabase.com/dashboard/project/arnemejrgebsiywnkujj/settings/api"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const BUCKET = "Media";
const VIDEO_PATH = join(__dirname, "../public/22.MOV");

async function main() {
  // 1. Create the bucket (public so the video URL works without auth)
  console.log(`Creating bucket "${BUCKET}"...`);
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: ["video/*"],
    fileSizeLimit: 200 * 1024 * 1024, // 200 MB
  });

  if (bucketError && bucketError.message !== "Bucket already exists") {
    console.error("Failed to create bucket:", bucketError.message);
    process.exit(1);
  }
  console.log(bucketError ? "Bucket already exists, skipping." : "Bucket created.");

  // 2. Upload the video
  console.log("Uploading 22.MOV...");
  const videoData = readFileSync(VIDEO_PATH);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload("22.MOV", videoData, {
      contentType: "video/quicktime",
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload failed:", uploadError.message);
    process.exit(1);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl("22.MOV");
  console.log("\nDone! Video is live at:");
  console.log(data.publicUrl);
}

main();
