// Example 3: Protected Routes
// Demonstrates protecting routes with authentication

// middleware.ts - Route protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  // Protect dashboard
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}

// app/dashboard/page.tsx - Server component protection
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
    </div>
  )
}

// app/api/protected/route.ts - API route protection
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(session.user.id)
  return Response.json({ data })
}

// app/components/ProtectedContent.tsx - Client-side guard
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])
  
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return null
  }
  
  return <>{children}</>
}

