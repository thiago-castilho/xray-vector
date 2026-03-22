import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Evita bug em dev ("SegmentViewNode" / React Client Manifest) do painel Segment Explorer.
  // Se precisar da ferramenta, remova ou defina como true e limpe a pasta `.next`.
  experimental: {
    devtoolSegmentExplorer: false
  }
};

export default nextConfig;
