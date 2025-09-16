import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS ? '/foodtrucks' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS ? '/foodtrucks/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
