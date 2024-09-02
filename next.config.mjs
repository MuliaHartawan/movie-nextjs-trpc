import { withSentryConfig } from "@sentry/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: { "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"] },
  },
  transpilePackages: ["admiral"],
  webpack: (config) => {
    config.resolve.alias["@/components"] = path.join(__dirname, "src/app/_components");
    config.resolve.alias["@/app"] = path.join(__dirname, "src/app");
    config.resolve.alias["@/common"] = path.join(__dirname, "src/common");
    config.resolve.alias["@/libs"] = path.join(__dirname, "src/libs");
    config.resolve.alias["@/server"] = path.join(__dirname, "src/server");
    config.resolve.alias["@/utils"] = path.join(__dirname, "src/utils");
    config.resolve.alias["@/types"] = path.join(__dirname, "src/types");
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: "sentry",
  authToken: process.env.SENTRY_TOKEN,
  project: process.env.SENTRY_PROJECT,
  sentryUrl: process.env.SENTRY_URL,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  productionBrowserSourceMaps: true,
});
