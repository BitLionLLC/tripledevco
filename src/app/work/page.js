import Image from "next/image";
import BackgroundScene from "@/components/BackgroundScene";
import Header from "@/components/Header";

import astralLife from "@/assets/astralLife.png";
import mostart from "@/assets/mostart.png";
import mostlink from "@/assets/mostlink.png";
import plantId from "@/assets/plantId.png";

const projects = [
    {
        id: "mostlink",
        title: "MostLink",
        description: "A link page builder to share all your links on socials",
        tech: ["React", "Next", "Node", "nginx"],
        image: mostlink,
    },
    {
        id: "mostart",
        title: "MostArt",
        description: "AI art generator: generate images, videos, stickers, and more",
        tech: ["React", "Node", "Replicate API"],
        image: mostart,
    },
    {
        id: "plant-id",
        title: "Budget Plant ID (iOS and Android)",
        description: "Identify plants quickly without an expensive subscription",
        tech: ["Flutter", "OpenAI API", "RevenueCat"],
        image: plantId,
        link: "https://www.thebitlion.com/apps"
    },
    {
        id: "astral-life",
        title: "Astral Life (Android)",
        description: "Do tarot readings, read your horoscope, discover your birth chart, and much more",
        tech: ["Flutter", "OpenAI API", "RevenueCat"],
        image: astralLife,
        link: "https://www.thebitlion.com/apps"
    },
];

export default function WorkPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundScene />
      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-3 px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

        <section className="relative z-10 w-full max-w-6xl py-12 flex items-center flex-col">
            <div className="flex flex-col justify-start w-full">
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em]">Selected Work</h1>
                <p className="mt-3 text-white/70 max-w-2xl">A few projects we’ve shipped recently.</p>
            </div>

          <div className="mt-8 flex flex-col gap-8 max-w-6xl self-center">
            {projects.map(({ id, title, description, tech, image, link }) => (
              <article key={id} className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden shadow-lg shadow-cyan-500/10">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-3/5" style={{ aspectRatio: '16 / 10' }}>
                    <Image
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover"
                      placeholder="blur"
                      sizes="(min-width: 1024px) 60vw, 100vw"
                    />
                  </div>
                  <div className="flex-1 p-6 sm:p-8">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="mt-3 text-white/70">{description}</p>
                    {link && <a href={link} className="mt-3 text-blue-500">Link</a>}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <li key={t} className="text-xs text-white/80 px-2 py-1 rounded-md border border-white/10 bg-white/5">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


