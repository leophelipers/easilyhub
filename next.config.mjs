/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.pixabay.com', 'plrcristao.shop'],
  },
}

export default nextConfig
