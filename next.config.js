/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.prismic.io'],
  },
  experimental: {
    appDir: true,

  },
}

module.exports = nextConfig
