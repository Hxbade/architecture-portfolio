import Image from "next/image";
import Reveal from "@/components/Reveal";
import { studio, profile, assetPath } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Hong'Nakii Bade",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
        <Reveal className="sm:col-span-1">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[18rem] overflow-hidden bg-neutral-100 sm:max-w-none">
            <Image
              src={assetPath("/profile.jpg")}
              alt={`Portrait of ${studio.name}`}
              fill
              sizes="(max-width: 640px) 18rem, 33vw"
              priority
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-sm font-medium">{studio.name}</p>
          <p className="text-sm text-neutral-500">{studio.role}</p>
          <p className="text-sm text-neutral-500">{studio.location}</p>
        </Reveal>

        <div className="sm:col-span-2">
          <Reveal delay={80}>
            <h1 className="text-3xl font-medium tracking-tight">About</h1>
            <div className="mt-6 max-w-xl space-y-4 text-neutral-700">
              {profile.intro.map((p, i) => (
                <p key={`intro-${i}`}>{p}</p>
              ))}
              {profile.philosophy.map((p, i) => (
                <p key={`phil-${i}`}>{p}</p>
              ))}
              <p className="font-medium text-neutral-900">{studio.creed}</p>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-neutral-500">
                Experience
              </h2>
              <ul className="mt-4 space-y-4">
                {profile.experience.map((e) => (
                  <li key={e.period}>
                    <p className="text-sm font-medium">{e.role}</p>
                    <p className="text-sm text-neutral-500">{e.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-widest text-neutral-500">
                Software
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.software.map((s) => (
                  <li
                    key={s}
                    className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-sm uppercase tracking-widest text-neutral-500">
                Design
              </h2>
              <ul className="mt-4 space-y-1 text-sm text-neutral-700">
                {profile.designSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
