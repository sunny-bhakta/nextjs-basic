# Middleware Basics

> **Category**: Intermediate | **Related Concepts**: [Request/Response Manipulation](./request-response.md), [Authentication](../16-authentication/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Middleware in Next.js allows you to run code before a request is completed. You can modify requests, redirect, rewrite URLs, set headers, and more. Middleware runs on the Edge runtime.

**Key Points:**
- Runs before request completes
- Edge runtime
- Request/response manipulation
- Redirects and rewrites
- Authentication checks
- Header manipulation

## 🎯 When to Use

- **Authentication**: Protecting routes
- **Redirects**: Conditional redirects
- **Rewrites**: URL rewriting
- **Headers**: Setting custom headers
- **A/B Testing**: Route-based testing
- **Localization**: Language detection

## 💻 Basic Example

### Basic Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: '/about/:path*',
}
```

### Redirect Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url))
  }
}

export const config = {
  matcher: '/old-page',
}
```

### Header Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'custom-value')
  return response
}
```

## 🔧 Advanced Example

### Authentication Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

### Conditional Rewrite

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country
  
  if (country === 'US') {
    return NextResponse.rewrite(new URL('/us', request.url))
  }
  
  return NextResponse.next()
}
```

### Multiple Conditions

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirect old pages
  if (pathname === '/old') {
    return NextResponse.redirect(new URL('/new', request.url))
  }
  
  // Set custom header
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  
  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/old',
    '/:path*',
  ],
}
```

## 📋 Common Patterns

### Pattern 1: Simple Redirect
```typescript
if (pathname === '/old') {
  return NextResponse.redirect(new URL('/new', request.url))
}
```
**When to use**: Simple redirects

### Pattern 2: Authentication Check
```typescript
if (!token && pathname.startsWith('/protected')) {
  return NextResponse.redirect(new URL('/login', request.url))
}
```
**When to use**: Route protection

### Pattern 3: Header Setting
```typescript
const response = NextResponse.next()
response.headers.set('x-custom', 'value')
return response
```
**When to use**: Custom headers

## ⚠️ Common Mistakes

### Mistake 1: Not Returning Response
```typescript
// ❌ Wrong: No return
export function middleware(request: NextRequest) {
  if (condition) {
    NextResponse.redirect(new URL('/new', request.url))
  }
  // Missing return
}
```
**Why**: Must return NextResponse.

```typescript
// ✅ Correct: Return response
export function middleware(request: NextRequest) {
  if (condition) {
    return NextResponse.redirect(new URL('/new', request.url))
  }
  return NextResponse.next()
}
```

### Mistake 2: Wrong Matcher
```typescript
// ❌ Wrong: Matcher too broad
export const config = {
  matcher: '/:path*', // Matches everything
}
```
**Why**: Can cause performance issues.

```typescript
// ✅ Correct: Specific matcher
export const config = {
  matcher: '/dashboard/:path*',
}
```

### Mistake 3: Using Node.js APIs
```typescript
// ❌ Wrong: Node.js API in middleware
import fs from 'fs'
export function middleware(request: NextRequest) {
  fs.readFileSync('file.txt') // Error: Not available in Edge
}
```
**Why**: Middleware runs on Edge, not Node.js.

```typescript
// ✅ Correct: Use Web APIs
export function middleware(request: NextRequest) {
  const url = new URL(request.url) // Web API
  return NextResponse.next()
}
```

## ✨ Best Practices

1. **Keep it fast**: Middleware runs on every request
2. **Use matchers**: Limit middleware to specific routes
3. **Edge-compatible**: Only use Web APIs
4. **Handle errors**: Always return a response
5. **Test thoroughly**: Test all middleware paths
6. **Document logic**: Document middleware behavior

## 🔗 Related Concepts

- [Request/Response Manipulation](./request-response.md) - Advanced manipulation
- [Authentication](../16-authentication/README.md) - Auth in middleware

## 📚 Resources

### Official Documentation
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## 🧪 Practice Exercises

### Exercise 1: Basic Middleware
**Difficulty**: Beginner  
**Goal**: Understand middleware basics  
**Instructions**:
1. Create middleware.ts
2. Add simple redirect
3. Test redirect
4. Verify behavior

### Exercise 2: Auth Middleware
**Difficulty**: Intermediate  
**Goal**: Practice authentication  
**Instructions**:
1. Create auth middleware
2. Protect routes
3. Handle redirects
4. Test all scenarios

## 🎓 Key Takeaways

- Middleware runs before request completes
- Runs on Edge runtime
- Must return NextResponse
- Use matchers to limit scope
- Only Web APIs available
- Keep middleware fast

## ❓ FAQ

### Q: Where do I create middleware?
**A**: Create `middleware.ts` in the root of your project (same level as `app/`).

### Q: Can I use Node.js APIs?
**A**: No, middleware runs on Edge runtime, only Web APIs are available.

### Q: How do I limit middleware to specific routes?
**A**: Use the `matcher` config option.

### Q: Can I use middleware for authentication?
**A**: Yes, middleware is perfect for route protection.

### Q: Does middleware run on static pages?
**A**: No, middleware only runs on dynamic routes and API routes.

---

**Next Steps**: 
- Review: [Request/Response Manipulation](./request-response.md) for advanced usage
- Practice: Create middleware for your app
- Build: Protect routes with middleware

