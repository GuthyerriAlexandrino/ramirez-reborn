/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'firebasestorage.googleapis.com']
  },
  compiler: {
    styledComponents: true
  },
}

module.exports = nextConfig