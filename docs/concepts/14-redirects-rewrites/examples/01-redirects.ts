// Example 1: Redirects
// Demonstrates configuring redirects in next.config.js

// next.config.js - Simple redirects
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
      {
        source: '/old-blog',
        destination: '/blog',
        permanent: false, // 302 redirect
      },
    ]
  },
}

// next.config.js - Pattern redirects
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/products/:id',
        destination: '/items/:id',
        permanent: true,
      },
    ]
  },
}

// next.config.js - Multiple redirects
module.exports = {
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
      },
      {
        source: '/legacy/:path*',
        destination: '/modern/:path*',
        permanent: true,
      },
      {
        source: '/redirect-me',
        destination: '/new-location',
        permanent: false,
      },
    ]
  },
}

// middleware.ts - Dynamic redirect
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country
  
  if (country === 'US' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/us', request.url))
  }
  
  return NextResponse.next()
}

