// Example 2: Rewrites
// Demonstrates configuring rewrites in next.config.js

// next.config.js - API proxy
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: 'https://api.example.com/data',
      },
    ]
  },
}

// next.config.js - Pattern rewrites
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.example.com/api/:path*',
      },
    ]
  },
}

// next.config.js - Internal rewrites
module.exports = {
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/app/dashboard',
      },
      {
        source: '/admin/:path*',
        destination: '/app/admin/:path*',
      },
    ]
  },
}

// middleware.ts - Dynamic rewrite
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country
  
  if (country === 'US') {
    return NextResponse.rewrite(new URL('/us-version', request.url))
  }
  
  return NextResponse.next()
}

