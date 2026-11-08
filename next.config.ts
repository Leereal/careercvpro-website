import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Serve the site on one host only: send the bare domain to www so
        // Google doesn't index two copies of every page.
        source: "/:path*",
        has: [{ type: "host", value: "careercvpro.co.za" }],
        destination: "https://www.careercvpro.co.za/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
