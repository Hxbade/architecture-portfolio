import Link from "next/link";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Hong'Nakii Bade",
  description:
    "Professional experience and PNGIA practical-training timeline of Hong'Nakii Bade, Graduate Architect at PAC Architects, Port Moresby.",
};

export default function ExperiencePage() {
  const { position, intro, stats, stages, timeline } = experience;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <Reveal>
        <h1 className="text-3xl font-medium tracking-tight">Experience</h1>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-sm font-medium">{position.role}</p>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {position.employer}
          </p>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {position.period}
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

      {/* Work stages */}
      <Reveal delay={120} className="mt-10">
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
      </Reveal>

      {/* Timeline */}
      <div className="mt-16 space-y-14">
        {timeline.map((group, gi) => (
          <Reveal key={group.year} delay={gi === 0 ? 0 : 60}>
            <div className="grid gap-6 sm:grid-cols-[8rem_1fr] sm:gap-10">
              <div className="sm:text-right">
                <h2 className="text-lg font-medium tracking-tight">
                  {group.year}
                </h2>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {group.heading}
                </p>
              </div>

              <ol className="relative space-y-8 border-l border-neutral-200 pl-6 dark:border-neutral-800">
                {group.items.map((item) => (
                  <li key={item.title} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 ring-4 ring-background dark:bg-neutral-600" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      {item.slug ? (
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
                        <h3 className="text-sm font-medium">{item.title}</h3>
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
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400">
          Logged under the PNGIA practical-training framework, mentored by{" "}
          {position.mentor}.{" "}
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
