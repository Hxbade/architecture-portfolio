"use client";

import { useEffect, useRef } from "react";
import { Flipbook as FlipbookCore, type FlipbookOptions } from "./flipbook-core";

type FlipbookProps = {
  pages: string[];
  alt?: string;
  /** Extra options forwarded to the core (duration, sound, downloadUrl, …). */
  options?: Partial<Omit<FlipbookOptions, "pages">>;
};

// Thin React wrapper around the framework-agnostic Flipbook class.
export default function Flipbook({ pages, alt = "Flipbook", options }: FlipbookProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fb = new FlipbookCore(el, { pages, duration: 700, sound: true, ...options });
    return () => fb.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, options]);

  return <div ref={ref} role="group" aria-label={alt} />;
}
