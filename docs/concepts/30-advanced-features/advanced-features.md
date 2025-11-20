# Advanced Features

> **Category**: Advanced | **Related Concepts**: [App Router](../03-app-router/README.md), [Rendering Strategies](../02-rendering/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js provides advanced features for building high-performance applications, including Edge Functions, Streaming, advanced Server Components patterns, and the Turbopack bundler.

**Key Points:**
- Edge Functions for low latency
- Streaming for faster page loads
- Advanced Server Components patterns
- Turbopack for faster builds
- Partial Prerendering

## 🎯 When to Use

- **Edge Functions**: Low latency requirements
- **Streaming**: Large pages with slow data
- **Server Components**: Complex server-side logic
- **Turbopack**: Faster development builds
- **Performance**: Optimize for speed

## 💻 Basic Example

### Edge Runtime

```typescript
// app/api/edge/route.ts
export const runtime = 'edge'

export async function GET() {
  return Response.json({
    message: 'Running on Edge',
    region: process.env.VERCEL_REGION
  })
}
```

### Streaming with Suspense

```typescript
// app/page.tsx
import { Suspense } from 'react'

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return <div>Loaded!</div>
}

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

## 🔧 Advanced Example

### Edge Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}

export const config = {
  matcher: '/api/:path*'
}
```

### Streaming SSR

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'

async function UserData() {
  const user = await fetchUser()
  return <div>User: {user.name}</div>
}

async function Stats() {
  const stats = await fetchStats()
  return <div>Stats: {stats.count}</div>
}

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserData />
      </Suspense>
      <Suspense fallback={<div>Loading stats...</div>}>
        <Stats />
      </Suspense>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Edge Runtime
```typescript
export const runtime = 'edge'
```
**When to use**: Low latency, global distribution

### Pattern 2: Streaming
```typescript
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```
**When to use**: Slow data fetching

### Pattern 3: Server Components
```typescript
async function ServerComponent() {
  const data = await fetchData()
  return <div>{data}</div>
}
```
**When to use**: Server-side data fetching

## ⚠️ Common Mistakes

### Mistake 1: Using Edge for Heavy Operations
```typescript
// ❌ Wrong: Heavy computation on Edge
export const runtime = 'edge'
export async function GET() {
  const result = heavyComputation() // Edge has limits
}
```

```typescript
// ✅ Correct: Use Node.js runtime
export const runtime = 'nodejs'
export async function GET() {
  const result = heavyComputation()
}
```
**Why**: Edge has limited resources.

### Mistake 2: Not Using Suspense
```typescript
// ❌ Wrong: Blocking render
const data = await fetchData()
return <div>{data}</div>
```

```typescript
// ✅ Correct: Stream with Suspense
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```
**Why**: Suspense enables streaming.

## ✨ Best Practices

1. **Use Edge for simple operations**: Low latency needs
2. **Stream with Suspense**: Faster perceived performance
3. **Leverage Server Components**: Reduce client bundle
4. **Use Turbopack**: Faster development
5. **Optimize data fetching**: Parallel requests
6. **Monitor performance**: Track metrics
7. **Test edge cases**: Different runtimes

## 🔗 Related Concepts

- [App Router](../03-app-router/README.md) - Routing
- [Rendering Strategies](../02-rendering/README.md) - Rendering
- [Server Components](../04-server-components/README.md) - Server Components

## 📚 Resources

### Official Documentation
- [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge)
- [Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Turbopack](https://nextjs.org/docs/app/api-reference/next-cli#turbopack)

## 🎓 Key Takeaways

- Edge Functions for low latency
- Streaming for faster loads
- Server Components reduce bundle size
- Turbopack speeds up development
- Use appropriate runtime for use case
- Monitor and optimize performance

