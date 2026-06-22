"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { studio } from "@/data/projects";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-background/80 backdrop-blur-md dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-medium uppercase tracking-widest"
        >
          {studio.name}
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* Desktop nav */}
          <nav className="hidden gap-8 text-sm text-neutral-600 sm:flex dark:text-neutral-400">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-neutral-950 dark:hover:text-neutral-50 ${
                    active ? "text-neutral-950 dark:text-neutral-50" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-neutral-950 transition-all duration-300 dark:bg-neutral-50 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-9 w-9 items-center justify-center sm:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-neutral-950 transition-all duration-300 dark:bg-neutral-50 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-5 bg-neutral-950 transition-all duration-300 dark:bg-neutral-50 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-neutral-950 transition-all duration-300 dark:bg-neutral-50 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-neutral-200 transition-[max-height] duration-300 ease-out sm:hidden dark:border-neutral-800 ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm transition-colors ${
                  active
                    ? "text-neutral-950 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
