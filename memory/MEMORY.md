# Birthday App - Project Memory

## Stack
- Next.js (Pages Router), React 19, TypeScript, Tailwind CSS 4
- shadcn/ui components, Three.js for 3D cake
- pnpm package manager
- Supabase for media storage

## Key Files
- `pages/wish.tsx` - Birthday wish page with video player (uses Supabase storage)
- `pages/index.tsx` - Home page with interactive 3D cake + microphone blow detection
- `lib/supabase.ts` - Supabase client + `getVideoUrl()` helper
- `.env.local` - Supabase credentials (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- `.claude/mcp.json` - MCP config (shadcn + supabase MCPs)

## Supabase Setup
- Project ref: `arnemejrgebsiywnkujj`
- Project URL: `https://arnemejrgebsiywnkujj.supabase.co`
- Storage bucket: `videos` (needs to be created + made public)
- Video file: `22.MOV` uploaded to the `videos` bucket
- MCP needs personal access token in `Authorization: Bearer <token>` header

## Credentials Status
- `NEXT_PUBLIC_SUPABASE_URL` ✅ set in `.env.local`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ set in `.env.local`
- **Service role key** → needed to run `scripts/setup-storage.mjs` (bucket creation + video upload)
  - Get from: https://supabase.com/dashboard/project/arnemejrgebsiywnkujj/settings/api
- **Personal access token** → needed in `.claude/mcp.json` headers to use Supabase MCP tools
  - Get from: https://supabase.com/dashboard/account/tokens

## Video Handling
- Video previously served from `/public/22.MOV` (34.5 MB, excluded from git via .gitignore)
- Now served from Supabase Storage via `getVideoUrl("22.MOV")` in `lib/supabase.ts`
