import type { Metadata } from "next";
import { studio } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact — Atelier North",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight">Contact</h1>
      <p className="mt-3 max-w-xl text-neutral-600">
        For project enquiries, collaborations, or press, get in touch.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-12">
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="text-neutral-500 uppercase tracking-widest text-xs">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${studio.email}`} className="font-medium hover:underline">
                {studio.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-neutral-500 uppercase tracking-widest text-xs">Based in</dt>
            <dd className="mt-1 font-medium">{studio.location}</dd>
          </div>
          <div>
            <dt className="text-neutral-500 uppercase tracking-widest text-xs">Focus</dt>
            <dd className="mt-1 font-medium">{studio.tagline}</dd>
          </div>
        </dl>

        <form action={`mailto:${studio.email}`} method="post" encType="text/plain" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-950"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-950"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-950"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-950 text-white text-sm font-medium px-6 py-3 hover:bg-neutral-800"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
