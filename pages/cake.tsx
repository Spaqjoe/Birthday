import { Badge } from "@/components/ui/badge";
import { CakeSection } from "@/components/CakeSection";

export default function CakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            22nd Birthday ✨
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Make a Wish <span aria-hidden>🕯️</span>
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Think of your wish, then blow toward your mic to extinguish the candles.
          </p>
        </div>

        <div className="w-full">
          <CakeSection />
        </div>

        <footer className="pb-4 text-center text-[11px] text-muted-foreground">
          Made with love just for Pelumi.
        </footer>
      </main>
    </div>
  );
}
