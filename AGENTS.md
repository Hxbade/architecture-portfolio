<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio content sync

Content is synced monthly from `C:\Users\Exo\Documents\Architecture Projects`.
The full procedure (image export conventions, PDF→flipbook conversion, data
entry rules, deploy verification) lives in **PORTFOLIO-SYNC.md** — follow it
for any content-ingestion work. All content lives in `src/data/*.ts`; image
paths go through `assetPath()` (never hardcode the GitHub Pages base path).
