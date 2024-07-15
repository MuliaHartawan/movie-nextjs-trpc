/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: { "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"] },
    transpilePackages: ["admiral"],

  },
};

export default nextConfig;
