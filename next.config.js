/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack
  experimental: {
    turbo: true,
  },
  // Add these configurations
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  // Disable Babel
  webpack: (config) => {
    // Ensure SWC is used instead of Babel
    config.resolve.alias = {
      ...config.resolve.alias,
      '@swc/helpers': require.resolve('@swc/helpers')
    }
    return config
  },
  // Recommended optimizations
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 