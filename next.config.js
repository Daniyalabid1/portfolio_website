/** @type {import('next').NextConfig} */

// Only use the repo subpath when building for GitHub Pages (set GITHUB_PAGES=true).
const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGhPages ? "/portfolio_website" : "",
  assetPrefix: isGhPages ? "/portfolio_website/" : "",
};

export default nextConfig;