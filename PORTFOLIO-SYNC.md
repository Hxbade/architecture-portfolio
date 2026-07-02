# Portfolio Sync Playbook

Monthly procedure to sync this portfolio site with Hong'Nakii Bade's live
project archive. Followed by the scheduled task `monthly-portfolio-sync`.

- **Repo:** `C:\Users\Exo\Projects\architecture-portfolio` (Next.js 16 static
  export → GitHub Pages via `.github/workflows/deploy.yml` on push to `main`).
  Live: https://hxbade.github.io/architecture-portfolio/
- **Source archive:** `C:\Users\Exo\Documents\Architecture Projects`
  (occasionally also `C:\Users\Exo\Desktop\Bade3`).

## 1. Discover what's new

1. List top-level folders in the source archive. Each folder ≈ one project.
2. Ignore noise inside projects: `asset/`, `ModelTextures/`, `BackUp/`,
   `/um/`, `SceneImage/`, `/d5a/`, texture files, `icon.png`, `*.tmp`,
   AI-generated images (e.g. `ChatGPT Image *`), CAD/model source files
   (`.skp .pln .dwg .tm .drs`).
3. Compare against `src/data/projects.ts` (slugs/titles) and
   `src/data/exhibits.ts`. `git log` since the last sync commit shows what was
   already ingested. A project is a candidate if it is new, or has new renders
   or new drawing-set PDFs.
4. Skip folders that contain only internal client documentation (inspection
   reports, transmittals, contracts) with no presentable renders or drawings —
   list them in the final report for the user to decide.

## 2. Ingest images (renders / photos)

1. Pick the strongest 3–6 renders per project (exteriors, key interiors,
   branding shots). Prefer final-design sets over superseded options.
2. Export web-optimised copies to `public/projects/<slug>/01.jpg`, `02.jpg`, …
   with Python/PIL: `convert("RGB")`, resize to max 1600 px wide (LANCZOS),
   save JPEG `quality=82, optimize=True, progressive=True` (target ≤ ~250 KB).
3. First image = cover. Portrait-heavy sets: set `imagesPortrait: true`.

## 3. Ingest drawing sets (PDF → flipbook)

1. Stage source PDFs under `flipbook-sources/<project>/` (gitignored — never
   commit source PDFs; per-page merged sheets stay out of the repo).
2. Convert every page to images with PyMuPDF (`import fitz`): render each page
   at a zoom giving ~1600 px width, save as
   `public/flipbook/<slug>/page-001.jpg` (3-digit, 1-based), JPEG q80–85.
3. Register in `src/data/exhibits.ts`: `{ slug, title, pages }`.
4. Link the project: set `exhibitSlug: "<slug>"` on its entry in
   `src/data/projects.ts` (renders the flipbook at the top of the project
   page). Standalone sets with no project entry still appear at `/flipbook`.

## 4. Project data entry

Add/update the entry in `src/data/projects.ts` (`Project` type):
`slug, title, category, location, year, client, role, summary,
description[2–3 paragraphs], facts[], images[], exhibitSlug?`.

- Derive client / location / year / project number from drawing **title
  blocks** (render page 1 text via pypdf/fitz) and folder names.
- **Never fabricate** clients, dates, roles, or credentials. If unknown, use
  conservative wording ("Papua New Guinea", omit client) and flag it in the
  final report.
- Image paths always start `/projects/...` — `assetPath()` adds the deployment
  base path at runtime. Never hardcode `/architecture-portfolio` in data.

## 5. Experience page

If the new work represents professional experience, add a timeline item in
`src/data/experience.ts` under the right year group. Employer periods:
Frameworks (2019–20) → Niugini 21 (2021–22) → Glory Group (early 2022) →
Planpac/PAC (Jun 2022 – Apr 2026) → **Bank South Pacific (Apr 2026 – present)**.
Only reference PNGIA logbook hours (`src/data/logbook.ts` +
`public/logbook/*.pdf`) if the logbook actually covers the project.

## 6. Verify & deploy

1. `npm run build` must pass (28+ routes; new project/flipbook routes present
   in output).
2. Spot-check locally if a preview is available (images load, flipbook opens).
3. Commit everything (code + `public/` assets; **not** `flipbook-sources/`),
   message style: `Portfolio sync <YYYY-MM>: add <projects…>`.
4. `git push origin main`, then confirm the Pages workflow succeeds:
   `https://api.github.com/repos/Hxbade/architecture-portfolio/actions/runs?per_page=1`.

## 7. Report

End with a summary: projects added/updated, images and flipbook pages
generated, experience entries added, folders skipped (and why), and any fields
needing the user's confirmation (client names, dates, locations).

## Hard rules

- Never delete existing projects, images, exhibits, or logbook files.
- Never publish confidential-looking material without flagging it.
- Keep the repo lean: only web-optimised assets are committed.
- Don't change site structure/design during a sync — content only.
