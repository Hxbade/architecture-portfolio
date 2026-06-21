import Link from "next/link";
import { ProjectCover } from "@/components/ProjectMedia";
import Reveal from "@/components/Reveal";
import { projects, studio } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => !p.hideFromHome).slice(0, 3);
  const heroProject =
    projects.find((p) => p.homeHero) ??
    projects.find((p) => p.images?.length) ??
    featured[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {studio.tagline}
          </p>
          <h1 className="mt-4 max-w-2xl text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Architecture is the deliberate shaping of experience.
          </h1>
          <p className="mt-6 max-w-xl text-neutral-600 dark:text-neutral-400">
            {studio.name} is a {studio.role.toLowerCase()} based in{" "}
            {studio.location}, working across commercial, institutional, and
            community-focused projects throughout Papua New Guinea — from early
            design strategy through to documentation and delivery.
          </p>
          <Link
            href="/projects"
            className="group mt-8 inline-flex items-center gap-2 border-b border-neutral-950 pb-1 text-sm font-medium dark:border-neutral-50"
          >
            View selected work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <ProjectCover
            project={heroProject}
            aspect="aspect-[4/5]"
            className="max-h-[72vh] lg:max-h-none"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Selected projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              All projects
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <ProjectCover project={project} />
                <p className="mt-3 text-sm font-medium transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
                  {project.title}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {project.category} — {project.year}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
