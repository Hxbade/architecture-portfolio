import { studio } from "@/data/projects";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500">
        <p>
          © {new Date().getFullYear()} {studio.name}. All rights reserved.
        </p>
        <p>{studio.location}</p>
      </div>
    </footer>
  );
}
