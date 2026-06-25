import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { processSteps, assetPath } from "@/data/projects";

// Workflow as three alternating full-width rows (text ⇆ image).
export default function ProcessSection() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {processSteps.map((step, i) => {
        const flip = i % 2 === 1;
        return (
          <Reveal key={step.label}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              {/* Text */}
              <div className={flip ? "lg:order-2" : ""}>
                <p className="u-eyebrow">
                  <span className="mr-3 text-neutral-400 dark:text-neutral-600">
                    0{i + 1}
                  </span>
                  {step.label}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
                  {step.body}
                </p>
              </div>

              {/* Image */}
              <Link
                href={step.href}
                className={`group relative block overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${
                  flip ? "lg:order-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={assetPath(step.image)}
                    alt={step.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="u-glass pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1.5">
                  <span className="text-[0.7rem] uppercase tracking-widest">
                    {step.caption}
                  </span>
                </div>
              </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
