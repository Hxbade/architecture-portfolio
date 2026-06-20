import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Architecture studio
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Considered buildings, shaped by site, light, and material.
        </h1>
        <p className="mt-6 max-w-xl text-neutral-600">
          We design residential, civic, and adaptive reuse projects across New
          Zealand, working closely with clients from first sketch through to
          completion.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-block text-sm font-medium border-b border-neutral-950 pb-1"
        >
          View selected work →
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500">
            Selected projects
          </h2>
          <Link href="/projects" className="text-sm text-neutral-600 hover:text-neutral-950">
            All projects
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {featured.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
              <ImagePlaceholder label={project.title} />
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
