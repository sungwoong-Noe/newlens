import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['newlens.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newlens.vercel.app',
      }
    ]
  }
};

export default nextConfig;
