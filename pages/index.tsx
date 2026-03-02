import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-24 px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="flex min-h-[72vh] flex-col items-center justify-center text-center">
          <Badge variant="secondary" className="mb-5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            22nd Birthday ✨
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl md:text-7xl">
            Happy Birthday{" "}
            <span className="text-primary">Pelumi</span>{" "}
            <span aria-hidden>❤️</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Make a wish, then blow out the candles to celebrate in a magical way.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/cake">
              <Button size="lg" className="shadow-lg shadow-primary/30">
                Take me to the cake 🎂
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Tip: turn your sound on and be ready to blow toward your mic.
          </p>
        </section>

        <footer className="pb-6 text-center text-[11px] text-muted-foreground">
          Made with love just for Pelumi.
        </footer>
      </main>
    </div>
  );
}
