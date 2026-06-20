import Link from "next/link";
import { studio } from "@/data/projects";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-widest uppercase">
          {studio.name}
        </Link>
        <nav className="flex gap-8 text-sm text-neutral-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-neutral-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
