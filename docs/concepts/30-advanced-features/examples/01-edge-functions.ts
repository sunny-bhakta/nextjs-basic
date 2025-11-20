// Example 1: Edge Functions
// Demonstrates Edge runtime and Edge Functions

// ============================================
// Example 1: Basic Edge API Route
// File: app/api/edge/route.ts
// ============================================

export const runtime = 'edge'

export async function GET() {
  return Response.json({
    message: 'Running on Edge',
    region: process.env.VERCEL_REGION || 'unknown',
    timestamp: new Date().toISOString()
  })
}

// ============================================
// Example 2: Edge Route with Headers
// File: app/api/edge-headers/route.ts
// ============================================

export const runtime = 'edge'

export async function GET(request: Request) {
  const headers = new Headers()
  headers.set('x-edge-runtime', 'true')
  headers.set('x-region', process.env.VERCEL_REGION || 'unknown')
  
  return Response.json(
    { message: 'Edge route with custom headers' },
    { headers }
  )
}

// ============================================
// Example 3: Edge Middleware
// File: middleware.ts
// ============================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add custom header
  const response = NextResponse.next()
  response.headers.set('x-edge-middleware', 'true')
  response.headers.set('x-pathname', request.nextUrl.pathname)
  
  // Example: Redirect based on condition
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url))
  }
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*'
  ]
}

// ============================================
// Example 4: Edge Route with Geo
// File: app/api/geo/route.ts
// ============================================

export const runtime = 'edge'

export async function GET(request: Request) {
  const country = request.geo?.country || 'unknown'
  const city = request.geo?.city || 'unknown'
  const region = request.geo?.region || 'unknown'
  
  return Response.json({
    country,
    city,
    region,
    message: `Hello from ${city}, ${country}!`
  })
}

// ============================================
// Example 5: Edge Route with Caching
// File: app/api/edge-cache/route.ts
// ============================================

export const runtime = 'edge'

export async function GET() {
  const data = {
    message: 'Cached response',
    timestamp: new Date().toISOString()
  }
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}

