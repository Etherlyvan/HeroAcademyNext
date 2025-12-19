import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hapus reactCompiler karena tidak dikenali di Next.js 15.1.3
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https", 
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;