export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  description: string[];
  facts: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "meridian-house",
    title: "Meridian House",
    category: "Residential",
    location: "Auckland, NZ",
    year: "2024",
    summary: "A single-storey courtyard house organised around light and a sequence of garden rooms.",
    description: [
      "Meridian House reorganises a tight urban site around a central courtyard, allowing every habitable room to receive direct daylight.",
      "Material palette is restrained — in-situ concrete, spotted gum joinery, and a standing-seam roof — to keep focus on spatial sequence rather than ornament.",
    ],
    facts: [
      { label: "Type", value: "New build" },
      { label: "Area", value: "210 m²" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "harbour-lookout",
    title: "Harbour Lookout",
    category: "Civic",
    location: "Wellington, NZ",
    year: "2023",
    summary: "A timber viewing pavilion cantilevered over the headland, commissioned by the local council.",
    description: [
      "The pavilion is conceived as a single gesture — a folded timber roof plane lifting toward the harbour view.",
      "Structure is exposed throughout, with glue-laminated portal frames left visible as the primary architectural language.",
    ],
    facts: [
      { label: "Type", value: "Public pavilion" },
      { label: "Area", value: "85 m²" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "kiln-street-studio",
    title: "Kiln Street Studio",
    category: "Adaptive Reuse",
    location: "Christchurch, NZ",
    year: "2022",
    summary: "Conversion of a former pottery workshop into a live/work studio for two practising artists.",
    description: [
      "The existing brick shell was retained and reinforced, with a new mezzanine inserted to create a discrete living level above the working studio.",
      "Original kiln chimneys remain as found objects within the new plan, anchoring the building's history within its new use.",
    ],
    facts: [
      { label: "Type", value: "Adaptive reuse" },
      { label: "Area", value: "160 m²" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "ridge-line-residence",
    title: "Ridge Line Residence",
    category: "Residential",
    location: "Queenstown, NZ",
    year: "2025",
    summary: "A low, linear house tracing the contour of a steep alpine ridge, currently under construction.",
    description: [
      "The house is split into three pavilions connected by glazed links, stepping down the site to minimise excavation.",
      "Deep eaves and a dark, low-maintenance envelope respond to the alpine climate while keeping the building visually quiet on the ridge.",
    ],
    facts: [
      { label: "Type", value: "New build" },
      { label: "Area", value: "340 m²" },
      { label: "Status", value: "Under construction" },
    ],
  },
];
