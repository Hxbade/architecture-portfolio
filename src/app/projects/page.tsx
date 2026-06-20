import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Studio Name",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
      <p className="mt-3 max-w-xl text-neutral-600">
        A selection of residential, civic, and adaptive reuse work.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
            <ImagePlaceholder label={project.title} />
            <p className="mt-3 text-sm font-medium group-hover:underline">
              {project.title}
            </p>
            <p className="text-sm text-neutral-500">
              {project.category} — {project.location} — {project.year}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
