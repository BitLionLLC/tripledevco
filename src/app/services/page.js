import Link from "next/link";
import BackgroundScene from "@/components/BackgroundScene";
import Header from "@/components/Header";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundScene />
      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-3 px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

        <section className="relative z-10 w-full max-w-6xl py-12">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em]">Services</h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            We design, build, and ship modern products end‑to‑end: from concept and design
            to launch and iteration. Performance, DX, and user experience are first‑class.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">Web Apps</h3>
              <p className="mt-2 text-white/70">Full‑stack apps with auth, data, and realtime.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>Dashboards and internal tools</li>
                <li>SaaS MVPs and production builds</li>
                <li>Stripe, webhooks, and 3rd‑party APIs</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">Marketing Sites</h3>
              <p className="mt-2 text-white/70">Fast, SEO‑friendly, and easy to update.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>Design systems and component libraries</li>
                <li>CMS integrations</li>
                <li>Animations and 3D visuals</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">Mobile Apps</h3>
              <p className="mt-2 text-white/70">Cross‑platform iOS/Android with Flutter.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>App Store and Play Store readiness</li>
                <li>In‑app purchases and subscriptions</li>
                <li>Analytics and growth tooling</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">AI Integrations</h3>
              <p className="mt-2 text-white/70">LLM features that actually ship and scale.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>Chat, RAG, agents, and tools</li>
                <li>OpenAI, Anthropic, Replicate</li>
                <li>Safety, evaluation, and observability</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">E‑commerce</h3>
              <p className="mt-2 text-white/70">High‑conversion storefronts and checkouts.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>Stripe, PayPal, and Apple/Google Pay</li>
                <li>Subscriptions and entitlements</li>
                <li>Performance and A/B testing</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10">
              <h3 className="text-xl font-semibold">Performance & SEO</h3>
              <p className="mt-2 text-white/70">Core Web Vitals, accessibility, and DX.</p>
              <ul className="mt-4 list-disc list-inside text-white/70 space-y-1">
                <li>Audits and remediation plans</li>
                <li>Monitoring and error reporting</li>
                <li>Edge caching and image optimization</li>
              </ul>
            </article>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">Tech stack</h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              We pick the right tools for the job and keep the stack boring where it
              matters. Here are the technologies we use day‑to‑day.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-semibold">Frontend</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next",
                    "TypeScript",
                    "Tailwind",
                    "Three.js",
                  ].map((t) => (
                    <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-semibold">Backend & Data</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Node",
                    "FastAPI",
                    "Supabase",
                    "PostgreSQL",
                    "MongoDB",
                  ].map((t) => (
                    <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-semibold">Mobile</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Flutter",
                  ].map((t) => (
                    <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-semibold">DevOps</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Vercel",
                    "AWS",
                    "Docker",
                    "nginx",
                  ].map((t) => (
                    <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">{t}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-semibold">AI & LLMs</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "OpenAI",
                    "Anthropic",
                    "Replicate",
                  ].map((t) => (
                    <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/schedule" className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
                Start a project
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">
                See our work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


