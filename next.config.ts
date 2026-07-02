import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
// Derive the repo name from CI so the base path survives a repo rename.
// A user-site repo (hxbade.github.io) is served from the domain root, so it
// needs no base path — renaming the repo to that automatically yields the
// clean root URL with zero config changes.
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "architecture-portfolio";
const isUserSite = repoName.endsWith(".github.io");
const basePath = isGithubPages && !isUserSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  // Static export can't run the image optimizer, so serve images as-is.
  // NOTE: with unoptimized images, next/image does NOT prepend basePath to the
  // src, so we expose it and prefix image paths ourselves via assetPath().
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
