# Protected Routes

> **Category**: Intermediate | **Related Concepts**: [NextAuth.js](./nextauth.md), [Middleware](../13-middleware/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Protected routes require authentication before access. In Next.js, you can protect routes using middleware, server-side checks, or client-side guards.

**Key Points:**
- Route protection
- Authentication checks
- Redirects for unauthorized
- Server and client protection
- Role-based access
- API route protection

## 🎯 When to Use

- **Private Pages**: Pages that require login
- **Admin Routes**: Admin-only pages
- **User Dashboards**: User-specific content
- **API Protection**: Securing API endpoints
- **Role-Based Access**: Different access levels

## 💻 Basic Example

### Middleware Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

### Server Component Protection

```typescript
// app/dashboard/page.tsx
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
```

### API Route Protection

```typescript
// app/api/protected/route.ts
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
```

## 🔧 Advanced Example

### Role-Based Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl
  
  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  // User routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
```

### Client-Side Protection

```typescript
// app/components/ProtectedContent.tsx
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
```

### Reusable Auth Check

```typescript
// lib/auth.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return session
}

export async function requireRole(role: string) {
  const session = await requireAuth()
  
  if (session.user.role !== role) {
    redirect('/unauthorized')
  }
  
  return session
}

// app/admin/page.tsx
import { requireRole } from '@/lib/auth'

export default async function AdminPage() {
  const session = await requireRole('admin')
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Middleware Protection
```typescript
if (!token && pathname.startsWith('/protected')) {
  return NextResponse.redirect(new URL('/login', request.url))
}
```
**When to use**: Route-level protection

### Pattern 2: Server Check
```typescript
const session = await getServerSession(authOptions)
if (!session) redirect('/login')
```
**When to use**: Page-level protection

### Pattern 3: Client Guard
```typescript
const { data: session } = useSession()
if (!session) router.push('/login')
```
**When to use**: Client-side protection

## ⚠️ Common Mistakes

### Mistake 1: Only Client-Side Protection
```typescript
// ❌ Wrong: Only client check
'use client'
const { data: session } = useSession()
if (!session) return <div>Not authorized</div>
// Can be bypassed
```
**Why**: Client-side checks can be bypassed.

```typescript
// ✅ Correct: Server-side check
const session = await getServerSession(authOptions)
if (!session) redirect('/login')
```

### Mistake 2: Not Protecting API Routes
```typescript
// ❌ Wrong: Unprotected API
export async function GET() {
  const data = await getData() // No auth check
  return Response.json({ data })
}
```
**Why**: API routes need protection too.

```typescript
// ✅ Correct: Protect API routes
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await getData()
  return Response.json({ data })
}
```

### Mistake 3: Not Handling Loading
```typescript
// ❌ Wrong: No loading state
const { data: session } = useSession()
return <div>{session.user.email}</div> // Might be undefined
```
**Why**: Session loads asynchronously.

```typescript
// ✅ Correct: Handle loading
const { data: session, status } = useSession()
if (status === 'loading') return <div>Loading...</div>
if (!session) return <div>Not signed in</div>
return <div>{session.user.email}</div>
```

## ✨ Best Practices

1. **Protect on server**: Always check auth on server
2. **Use middleware**: For route-level protection
3. **Protect APIs**: Secure API routes too
4. **Handle loading**: Show loading states
5. **Role-based**: Implement role-based access
6. **Clear errors**: Provide clear error messages

## 🔗 Related Concepts

- [NextAuth.js](./nextauth.md) - Authentication
- [Middleware](../13-middleware/README.md) - Route protection
- [API Routes](../06-api-routes/README.md) - API protection

## 📚 Resources

### Official Documentation
- [Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

## 🧪 Practice Exercises

### Exercise 1: Basic Protection
**Difficulty**: Beginner  
**Goal**: Understand route protection  
**Instructions**:
1. Protect a route with middleware
2. Test redirect behavior
3. Verify protection works
4. Test authenticated access

### Exercise 2: Role-Based Access
**Difficulty**: Intermediate  
**Goal**: Practice role-based protection  
**Instructions**:
1. Implement role-based protection
2. Protect admin routes
3. Test different roles
4. Handle unauthorized access

## 🎓 Key Takeaways

- Always protect on server
- Use middleware for routes
- Protect API routes too
- Handle loading states
- Implement role-based access
- Provide clear error messages

## ❓ FAQ

### Q: Should I protect on client or server?
**A**: Always protect on server. Client protection is for UX only.

### Q: How do I protect API routes?
**A**: Check session in API route handler before processing.

### Q: Can I use middleware for all protection?
**A**: Yes, middleware is great for route-level protection.

### Q: How do I implement role-based access?
**A**: Check user role in middleware or server components.

### Q: What about client-side protection?
**A**: Use for UX (loading states), but always verify on server.

---

**Next Steps**: 
- Review: [NextAuth.js](./nextauth.md) for authentication
- Practice: Protect routes in your app
- Build: Secure your application

