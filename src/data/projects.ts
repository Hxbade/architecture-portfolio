// Prefix a public-folder path with the deployment base path. Required because
// next/image with `unoptimized` does NOT prepend basePath to image src, so on
// GitHub Pages (served under /architecture-portfolio) raw "/foo.jpg" would 404.
export function assetPath(src: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}

export const studio = {
  name: "Hong'Nakii Bade",
  role: "Project Architect",
  tagline: "Architecture · Design · Art",
  location: "Port Moresby, Papua New Guinea",
  email: "hongnakii.bade@gmail.com",
  // Philosophy line carried through from the printed portfolio.
  creed: "I design with God, purpose, conviction.",
};

// Homepage hero + featured concept (Kundu Tower) renders, with hover labels.
export const home = {
  hero: {
    image: "/projects/kundu-tower/cover.jpg",
    label: "Kundu Tower — Port Moresby (concept)",
    href: "/projects/kundu-tower",
  },
  feature: {
    slug: "kundu-tower",
    title: "Kundu Tower",
    subtitle: "A landmark concept — the kundu drum, drawn as a tower.",
    images: [
      { src: "/projects/kundu-tower/r1.jpg", label: "Tower & forecourt at dusk" },
      { src: "/projects/kundu-tower/r4.jpg", label: "Grand lobby" },
      { src: "/projects/kundu-tower/r2.jpg", label: "Sky restaurant" },
    ],
  },
};

export const profile = {
  intro: [
    "I am Hong'Nakii Bade, a Project Architect with 5+ years of experience based in Port Moresby, Papua New Guinea. My work explores the relationship between contemporary design and local context — climate, culture and community.",
    "This portfolio brings together selected projects, studies and sketches from my academic and professional practice.",
  ],
  philosophy: [
    "With experience spanning commercial, institutional, and community-focused environments, I have contributed to projects across multiple organizations and sectors throughout Papua New Guinea. My work covers the full arc of architectural practice — from early design strategy and spatial planning through to documentation, compliance, and delivery.",
    "My design philosophy is grounded in restraint and precision. I believe the strongest spaces are purposeful, user-centred, and built to last. Whether working within large financial institutions or contributing to smaller, community-scale projects, I bring the same discipline to every brief.",
  ],
  experience: [
    { period: "2026 — Present", role: "Project Architect, Bank South Pacific" },
    { period: "2025 — 2026", role: "BIM Executive, PAC Architects" },
    { period: "2022 — 2025", role: "Senior Graduate Architect, Planpac Group" },
    { period: "2021 — 2022", role: "Graduate Architect, Niugini 21 / Glory Group" },
    { period: "2019 — 2020", role: "Intern Architect, Frameworks Architect" },
  ],
  software: [
    "AutoCAD",
    "Revit",
    "ArchiCAD",
    "SketchUp",
    "Rhino",
    "Blender",
    "D5 Render",
    "Twinmotion",
    "Lumion / Enscape",
    "Adobe Photoshop",
    "Adobe InDesign",
  ],
  designSkills: [
    "Concept development",
    "Spatial planning",
    "Technical documentation",
    "Visualisation",
    "Hand drawing",
  ],
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  role: string;
  summary: string;
  description: string[];
  facts: { label: string; value: string }[];
  // Web-optimised images under /public/projects/<slug>/. First is the cover.
  // When omitted, a generated ProjectVisual is shown instead.
  images?: string[];
  // Portrait image sets render as a grid of tall tiles instead of a wide hero.
  imagesPortrait?: boolean;
  // Supplies the homepage hero image (cover only).
  homeHero?: boolean;
  // Keep this project off the homepage "Selected projects" grid (still on /projects).
  hideFromHome?: boolean;
  // Slug of a drawing-set exhibit (src/data/exhibits.ts) shown as a flipbook
  // at the top of the project page.
  exhibitSlug?: string;
};

export const projects: Project[] = [
  {
    slug: "puma-service-station-lae",
    exhibitSlug: "puma-service-station",
    title: "PUMA Service Station, Lae",
    category: "Commercial / Service Station Refurbishment",
    location: "Coronation Drive, Lae, Morobe Province, PNG",
    year: "2022",
    client: "PUMA Energy PNG Limited",
    role: "Project Architect",
    summary:
      "A refurbishment of PUMA Energy's service station on Coronation Drive, Lae — modernising the forecourt retail offer with a new convenience store and café.",
    description: [
      "The project refurbishes an existing PUMA Energy service station, renewing the convenience retail and café offer that sits behind the fuel forecourt.",
      "The retail floor is reorganised for clear sightlines and easy circulation, with PUMA's red-and-black brand identity carried through the shelving, café counter, and chilled displays.",
      "Work spanned concept design and approvals documentation through to coordination of the building's mechanical, electrical and hydraulic services for the refurbishment.",
    ],
    facts: [
      { label: "Client", value: "PUMA Energy PNG Limited" },
      { label: "Type", value: "Service station refurbishment" },
      { label: "Role", value: "Project Architect" },
      { label: "Year", value: "2022" },
    ],
    images: [
      "/projects/puma-service-station-lae/01.jpg",
      "/projects/puma-service-station-lae/02.jpg",
      "/projects/puma-service-station-lae/03.jpg",
      "/projects/puma-service-station-lae/04.jpg",
    ],
  },
  {
    slug: "nmag-hangar-raaf",
    title: "NMAG Aviation Heritage Gallery",
    category: "Cultural / Aviation Heritage",
    location: "Port Moresby, Papua New Guinea",
    year: "2022",
    client: "The National Museum & Art Gallery",
    role: "Project Architect",
    summary:
      "A hangar-scaled gallery for The National Museum & Art Gallery, housing Papua New Guinea's aviation heritage — including Royal Australian Air Force aircraft from the nation's modern history.",
    description: [
      "The Aviation Heritage Gallery is a new Modern History wing of The National Museum & Art Gallery (NMAG), dedicated to Papua New Guinea's aviation story. The hangar-scaled volume is sized to house and display full heritage aircraft, including Royal Australian Air Force aircraft tied to the country's wartime and post-war history.",
      "A perforated metal screen wraps the facade, filtering the tropical light and giving the building a civic, ceremonial presence. A reflecting pool and landscaped forecourt draw visitors past a mounted heritage aircraft toward the main hangar doors.",
      "Work spanned concept design and massing through to the documentation of the screen facade, large-span hangar structure, and visitor approach.",
    ],
    facts: [
      { label: "Client", value: "National Museum & Art Gallery" },
      { label: "Collection", value: "RAAF heritage aircraft" },
      { label: "Role", value: "Project Architect" },
      { label: "Year", value: "2022" },
    ],
    images: [
      "/projects/nmag-hangar-raaf/01.jpg",
      "/projects/nmag-hangar-raaf/02.jpg",
      "/projects/nmag-hangar-raaf/03.jpg",
      "/projects/nmag-hangar-raaf/04.jpg",
      "/projects/nmag-hangar-raaf/05.jpg",
    ],
  },
  {
    slug: "nambawan-super-fitout",
    exhibitSlug: "nsl-moki",
    title: "Nambawan Super — Moki Flagship Branch",
    category: "Commercial / Branch Fit-out",
    location: "Wewak, Papua New Guinea",
    year: "2025",
    client: "Nambawan Super Limited",
    role: "Project Architect",
    summary:
      "A new flagship member-service branch for Nambawan Super Limited (NSL), Papua New Guinea's largest superannuation fund — interiors that pair the NSL brand with bold Papua New Guinean patterning.",
    description: [
      "The Moki Flagship Branch is a new member-service centre for Nambawan Super Limited (NSL). The fit-out organises service counters, customer support, waiting lounges and a back-of-house call centre into a single, clearly wayfound floor.",
      "The interior pairs NSL's brand identity with bold Papua New Guinean patterning on feature walls, warm timber-slat ceilings, and comfortable lounge settings — giving the branch a welcoming, distinctly local character while supporting efficient day-to-day operations.",
      "Scope covered the full interior fit-out: space planning, joinery and service counters, finishes, and visualisation.",
    ],
    facts: [
      { label: "Client", value: "Nambawan Super Limited" },
      { label: "Type", value: "Flagship branch fit-out" },
      { label: "Role", value: "Project Architect" },
      { label: "Year", value: "2025" },
    ],
    images: [
      "/projects/nambawan-super-fitout/01.jpg",
      "/projects/nambawan-super-fitout/02.jpg",
      "/projects/nambawan-super-fitout/03.jpg",
      "/projects/nambawan-super-fitout/04.jpg",
      "/projects/nambawan-super-fitout/05.jpg",
      "/projects/nambawan-super-fitout/06.jpg",
    ],
  },
  {
    slug: "bsp-card-centre",
    exhibitSlug: "bsp-card-centre",
    title: "BSP Card Centre",
    category: "Commercial / Banking Fit-out",
    location: "Papua New Guinea",
    year: "2026",
    client: "Bank South Pacific (BSP)",
    role: "Project Architect",
    summary:
      "An interior design for Bank South Pacific's member Card Centre — a welcoming, clearly wayfound space for members to replace or collect their bank cards.",
    description: [
      "The BSP Card Centre reimagines the member experience for collecting and replacing bank cards. The plan leads members from a branded welcome wall through to service counters, a comfortable waiting area, and private consultation rooms.",
      "BSP's green brand identity is carried consistently across feature walls, signage, joinery and the upholstered BSP Gold member lounge, while clear wayfinding and generous seating keep the space calm and easy to navigate.",
      "The fit-out is conceived as a repeatable standard — from welcome wall and service counters through to the member lounge — that can roll out across branch locations.",
    ],
    facts: [
      { label: "Client", value: "Bank South Pacific (BSP)" },
      { label: "Type", value: "Member card centre fit-out" },
      { label: "Role", value: "Project Architect" },
      { label: "Year", value: "2026" },
    ],
    images: [
      "/projects/bsp-card-centre/01.jpg",
      "/projects/bsp-card-centre/02.jpg",
      "/projects/bsp-card-centre/03.jpg",
      "/projects/bsp-card-centre/04.jpg",
    ],
  },
  {
    slug: "kundu-tower",
    title: "Kundu Tower",
    category: "Landmark Tower / Concept",
    location: "Port Moresby, Papua New Guinea",
    year: "2026",
    client: "Self-initiated concept",
    role: "Designer",
    summary:
      "A concept for a landmark tower in Port Moresby, its hourglass silhouette drawn directly from the kundu — the traditional Papua New Guinean drum.",
    description: [
      "Kundu Tower reimagines Papua New Guinea's most recognisable instrument as architecture. Stacked, gently rotating floor plates taper to a slender waist before flaring again, tracing the kundu drum's hourglass profile.",
      "Inside, a flared timber column anchors a grand lobby, with a sky restaurant and wrap-around terraces opening onto panoramic views of the harbour and city while shading the glazed facade beneath.",
      "The proposal positions the tower as a civic icon on the Port Moresby skyline, anchoring its waterfront setting.",
    ],
    facts: [
      { label: "Type", value: "Mixed-use landmark tower" },
      { label: "Status", value: "Concept design" },
      { label: "Inspiration", value: "Kundu drum form" },
      { label: "Year", value: "2026" },
    ],
    images: [
      "/projects/kundu-tower/r1.jpg",
      "/projects/kundu-tower/r4.jpg",
      "/projects/kundu-tower/r2.jpg",
      "/projects/kundu-tower/r3.jpg",
      "/projects/kundu-tower/cover.jpg",
      "/projects/kundu-tower/scheme.jpg",
    ],
    hideFromHome: true,
  },
  {
    slug: "united-church",
    exhibitSlug: "united-church-exhibit",
    title: "United Church",
    category: "Notable Work / Community",
    location: "Papua New Guinea",
    year: "2023",
    client: "United Church",
    role: "Designer",
    summary:
      "A design proposal for a United Church congregation, centred on gathering, light and community.",
    description: [
      "A community worship space organised around gathering and natural light, responding to its congregation and local context.",
    ],
    facts: [
      { label: "Client", value: "United Church" },
      { label: "Role", value: "Designer" },
      { label: "Year", value: "2023" },
    ],
    images: [
      "/projects/united-church/01.jpg",
      "/projects/united-church/02.jpg",
      "/projects/united-church/03.jpg",
      "/projects/united-church/04.jpg",
    ],
  },
  {
    slug: "js-coffee-cafe",
    exhibitSlug: "js-coffee-sky-view",
    title: "JS Coffee Café",
    category: "Hospitality / Café",
    location: "Papua New Guinea",
    year: "2024",
    client: "JS Coffee Café",
    role: "Designer",
    summary:
      "An open-air café concept for JS Coffee Café, serving PNG-blended coffee from a relaxed timber pavilion.",
    description: [
      "JS Coffee Café is conceived as a relaxed, open-air pavilion serving locally PNG-blended coffee. A pitched roof shelters a covered dining deck, with timber-batten screens filtering light and air while opening the café to its garden courtyard.",
      "Brick, warm timber and soft evening lighting give the café an inviting, distinctly local character, anchored by the JS Coffee Café service counter and branding.",
    ],
    facts: [
      { label: "Client", value: "JS Coffee Café" },
      { label: "Type", value: "Café concept" },
      { label: "Role", value: "Designer" },
      { label: "Year", value: "2024" },
    ],
    images: [
      "/projects/js-coffee-cafe/01.jpg",
      "/projects/js-coffee-cafe/02.jpg",
      "/projects/js-coffee-cafe/03.jpg",
      "/projects/js-coffee-cafe/04.jpg",
    ],
  },
];
