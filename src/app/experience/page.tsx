import Link from "next/link";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/experience";
import { logbookByTitle } from "@/data/logbook";
import { assetPath } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Hong'Nakii Bade",
  description:
    "Professional experience of Hong'Nakii Bade — Project Architect & BIM Executive, Port Moresby — with 5+ years across PAC Architects/Planpac, Glory Group, Niugini 21 and Frameworks Architect.",
};

export default function ExperiencePage() {
  const { headline, intro, stats, education, positions, stages, timeline } =
    experience;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <Reveal>
        <p className="u-eyebrow">Career</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight">Experience</h1>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-sm font-medium">{headline.title}</p>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {headline.firm}
          </p>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {headline.span}
          </p>
        </div>
        <div className="mt-6 max-w-2xl space-y-4 text-neutral-700 dark:text-neutral-300">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      {/* Stats */}
      <Reveal delay={80} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-neutral-200 bg-neutral-200 sm:grid-cols-4 dark:border-neutral-800 dark:bg-neutral-800">
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-4 py-5">
            <p className="text-2xl font-medium tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {s.label}
            </p>
          </div>
        ))}
      </Reveal>

      {/* Employment history */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Employment history
          </h2>
        </Reveal>
        <div className="mt-6 space-y-8">
          {positions.map((p, i) => (
            <Reveal key={p.role + p.firm} delay={i === 0 ? 0 : 50}>
              <div className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
                  {p.period}
                </p>
                <div>
                  <h3 className="text-base font-medium tracking-tight">
                    {p.role}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {p.firm} — {p.location}
                    {p.note ? ` · ${p.note}` : ""}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="relative pl-4 text-sm text-neutral-600 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-neutral-400 dark:text-neutral-400 dark:before:bg-neutral-600"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education + work stages */}
      <Reveal className="mt-12 grid gap-10 border-t border-neutral-200 pt-10 sm:grid-cols-2 dark:border-neutral-800">
        <div>
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Education
          </h2>
          <p className="mt-4 text-sm font-medium">{education.qualification}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {education.institution}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {education.period}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Work stages experienced
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stages.map((s) => (
              <li
                key={s}
                className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Project timeline */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Selected project involvement
          </h2>
        </Reveal>
        <div className="mt-8 space-y-14">
          {timeline.map((group, gi) => (
            <Reveal key={group.year} delay={gi === 0 ? 0 : 60}>
              <div className="grid gap-6 sm:grid-cols-[8rem_1fr] sm:gap-10">
                <div className="sm:text-right">
                  <h3 className="text-lg font-medium tracking-tight">
                    {group.year}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {group.heading}
                  </p>
                </div>

                <ol className="relative space-y-8 border-l border-neutral-200 pl-6 dark:border-neutral-800">
                  {group.items.map((item) => (
                    <li key={item.title} className="relative">
                      <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 ring-4 ring-background dark:bg-neutral-600" />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        {"slug" in item && item.slug ? (
                          <Link
                            href={`/projects/${item.slug}`}
                            className="group text-sm font-medium"
                          >
                            {item.title}
                            <span className="ml-1 inline-block text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </Link>
                        ) : (
                          <h4 className="text-sm font-medium">{item.title}</h4>
                        )}
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                        {item.type}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                        {item.role}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {"exhibitSlug" in item && item.exhibitSlug ? (
                          <Link
                            href={`/flipbook/${item.exhibitSlug}`}
                            className="group inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                          >
                            View exhibit
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </Link>
                        ) : null}
                        {logbookByTitle[item.title] ? (
                          <a
                            href={assetPath(
                              `/logbook/${logbookByTitle[item.title].id}.pdf`,
                            )}
                            download
                            className="group inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                          >
                            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                              ↓
                            </span>
                            Logbook · {logbookByTitle[item.title].hours} hrs
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-16 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400">
          Project involvement from 2022 logged under the PNGIA practical-training
          framework (mentors Willie Mueng and Rai Mou).{" "}
          <Link
            href="/contact"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>{" "}
          for a full CV.
        </p>
      </Reveal>
    </div>
  );
}
