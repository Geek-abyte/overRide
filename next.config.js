/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's now deprecated in Next.js 15
  // Remove appDir from experimental as it's now the default
};

module.exports = nextConfig;
