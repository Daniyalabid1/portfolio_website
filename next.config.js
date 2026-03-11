/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/portfolio_website" : "",
  assetPrefix: isProd ? "/portfolio_website/" : "",
};

export default nextConfig;