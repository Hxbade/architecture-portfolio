// PNGIA logbook exhibit drawing sets, exported from PDF to page images and
// served as flipbooks at /flipbook/<slug>. Images live in /public/flipbook/<slug>/.
export type Exhibit = {
  slug: string;
  title: string;
  pages: number;
};

export const exhibits: Exhibit[] = [
  { slug: "afp-cadet-accommodation", title: "AFP Cadet Accommodation", pages: 23 },
  { slug: "bsp-card-centre", title: "BSP Card Centre", pages: 20 },
  { slug: "nsl-moki", title: "NSL Moki Business Park", pages: 50 },
  { slug: "lae-market-police-base", title: "Lae Market & Police Base", pages: 16 },
  { slug: "united-church-exhibit", title: "United Church", pages: 8 },
  { slug: "duplex-design", title: "Duplex Design", pages: 2 },
  { slug: "lae-commercial-building", title: "Lae Commercial Building", pages: 9 },
  { slug: "east-boroko-residential", title: "East Boroko Residential", pages: 14 },
  { slug: "js-coffee-sky-view", title: "JS Coffee & Sky View", pages: 7 },
  { slug: "puma-service-station", title: "Puma Service Station — Lae & Alotau", pages: 19 },
];

export function getExhibit(slug: string): Exhibit | undefined {
  return exhibits.find((e) => e.slug === slug);
}
