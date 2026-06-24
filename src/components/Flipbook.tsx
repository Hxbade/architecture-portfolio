"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type FlipbookProps = {
  pages: string[];
  alt?: string;
};

export default function Flipbook({ pages, alt = "Flipbook page" }: FlipbookProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [flipping, setFlipping] = useState(false);

  const total = pages.length;

  const goTo = useCallback(
    (next: number, dir: "next" | "prev") => {
      if (flipping || next < 0 || next >= total || next === index) return;
      setDirection(dir);
      setFlipping(true);
      window.setTimeout(() => {
        setIndex(next);
        setFlipping(false);
        setDirection(null);
      }, 500);
    },
    [flipping, index, total]
  );

  const next = useCallback(() => goTo(index + 1, "next"), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, "prev"), [goTo, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="mx-auto w-full max-w-2xl select-none">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 [perspective:1800px] dark:bg-neutral-900"
        role="group"
        aria-roledescription="flipbook"
        aria-label={`Page ${index + 1} of ${total}`}
      >
        {/* current page */}
        <div
          className={`absolute inset-0 origin-right transition-transform duration-500 ease-in-out [backface-visibility:hidden] ${
            flipping && direction === "next" ? "[transform:rotateY(-160deg)]" : ""
          }`}
          style={{ zIndex: flipping && direction === "next" ? 20 : 10 }}
        >
          <Image
            src={pages[index]}
            alt={`${alt} ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 42rem"
            className="object-contain"
            priority={index === 0}
          />
        </div>

        {/* incoming page underneath, revealed as current page flips away */}
        {flipping && direction === "next" && index + 1 < total && (
          <div className="absolute inset-0 z-0">
            <Image
              src={pages[index + 1]}
              alt={`${alt} ${index + 2}`}
              fill
              sizes="(max-width: 640px) 100vw, 42rem"
              className="object-contain"
            />
          </div>
        )}

        {flipping && direction === "prev" && index - 1 >= 0 && (
          <div className="absolute inset-0 z-0">
            <Image
              src={pages[index - 1]}
              alt={`${alt} ${index}`}
              fill
              sizes="(max-width: 640px) 100vw, 42rem"
              className="object-contain"
            />
          </div>
        )}

        {flipping && direction === "prev" && (
          <div
            className="absolute inset-0 z-20 origin-left [backface-visibility:hidden] [transform:rotateY(160deg)] transition-transform duration-0"
          >
            <Image
              src={pages[index]}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 42rem"
              className="object-contain"
            />
          </div>
        )}

        {/* click zones */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={prev}
          disabled={index === 0}
          className="absolute inset-y-0 left-0 z-30 w-1/4 cursor-w-resize disabled:cursor-default"
        />
        <button
          type="button"
          aria-label="Next page"
          onClick={next}
          disabled={index === total - 1}
          className="absolute inset-y-0 right-0 z-30 w-1/4 cursor-e-resize disabled:cursor-default"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="uppercase tracking-widest transition-colors hover:text-neutral-950 disabled:opacity-30 dark:hover:text-neutral-50"
        >
          ← Prev
        </button>
        <span>
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={index === total - 1}
          className="uppercase tracking-widest transition-colors hover:text-neutral-950 disabled:opacity-30 dark:hover:text-neutral-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
