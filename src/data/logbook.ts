// Per-project PNGIA logbook exports. Each PDF merges the monthly practical-
// training records for the months that project appears in (public/logbook/<id>.pdf).
// `hours` is the total logged on that project. Keyed by the Experience item title.
export const logbookByTitle: Record<string, { id: string; hours: number }> = {
  // 2025 — 2026
  "NSL — Aopi Haus, Head Office Fit-out": { id: "nsl-fitout-aopi-haus", hours: 346 },
  "NSL — Wewak Branch Fit-out": { id: "nsl-fitout-wewak", hours: 210 },
  "NSL — Moki Business Park, Tenancy Fit-out": { id: "nsl-fitout-moki-business-park", hours: 236 },
  "NSL — Goroka Branch Fit-out": { id: "nsl-fitout-goroka", hours: 56 },
  // 2024
  "NSL — Head Office & POM 2 Branch Relocation to Moki": { id: "nsl-head-office-pom-2-branch-relocation-to-mok", hours: 11.5 },
  "TTID — Australia Awards Commercial Office Fit-out": { id: "ttid-australia-awards-commercial-office-fitout", hours: 14.4 },
  "NSL — Kerema Branch Upgrade (Southern Region)": { id: "nsl-1x-kerema-branch-upgrade-southern-region", hours: 1.5 },
  // 2023
  "DVA — NMAG Mezzanine & Art Gallery": { id: "dva-nmag-mezzanine-art-gallery", hours: 103 },
  "Puma Energy — Alotau": { id: "puma-energy-alotau", hours: 121.5 },
  "SANTOS — Iagifu Ridge Camp Building Upgrades": { id: "santos-iagifu-ridge-camp-building-upgrades", hours: 12.2 },
  "Abt — PNGWL PWC Office Fit-out": { id: "abt-pngwl-pwc-office-fitout", hours: 48.3 },
  "Abt — AROB Sago Toilets": { id: "abt-arob-sago-toilets", hours: 19.5 },
  "Colliers — IMF Port Moresby Office Fit-out": { id: "colliers-imf-pom-office-fitout", hours: 35.4 },
  "WB — Lakosi Place, CEO Residence": { id: "wb-lakosi-place-ceo-residence", hours: 403.3 },
  "HD — CMS Facilities Management": { id: "hd-cms-facilities-management", hours: 72.5 },
  "DPNGL — Digicel New HQ Office Design (RFT)": { id: "dpngl-digicel-new-hq-office-design-rft", hours: 31.6 },
  "Miyamoto — PNG Affordable Housing": { id: "miyamoto-png-affordable-housing", hours: 4.8 },
  "KP — Bush Pit Toilet": { id: "kp-bush-pit-toilet", hours: 7.5 },
  // 2022
  "Puma Energy — Coronation Drive, Lae": { id: "puma-energy-coronation-drive-lae", hours: 91.5 },
  "NMAG — Aircraft Heritage Hangar": { id: "nmag-aircraft-heritage-hanger", hours: 18 },
  "ESIP — Lae Main Market Design": { id: "esip-lae-main-market-design", hours: 54.7 },
  "UNOPS — Kada Gunan Fit-out": { id: "unops-kada-gunan-fitout", hours: 276.5 },
  "WB — Ela Hanua Compound": { id: "wb-ela-hanua-compound", hours: 143.2 },
  "WB — Asset Maintenance Services": { id: "wb-asset-maintenance-services", hours: 29.2 },
  "AFP — BPTC Classroom": { id: "afp-bptc-classroom", hours: 3.5 },
  "LDS — Popondetta": { id: "lds-popondetta", hours: 34 },
};
