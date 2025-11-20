// Example 1: Next.js Plugins
// Demonstrates using Next.js plugins

// ============================================
// Example 1: next-pwa Plugin
// File: next.config.js
// ============================================

/*
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
  ],
})

module.exports = withPWA({
  reactStrictMode: true,
})
*/

// ============================================
// Example 2: Bundle Analyzer
// File: next.config.js
// ============================================

/*
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
})

// Usage: ANALYZE=true npm run build
*/

// ============================================
// Example 3: next-seo Plugin
// File: next.config.js
// ============================================

/*
// Note: next-seo is typically used in components, not config
// But here's how you might configure it

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// Usage in components:
// import { NextSeo } from 'next-seo'
// <NextSeo title="Page Title" description="Description" />
*/

// ============================================
// Example 4: next-compose-plugins
// File: next.config.js
// ============================================

/*
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
  withPWA,
  withBundleAnalyzer,
], {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
})
*/

// ============================================
// Example 5: next-transpile-modules
// File: next.config.js
// ============================================

/*
const withTM = require('next-transpile-modules')([
  'some-module',
  'and-another',
])

module.exports = withTM({
  reactStrictMode: true,
})
*/

// ============================================
// Example 6: next-images Plugin
// File: next.config.js
// ============================================

/*
// Note: Next.js has built-in image optimization
// But if you need custom image handling:

const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
})
*/

