/** @type {import('next').NextConfig} */
import withSvgr from "@svgr/webpack";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mxhmryetxradarukkhgs.supabase.co"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
