import Link from "next/link";
import BackgroundScene from "../components/BackgroundScene";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundScene />
      <Header/>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-3 px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />
        

        <section className="relative z-10 w-full max-w-6xl mt-12 pt-12 text-center sm:text-left bg-black/30 backdrop-blur-sm border-white/10 border rounded-2xl p-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05]">
            We build blazing-fast web experiences
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300">
              for ambitious brands.
            </span>
          </h1>
          <div className="mt-6 sm:mt-8 inline-block text-left rounded-2xl">
            <p className="max-w-2xl text-white/70 text-balance">
              TripleDev ships modern, high-performance apps and sites with pixel-perfect design,
              clean code, and performance you can feel.
            </p>
            <p className="mt-6 max-w-2xl text-white/70 text-balance">
              We specialize in React, Next, TypeScript, Node, FastAPI, MongoDB, Supabase, Flutter, and integration with OpenAI and Anthropic APIs
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/schedule" className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
                Start a project
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">
                See our work
              </Link>
            </div>
          </div>
        </section>

        <footer className="z-10 absolute inset-x-0 bottom-0 flex items-center justify-center py-6">
          <div className="text-xs text-white/50">© {new Date().getFullYear()} TripleDev.co — All Rights Reserved</div>
        </footer>
      </main>
    </div>
  );
}
