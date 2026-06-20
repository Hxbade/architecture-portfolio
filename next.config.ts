import type { NextConfig } from "next";
import path from "path";

const repoName = "architecture-portfolio";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
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
