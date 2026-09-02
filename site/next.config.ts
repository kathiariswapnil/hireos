import type { NextConfig } from "next";

const repo = "hireos";
const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(githubPages ? { basePath: `/${repo}` } : {}),
};

export default nextConfig;
