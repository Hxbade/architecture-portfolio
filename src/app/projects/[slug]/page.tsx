import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectMedia";
import Flipbook from "@/components/Flipbook";
import Reveal from "@/components/Reveal";
import { projects, assetPath } from "@/data/projects";
import { getExhibit } from "@/data/exhibits";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Hong'Nakii Bade` : "Project",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];

  const exhibit = project.exhibitSlug ? getExhibit(project.exhibitSlug) : undefined;
  const exhibitPages = exhibit
    ? Array.from({ length: exhibit.pages }, (_, i) =>
        assetPath(
          `/flipbook/${exhibit.slug}/page-${String(i + 1).padStart(3, "0")}.jpg`,
        ),
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          {project.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {project.location} — {project.year}
        </p>
      </div>

      {exhibit ? (
        <>
          <Reveal className="mt-8 sm:mt-10">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Flipbook — drawing set
              </h2>
              <Link
                href={`/flipbook/${exhibit.slug}`}
                className="group inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                Open full exhibit
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>
            <Flipbook pages={exhibitPages} alt={`${project.title} drawing set`} />
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="mb-4 text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Rendered images
            </h2>
            <ProjectGallery project={project} gridOnly />
          </Reveal>
        </>
      ) : (
        <Reveal className="mt-8 sm:mt-10">
          <ProjectGallery project={project} />
        </Reveal>
      )}

      <Reveal className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
        <div className="space-y-4 text-neutral-700 sm:col-span-2 dark:text-neutral-300">
          {project.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className="space-y-3 text-sm">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex justify-between gap-4 border-b border-neutral-200 pb-2 dark:border-neutral-800"
            >
              <dt className="text-neutral-500 dark:text-neutral-400">{fact.label}</dt>
              <dd className="text-right font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-16 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <Link href={`/projects/${prevProject.slug}`} className="group">
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            ← Previous
          </p>
          <p className="mt-1 text-sm font-medium transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
            {prevProject.title}
          </p>
        </Link>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group text-right"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Next →
          </p>
          <p className="mt-1 text-sm font-medium transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
            {nextProject.title}
          </p>
        </Link>
      </Reveal>
    </div>
  );
}
