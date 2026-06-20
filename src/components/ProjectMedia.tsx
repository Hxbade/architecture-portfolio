import Image from "next/image";
import ProjectVisual from "@/components/ProjectVisual";
import { assetPath, type Project } from "@/data/projects";

// Card cover: real photo when the project has images, otherwise the
// generated architectural visual so every card stays populated.
export function ProjectCover({
  project,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  project: Project;
  aspect?: string;
  className?: string;
}) {
  const cover = project.images?.[0];
  if (!cover) {
    return <ProjectVisual seed={project.slug} aspect={aspect} className={className} />;
  }
  return (
    <div className={`relative ${aspect} ${className} overflow-hidden bg-neutral-100`}>
      <Image
        src={assetPath(cover)}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

// Detail-page gallery: full image set when available, else two visuals.
export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];

  if (images.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <ProjectVisual seed={project.slug} aspect="aspect-[4/3]" variant={0} />
        <ProjectVisual seed={project.slug} aspect="aspect-[4/3]" variant={1} />
      </div>
    );
  }

  // Portrait sets (e.g. a tower) read better as a row of tall tiles than a
  // wide cropped hero.
  if (project.imagesPortrait) {
    return (
      <div className="grid gap-6 sm:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/5] overflow-hidden bg-neutral-100"
          >
            <Image
              src={assetPath(src)}
              alt={`${project.title} — view ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  const [hero, ...rest] = images;
  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        <Image
          src={assetPath(hero)}
          alt={`${project.title} — view 1`}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          className="object-cover"
        />
      </div>
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-3">
          {rest.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden bg-neutral-100"
            >
              <Image
                src={assetPath(src)}
                alt={`${project.title} — view ${i + 2}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
