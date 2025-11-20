// Example 5: Complete Authentication Example
// A comprehensive example combining all authentication concepts

// app/api/auth/[...nextauth]/route.ts - Complete NextAuth setup
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await verifyUser(credentials?.email, credentials?.password)
        if (user) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }

// middleware.ts - Complete middleware protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl
  
  // Public routes
  const publicRoutes = ['/login', '/signup', '/']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// app/dashboard/page.tsx - Protected dashboard
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
      <p>Role: {session.user?.role}</p>
    </div>
  )
}

// app/login/page.tsx - Login page
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/dashboard')
    }
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign in</button>
      </form>
      
      <div>
        <button onClick={() => signIn('google')}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

// app/components/UserMenu.tsx - User menu component
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return (
      <button onClick={() => router.push('/login')}>
        Sign in
      </button>
    )
  }
  
  return (
    <div>
      <p>{session.user?.email}</p>
      {session.user?.role === 'admin' && (
        <a href="/admin">Admin</a>
      )}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

// Summary:
// - NextAuth.js setup with multiple providers
// - Middleware protection
// - Protected pages
// - Login page
// - User menu
// - Role-based access

