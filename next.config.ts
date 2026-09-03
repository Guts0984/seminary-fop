import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @sanity/workbench (pulled in by sanity > @sanity/sdk-react) resolves to raw
  // .ts source via the "development" export condition and must be transpiled
  transpilePackages: ["@sanity/workbench"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
