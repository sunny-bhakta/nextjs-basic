// Example 2: Authentication Middleware
// Demonstrates authentication in middleware

// middleware.ts - Auth protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  // Protect dashboard routes
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Protect admin routes
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}

// middleware.ts - Role-based protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  const role = request.cookies.get('user-role')
  
  // Admin routes require admin role
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || role?.value !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

// middleware.ts - Conditional redirect
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country
  const pathname = request.nextUrl.pathname
  
  // Redirect based on country
  if (country === 'US' && pathname === '/') {
    return NextResponse.redirect(new URL('/us', request.url))
  }
  
  // A/B testing
  const variant = request.cookies.get('ab-variant')
  if (pathname === '/test' && variant?.value === 'b') {
    return NextResponse.rewrite(new URL('/test-variant-b', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/test'],
}

