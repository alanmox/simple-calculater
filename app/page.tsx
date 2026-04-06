import Calculator from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <main className="relative flex h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-[8%] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-[12%] top-[18%] h-56 w-56 rounded-full bg-rose-300/15 blur-3xl" />
        <div className="absolute bottom-[12%] left-[30%] h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden">
        <Calculator />
      </div>
    </main>
  );
}
