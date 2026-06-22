import Image from "next/image";
import Link from "next/link";
import { ProjectCover } from "@/components/ProjectMedia";
import Reveal from "@/components/Reveal";
import { projects, studio, home, assetPath } from "@/data/projects";

// Image tile with a label that reveals on hover (CSS-only, links through).
function HoverImage({
  src,
  label,
  href,
  aspect,
  priority = false,
}: {
  src: string;
  label: string;
  href: string;
  aspect: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative ${aspect} block overflow-hidden bg-neutral-100 dark:bg-neutral-900`}
    >
      <Image
        src={assetPath(src)}
        alt={label}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <p className="translate-y-1 text-xs uppercase tracking-widest text-white/90 transition-transform duration-300 group-hover:translate-y-0">
          {label}
        </p>
        <span className="translate-y-1 text-white/90 transition-transform duration-300 group-hover:translate-y-0">
          ↗
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const featured = projects.filter((p) => !p.hideFromHome).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-14 pb-14 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
            {studio.name} — Portfolio
          </p>
          <h1 className="mt-4 max-w-2xl text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Architecture is the deliberate shaping of experience.
          </h1>
          <p className="mt-5 text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {studio.tagline}
          </p>
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
          <HoverImage
            src={home.hero.image}
            label={home.hero.label}
            href={home.hero.href}
            aspect="aspect-[4/5] max-h-[72vh] lg:max-h-none"
            priority
          />
        </Reveal>
      </section>

      {/* Featured concept — Kundu Tower renders */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Featured concept
              </h2>
              <p className="mt-1 text-lg font-medium tracking-tight">
                {home.feature.title}
                <span className="ml-2 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  {home.feature.subtitle}
                </span>
              </p>
            </div>
            <Link
              href={`/projects/${home.feature.slug}`}
              className="shrink-0 text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              View project
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {home.feature.images.map((img, i) => (
            <Reveal key={img.src} delay={i * 90}>
              <HoverImage
                src={img.src}
                label={img.label}
                href={`/projects/${home.feature.slug}`}
                aspect="aspect-[3/2]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Selected projects */}
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
                <ProjectCover project={project} interactive />
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
