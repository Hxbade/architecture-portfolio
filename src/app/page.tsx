import Link from "next/link";
import { ProjectCover } from "@/components/ProjectMedia";
import { projects, studio } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => !p.hideFromHome).slice(0, 3);
  const heroProject =
    projects.find((p) => p.homeHero) ??
    projects.find((p) => p.images?.length) ??
    featured[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-6 pt-20 pb-16 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-500">
            {studio.tagline}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Architecture is the deliberate shaping of experience.
          </h1>
          <p className="mt-6 max-w-xl text-neutral-600">
            {studio.name} is a {studio.role.toLowerCase()} based in{" "}
            {studio.location}, working across commercial, institutional, and
            community-focused projects throughout Papua New Guinea — from early
            design strategy through to documentation and delivery.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-block border-b border-neutral-950 pb-1 text-sm font-medium"
          >
            View selected work →
          </Link>
        </div>
        <ProjectCover project={heroProject} aspect="aspect-[4/5]" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500">
            Selected projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-neutral-600 hover:text-neutral-950"
          >
            All projects
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <ProjectCover project={project} />
              <p className="mt-3 text-sm font-medium group-hover:underline">
                {project.title}
              </p>
              <p className="text-sm text-neutral-500">
                {project.category} — {project.year}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
