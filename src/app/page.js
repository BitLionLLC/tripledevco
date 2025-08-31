import Link from "next/link";
import BackgroundScene from "../components/BackgroundScene";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundScene />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-3 px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />
        <header className="relative z-10 w-full max-w-6xl flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/30" />
            <span className="text-lg font-semibold tracking-tight">TripleDev.co</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
            <Link href="#work" className="hover:text-white transition-colors">Work</Link>
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </header>

        <section className="relative z-10 w-full max-w-6xl pt-12 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05]">
            We build blazing-fast web experiences
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300">
              for ambitious brands.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-balance">
            TripleDev ships modern, high-performance apps and sites with pixel-perfect design,
            clean code, and performance you can feel. Next.js, React, and a sprinkle of 3D flair.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
              Start a project
            </Link>
            <Link href="#work" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">
              See our work
            </Link>
          </div>
        </section>

        <footer className="z-10 absolute inset-x-0 bottom-0 flex items-center justify-center py-6">
          <div className="text-xs text-white/50">© {new Date().getFullYear()} TripleDev.co — All Rights Reserved</div>
        </footer>
      </main>
    </div>
  );
}
