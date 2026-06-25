"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/data/projects";

type HeroMediaProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

// Hero render with a gentle scroll parallax + an entrance fade. The image drifts
// slightly slower than the page; disabled under prefers-reduced-motion.
export default function HeroMedia({ src, alt, label, className = "" }: HeroMediaProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1..1 as the frame travels through the viewport
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const shift = Math.max(-28, Math.min(28, -progress * 36));
      img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${className}`}
    >
      <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.08)" }}>
        <Image
          src={assetPath(src)}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      {label ? (
        <div className="u-glass pointer-events-none absolute bottom-4 left-4 rounded-full px-3.5 py-1.5">
          <span className="text-xs uppercase tracking-widest">{label}</span>
        </div>
      ) : null}
    </div>
  );
}
