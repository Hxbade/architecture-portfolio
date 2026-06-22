"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "@/data/projects";

type GalleryProps = {
  images: string[];
  title: string;
  portrait?: boolean;
};

function ExpandCue() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </div>
  );
}

export default function Gallery({ images, title, portrait = false }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const tile = (src: string, i: number, aspect: string, priority = false) => (
    <button
      key={src}
      type="button"
      onClick={() => setIndex(i)}
      aria-label={`Open image ${i + 1} of ${images.length}`}
      className={`group relative ${aspect} block w-full cursor-zoom-in overflow-hidden bg-neutral-100 dark:bg-neutral-900`}
    >
      <Image
        src={assetPath(src)}
        alt={`${title} — view ${i + 1}`}
        fill
        sizes={portrait ? "(max-width: 640px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 1024px"}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <ExpandCue />
    </button>
  );

  return (
    <>
      {portrait ? (
        <div className="grid gap-6 sm:grid-cols-3">
          {images.map((src, i) => tile(src, i, "aspect-[4/5]", i === 0))}
        </div>
      ) : (
        <div className="space-y-6">
          {tile(images[0], 0, "aspect-[16/9]", true)}
          {images.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-3">
              {images.slice(1).map((src, i) => tile(src, i + 1, "aspect-[4/3]"))}
            </div>
          )}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
            touchX.current = null;
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:left-6"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <figure
            className="relative mx-12 flex h-[82vh] w-[88vw] max-w-6xl items-center justify-center sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={assetPath(images[index])}
              alt={`${title} — view ${index + 1}`}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
            <figcaption className="absolute -bottom-7 left-0 right-0 text-center text-xs uppercase tracking-widest text-white/70">
              {title} — {index + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-6"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
