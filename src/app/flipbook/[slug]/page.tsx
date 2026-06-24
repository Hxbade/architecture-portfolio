import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Flipbook from "@/components/Flipbook";
import Reveal from "@/components/Reveal";
import { assetPath } from "@/data/projects";
import { exhibits, getExhibit } from "@/data/exhibits";

export function generateStaticParams() {
  return exhibits.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibit = getExhibit(slug);
  return { title: exhibit ? `${exhibit.title} — Flipbook` : "Flipbook" };
}

export default async function ExhibitFlipbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibit = getExhibit(slug);
  if (!exhibit) notFound();

  const pages = Array.from({ length: exhibit.pages }, (_, i) =>
    assetPath(`/flipbook/${exhibit.slug}/page-${String(i + 1).padStart(3, "0")}.jpg`)
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <Link
          href="/flipbook"
          className="text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          ← All exhibits
        </Link>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          {exhibit.title}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-neutral-500 dark:text-neutral-400">
          PNGIA logbook exhibit drawing set — {exhibit.pages} pages. Click the
          left or right edge of the page, use the prev/next controls, or the
          arrow keys to turn pages.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <Flipbook pages={pages} alt={exhibit.title} />
      </Reveal>
    </div>
  );
}
