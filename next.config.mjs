import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: { "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"] },
  },
  transpilePackages: ["admiral"],
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.join(__dirname, "");
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
