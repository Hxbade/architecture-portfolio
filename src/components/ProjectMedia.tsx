import Image from "next/image";
import ProjectVisual from "@/components/ProjectVisual";
import Gallery from "@/components/Gallery";
import { assetPath, type Project } from "@/data/projects";

// Card cover: real photo when the project has images, otherwise the
// generated architectural visual so every card stays populated.
// `interactive` adds card hover treatment (zoom, grayscale→colour, meta reveal);
// leave it off for hero usage where the image should sit plain.
export function ProjectCover({
  project,
  aspect = "aspect-[4/3]",
  className = "",
  interactive = false,
}: {
  project: Project;
  aspect?: string;
  className?: string;
  interactive?: boolean;
}) {
  const cover = project.images?.[0];
  if (!cover) {
    return <ProjectVisual seed={project.slug} aspect={aspect} className={className} />;
  }
  return (
    <div className={`relative ${aspect} ${className} overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900`}>
      <Image
        src={assetPath(cover)}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className={`object-cover transition duration-500 ${
          interactive
            ? "grayscale-[0.18] group-hover:scale-[1.04] group-hover:grayscale-0"
            : ""
        }`}
      />
      {interactive && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs uppercase tracking-widest text-white/90">
              {project.location} · {project.year}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Detail-page gallery: interactive lightbox gallery when images exist,
// else the generated visuals.
export function ProjectGallery({
  project,
  gridOnly = false,
}: {
  project: Project;
  gridOnly?: boolean;
}) {
  const images = project.images ?? [];

  if (images.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <ProjectVisual seed={project.slug} aspect="aspect-[4/3]" variant={0} />
        <ProjectVisual seed={project.slug} aspect="aspect-[4/3]" variant={1} />
      </div>
    );
  }

  return (
    <Gallery
      images={images}
      title={project.title}
      portrait={!!project.imagesPortrait}
      gridOnly={gridOnly}
    />
  );
}
