import Reveal from "@/components/Reveal";
import { profile } from "@/data/projects";

// Vertical milestone timeline (year ⇆ role) built from the employment history.
export default function HomeTimeline() {
  return (
    <ol className="relative mx-auto max-w-3xl border-l border-neutral-200 pl-8 dark:border-neutral-800 sm:pl-10">
      {profile.experience.map((item, i) => (
        <Reveal key={item.period} delay={i * 70}>
          <li className="relative pb-10 last:pb-0">
            <span className="absolute -left-[35px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-neutral-300 ring-4 ring-background dark:bg-neutral-600 sm:-left-[43px]" />
            <p className="u-eyebrow">{item.period}</p>
            <p className="mt-1.5 text-base font-medium tracking-tight sm:text-lg">
              {item.role}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
