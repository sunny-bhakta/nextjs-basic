// Example 1: next.config.js Configuration
// Demonstrates various next.config.js options

// ============================================
// Example 1: Basic Configuration
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const basicConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Image optimization
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

// module.exports = basicConfig

// ============================================
// Example 2: Environment Variables
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const envConfig = {
  // Expose environment variables to client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Server-side only (not exposed to client)
  serverRuntimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
}

// module.exports = envConfig

// ============================================
// Example 3: Redirects and Rewrites
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const routingConfig = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 redirect
      },
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: false, // 307 redirect
      },
    ]
  },
  
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/docs/:path*',
        destination: '/api/docs/:path*',
      },
    ]
  },
}

// module.exports = routingConfig

// ============================================
// Example 4: Security Headers
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const securityConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

// module.exports = securityConfig

// ============================================
// Example 5: Complete Configuration
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const completeConfig = {
  // React settings
  reactStrictMode: true,
  
  // Build optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  
  // Output configuration
  output: 'standalone', // For Docker deployments
  
  // Experimental features
  experimental: {
    appDir: true,
  },
}

// module.exports = completeConfig

