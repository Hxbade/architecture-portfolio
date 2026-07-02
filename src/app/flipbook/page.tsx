import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { assetPath } from "@/data/projects";
import { exhibits } from "@/data/exhibits";

export const metadata: Metadata = {
  title: "Flipbook Exhibits — Hong'Nakii Bade",
};

export default function FlipbookPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p className="u-eyebrow">Drawing sets</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight">
          Logbook Exhibits
        </h1>
        <p className="mt-2 max-w-xl text-sm text-neutral-500 dark:text-neutral-400">
          PNGIA practical-training logbook exhibits — drawing sets exported as
          page-turning flipbooks. Select a project to browse its sheets.
        </p>
      </Reveal>

      <Reveal
        delay={80}
        className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-800"
      >
        {exhibits.map((exhibit) => (
          <Link
            key={exhibit.slug}
            href={`/flipbook/${exhibit.slug}`}
            className="group relative aspect-[3/4] overflow-hidden bg-background"
          >
            <Image
              src={assetPath(`/flipbook/${exhibit.slug}/page-001.jpg`)}
              alt={exhibit.title}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
              <p className="text-sm font-medium text-white">{exhibit.title}</p>
              <p className="text-xs uppercase tracking-widest text-white/70">
                {exhibit.pages} pages
              </p>
            </div>
          </Link>
        ))}
      </Reveal>
    </div>
  );
}
