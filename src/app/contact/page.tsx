import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { studio } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact — Hong'Nakii Bade",
};

const fieldClass =
  "mt-1 w-full border border-neutral-300 bg-transparent px-3 py-2 text-sm transition-colors focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100";

const labelClass =
  "block text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <h1 className="text-3xl font-medium tracking-tight">Contact</h1>
        <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          For project enquiries, collaborations, or press, get in touch.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-12">
        <Reveal>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className={labelClass}>Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${studio.email}`}
                  className="font-medium transition-colors hover:text-neutral-500 dark:hover:text-neutral-400"
                >
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Based in</dt>
              <dd className="mt-1 font-medium">{studio.location}</dd>
            </div>
            <div>
              <dt className={labelClass}>Focus</dt>
              <dd className="mt-1 font-medium">{studio.tagline}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <form
            action={`mailto:${studio.email}`}
            method="post"
            encType="text/plain"
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input id="name" name="name" type="text" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={fieldClass}
              />
            </div>
            <button
              type="submit"
              className="bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-300"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
