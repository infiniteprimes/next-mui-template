/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  // reactStrictMode: true,
  // swcMinify: true,
  // compiler: {
  //   emotion: true,
  //   removeConsole:
  //     process.env.NODE_ENV === 'development'
  //       ? false
  //       : {
  //           exclude: ['error'],
  //         },
  // },
  experimental: { appDir: true },
}

module.exports = nextConfig
