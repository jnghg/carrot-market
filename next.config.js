/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"], //cloudflare
  },
};

module.exports = nextConfig;
