/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
