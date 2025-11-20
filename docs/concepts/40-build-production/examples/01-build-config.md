# Build Configuration

## Basic Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Enable compression
  compress: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
```

## Production Optimizations

```javascript
// next.config.js
const nextConfig = {
  // Production-only optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    swcMinify: true,
    optimizeFonts: true,
  }),
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

## Standalone Output

```javascript
// next.config.js
const nextConfig = {
  // Standalone output for Docker
  output: 'standalone',
}
```

## Bundle Analyzer

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your config
})
```

## Environment Variables

```javascript
// next.config.js
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    API_URL: process.env.API_URL,
  },
}
```

