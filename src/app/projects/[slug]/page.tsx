import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectMedia";
import { projects } from "@/data/projects";
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
  return { title: project ? `${project.title} — Studio Name` : "Project" };
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/projects" className="text-sm text-neutral-500 hover:text-neutral-950">
        ← All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-medium tracking-tight">{project.title}</h1>
        <p className="text-sm text-neutral-500">
          {project.location} — {project.year}
        </p>
      </div>

      <div className="mt-10">
        <ProjectGallery project={project} />
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-10">
        <div className="sm:col-span-2 space-y-4 text-neutral-700">
          {project.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className="space-y-3 text-sm">
          {project.facts.map((fact) => (
            <div key={fact.label} className="flex justify-between border-b border-neutral-200 pb-2">
              <dt className="text-neutral-500">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
