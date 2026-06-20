import Image from "next/image";
import { studio, profile, assetPath } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Hong'Nakii Bade",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image
              src={assetPath("/profile.jpg")}
              alt={`Portrait of ${studio.name}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              priority
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-sm font-medium">{studio.name}</p>
          <p className="text-sm text-neutral-500">{studio.role}</p>
          <p className="text-sm text-neutral-500">{studio.location}</p>
        </div>

        <div className="sm:col-span-2">
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

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
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
                    className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700"
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
          </div>
        </div>
      </div>
    </div>
  );
}
