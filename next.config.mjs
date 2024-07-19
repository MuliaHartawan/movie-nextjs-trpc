import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: { "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"] },
  },
  transpilePackages: ["admiral"],
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.join(import.meta.dirname, "");
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
