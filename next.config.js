/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
    removeConsole:
      process.env.NODE_ENV === 'development'
        ? false
        : {
            exclude: ['error'],
          },
  },
}

module.exports = nextConfig
