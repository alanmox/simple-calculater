import Calculator from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-[8%] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-[12%] top-[18%] h-56 w-56 rounded-full bg-rose-300/15 blur-3xl" />
        <div className="absolute bottom-[12%] left-[30%] h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-center">
        <section className="mb-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[color:var(--text-soft)]">
            Next.js App Router
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl lg:text-6xl">
            A tactile, production-ready calculator with a polished 2026 feel.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-soft)] sm:text-lg">
            Built with strict TypeScript, modular logic, full keyboard support,
            persistent theme and history, and a glassmorphic interface tuned for
            fast everyday use.
          </p>
        </section>

        <Calculator />
      </div>
    </main>
  );
}
