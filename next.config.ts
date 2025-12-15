import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // No remote images needed - we use local files
  images: {
    unoptimized: true,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['react-icons', 'zustand'],
  },
}

export default nextConfig
