import Link from "next/link";
import { studio, contactLinks } from "@/data/projects";

const explore = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/flipbook", label: "Flipbook" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 sm:px-6 sm:py-16">
        {/* Brand */}
        <div>
          <p className="text-sm font-medium uppercase tracking-widest">
            {studio.name}
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {studio.role} · {studio.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm italic text-neutral-500 dark:text-neutral-400">
            &ldquo;{studio.creed}&rdquo;
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <p className="u-eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="u-eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${contactLinks.email}`}
                className="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                {contactLinks.email}
              </a>
            </li>
            {contactLinks.linkedinUrl ? (
              <li>
                <a
                  href={contactLinks.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
            <li className="text-neutral-500 dark:text-neutral-400">
              {studio.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} {studio.name}. All rights reserved.
          </p>
          <p>Designed &amp; built in Port Moresby, Papua New Guinea</p>
        </div>
      </div>
    </footer>
  );
}
