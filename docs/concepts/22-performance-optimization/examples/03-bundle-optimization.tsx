// Example 3: Bundle Optimization
// Demonstrates bundle optimization techniques

// app/page.tsx - Optimized imports
// Only import what you need
import { useState } from 'react' // Tree-shakeable
// Avoid: import * as React from 'react'

// Use dynamic imports for heavy libraries
const HeavyLibrary = dynamic(() => import('heavy-library'), {
  loading: () => <div>Loading...</div>
})

import dynamic from 'next/dynamic'

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <HeavyLibrary />
    </div>
  )
}

// next.config.js - Bundle optimization configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production builds
  swcMinify: true,
  
  // Compress output
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // External dependencies (if needed)
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

// app/components/OptimizedComponent.tsx
// Use React.memo for expensive components
import { memo } from 'react'

interface Props {
  data: string[]
}

const OptimizedComponent = memo(function OptimizedComponent({ data }: Props) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
})

export default OptimizedComponent

// app/api/analyze-bundle/route.ts - Bundle analysis endpoint
import { NextResponse } from 'next/server'

export async function GET() {
  // In production, use webpack-bundle-analyzer
  return NextResponse.json({
    message: 'Run: ANALYZE=true npm run build to analyze bundle',
    tips: [
      'Use dynamic imports for heavy components',
      'Remove unused dependencies',
      'Use tree-shaking friendly imports',
      'Optimize images and fonts',
      'Monitor bundle size regularly'
    ]
  })
}

// package.json scripts for bundle analysis
/*
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "build": "next build"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0"
  }
}
*/

// next.config.js with bundle analyzer
/*
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your Next.js config
})
*/

