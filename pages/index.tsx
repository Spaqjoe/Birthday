export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <main className="mx-4 w-full max-w-xl rounded-3xl bg-white/80 p-10 text-center shadow-xl backdrop-blur dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
          Welcome to
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Birthday
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          A fresh Next.js starter using{" "}
          <span className="font-semibold text-pink-600 dark:text-pink-400">
            TypeScript
          </span>{" "}
          and{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-400">
            Tailwind CSS
          </span>
          .
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="inline-flex items-center rounded-full bg-pink-500 px-5 py-2 text-sm font-medium text-white shadow-md">
            🎉 Ready to start building
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Edit <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono dark:bg-slate-800">pages/index.tsx</code> to customize this page.
          </span>
        </div>
      </main>
    </div>
  );
}
