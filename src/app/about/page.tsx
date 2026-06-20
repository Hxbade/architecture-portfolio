import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Studio Name",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid sm:grid-cols-3 gap-12">
        <div className="sm:col-span-1">
          <ImagePlaceholder label="Portrait" aspect="aspect-[3/4]" />
        </div>
        <div className="sm:col-span-2">
          <h1 className="text-3xl font-medium tracking-tight">About</h1>
          <div className="mt-6 space-y-4 text-neutral-700 max-w-xl">
            <p>
              Studio Name is a small architecture practice based in Auckland,
              working on residential, civic, and adaptive reuse projects
              across New Zealand.
            </p>
            <p>
              Each project begins with the site — its light, contours, and
              history — and is developed in close collaboration with clients
              and consultants from concept through to construction.
            </p>
            <p>
              Replace this page with your own background, qualifications, and
              practice philosophy.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500">
              Recognition
            </h2>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li>NZIA Local Architecture Award — 2024</li>
              <li>Houses Award, Finalist — 2023</li>
              <li>Sustainable Design Citation — 2022</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
