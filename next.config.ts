import type { NextConfig } from "next";
import path from "path";

const repoName = "architecture-portfolio";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
