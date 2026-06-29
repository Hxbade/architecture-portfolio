import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroMedia from "@/components/HeroMedia";
import ProcessSection from "@/components/ProcessSection";
import HomeTimeline from "@/components/HomeTimeline";
import ProofCard from "@/components/ProofCard";
import LinkedInBadge from "@/components/LinkedInBadge";
import {
  projects,
  studio,
  profile,
  home,
  contactLinks,
  assetPath,
} from "@/data/projects";

const PILL_PRIMARY =
  "inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-300";
const PILL_OUTLINE =
  "inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-neutral-50";

const FEATURED = [
  "puma-service-station-lae",
  "nmag-hangar-raaf",
  "nambawan-super-fitout",
  "kundu-tower",
];

export default function Home() {
  const featured = FEATURED.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is (typeof projects)[number] => !!p,
  );

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-14"
      >
        <Reveal>
          <p className="u-eyebrow">{studio.name} — Portfolio</p>
          <h1 className="mt-5 max-w-2xl text-[2.4rem] font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Architecture is the deliberate shaping of experience.
          </h1>
          <p className="mt-6 max-w-xl text-base text-neutral-600 dark:text-neutral-400">
            {studio.name} is a {studio.role.toLowerCase()} based in{" "}
            {studio.location}, working across commercial, institutional and
            community-focused projects throughout Papua New Guinea — from early
            design strategy through to documentation and delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#projects" className={PILL_PRIMARY}>
              View selected work
              <span aria-hidden>→</span>
            </Link>
            <Link href="#contact" className={PILL_OUTLINE}>
              Get in touch
            </Link>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <HeroMedia
            src={home.hero.image}
            alt={home.hero.label}
            label={home.hero.label}
            className="aspect-[4/5] max-h-[78vh]"
          />
        </Reveal>
      </section>

      {/* ---------- Process narrative ---------- */}
      <section
        id="process"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="u-eyebrow">Process</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            From first sketch to handover.
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            A disciplined arc that carries each project from idea to delivered
            building.
          </p>
        </Reveal>
        <ProcessSection />
      </section>

      {/* ---------- Selected projects (with floating proof cards) ---------- */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="u-eyebrow">Selected work</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 90}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={assetPath(project.images![0])}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  {/* Floating glass proof card */}
                  <ProofCard
                    className="absolute bottom-4 left-4 max-w-[16rem]"
                    fields={[
                      { label: "Year", value: project.year },
                      { label: "Typology", value: project.category },
                      { label: "Location", value: project.location },
                      { label: "Role", value: project.role },
                    ]}
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium tracking-tight transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400">
                    {project.title}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {project.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Experience timeline ---------- */}
      <section
        id="experience"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="u-eyebrow">Career</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Experience
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              5+ years across architecture, design and construction in Papua New
              Guinea — from intern and graduate roles to design leadership.
            </p>
          </div>
          <Link
            href="/experience"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
          >
            Full experience →
          </Link>
        </Reveal>
        <HomeTimeline />
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <Reveal>
            {/* TODO: swap public/profile.jpg for your preferred portrait photo. */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[20rem] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={assetPath("/profile.jpg")}
                alt={`Portrait of ${studio.name}`}
                fill
                sizes="(max-width: 1024px) 18rem, 20rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="u-eyebrow">About</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              {studio.name}
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {studio.role} · {studio.location}
            </p>
            <div className="mt-6 max-w-xl space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>{profile.intro[0]}</p>
              <p>{profile.philosophy[1]}</p>
            </div>

            <div className="mt-8">
              <p className="u-eyebrow">Credentials</p>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                <li>Bachelor of Architecture — PNG University of Technology (2016–2020)</li>
                <li>Working toward registration with the PNG Institute of Architects (PNGIA)</li>
                {/* TODO: add your exact credentials / registration status / membership numbers here. */}
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/about" className={PILL_OUTLINE}>
                More about me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section
        id="contact"
        className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 sm:py-32"
      >
        <Reveal>
          <p className="u-eyebrow">Contact</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Let&rsquo;s talk.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-neutral-600 dark:text-neutral-400">
            For project enquiries, collaborations, or press — I&rsquo;d be glad
            to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${contactLinks.email}`} className={PILL_PRIMARY}>
              {contactLinks.email}
            </a>
            {contactLinks.linkedinUrl ? (
              <a
                href={contactLinks.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={PILL_OUTLINE}
              >
                LinkedIn
              </a>
            ) : null}
          </div>
          <div className="mt-10">
            <LinkedInBadge />
          </div>
          <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
            {studio.location}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
