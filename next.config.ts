import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Repo name sub-path for GitHub Pages: https://sjarvie-wisr.github.io/claude-api/
  basePath: '/claude-api',
  images: { unoptimized: true }, // static export doesn't support Next.js image optimisation
};

export default nextConfig;
