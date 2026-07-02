import Link from "next/link";
import { ProjectCover } from "@/components/ProjectMedia";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Hong'Nakii Bade",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
      <Reveal>
        <p className="u-eyebrow">Selected work</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight">Projects</h1>
        <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          Selected commercial, institutional, and community projects across
          Papua New Guinea, alongside notable studies and concepts.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-x-8 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 90}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <ProjectCover project={project} interactive />
              <p className="mt-3 text-sm font-medium transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
                {project.title}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {project.category} — {project.location} — {project.year}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
