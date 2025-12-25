import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // enable image optimization with higher quality
    formats: ["image/avif", "image/webp"],
    // use higher quality (1-100, default is 75)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
