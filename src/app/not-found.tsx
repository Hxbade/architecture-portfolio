import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-6 sm:py-36">
      <p className="u-eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-md text-neutral-600 dark:text-neutral-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        Head back to the portfolio.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-300"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-neutral-50"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
