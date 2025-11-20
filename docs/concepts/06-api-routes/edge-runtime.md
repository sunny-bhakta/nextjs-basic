# Edge Runtime

> **Category**: Core | **Related Concepts**: [Route Handlers](./route-handlers.md), [Performance Optimization](../22-performance-optimization/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Edge Runtime allows Route Handlers to run on the Edge network, closer to users. This provides faster response times, lower latency, and better global performance. However, Edge Runtime has limitations compared to Node.js runtime.

**Key Points:**
- Runs on Edge network (Vercel Edge, Cloudflare Workers, etc.)
- Faster response times and lower latency
- Limited Node.js APIs available
- Smaller bundle size
- Better for simple, fast operations
- Not suitable for all use cases

## 🎯 When to Use

- **Fast Responses**: When you need the fastest possible response
- **Global Distribution**: When you need to serve users worldwide
- **Simple Logic**: Simple operations without heavy dependencies
- **High Traffic**: When handling high request volumes
- **Low Latency**: When latency is critical
- **Stateless Operations**: Operations that don't need Node.js APIs

## 💻 Basic Example

### Basic Edge Route Handler

```typescript
// app/api/hello/route.ts
export const runtime = 'edge'

export async function GET() {
  return Response.json({ message: 'Hello from Edge!' })
}
```

### Edge Handler with Request

```typescript
// app/api/geo/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  // Access Edge-specific headers
  const country = request.headers.get('x-vercel-ip-country')
  const city = request.headers.get('x-vercel-ip-city')
  
  return Response.json({
    country,
    city,
    message: 'Running on Edge'
  })
}
```

### Edge Handler with Caching

```typescript
// app/api/cache/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  const cache = new Map()
  const url = request.url
  
  // Check cache
  if (cache.has(url)) {
    return Response.json(cache.get(url), {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    })
  }
  
  // Fetch and cache
  const data = { timestamp: Date.now() }
  cache.set(url, data)
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60',
    },
  })
}
```

## 🔧 Advanced Example

### Edge Handler with Authentication

```typescript
// app/api/protected/route.ts
export const runtime = 'edge'

async function verifyToken(token: string) {
  // Simple token verification (Edge-compatible)
  // Note: Can't use Node.js crypto in Edge
  const isValid = token === process.env.API_KEY
  
  return isValid
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const token = authHeader.replace('Bearer ', '')
  const isValid = await verifyToken(token)
  
  if (!isValid) {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
  
  return Response.json({ message: 'Protected data' })
}
```

### Edge Handler with External API

```typescript
// app/api/proxy/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  
  if (!targetUrl) {
    return Response.json(
      { error: 'URL parameter required' },
      { status: 400 }
    )
  }
  
  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Next.js Edge Runtime',
      },
    })
    
    const data = await res.json()
    
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60',
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch' },
      { status: 500 }
    )
  }
}
```

### Edge Handler with A/B Testing

```typescript
// app/api/ab-test/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  // Get user location for A/B testing
  const country = request.headers.get('x-vercel-ip-country')
  
  // Simple A/B test logic
  const variant = country === 'US' ? 'variant-a' : 'variant-b'
  
  return Response.json({
    variant,
    country,
    message: `You're seeing ${variant}`
  })
}
```

## 📋 Common Patterns

### Pattern 1: Simple Edge Handler
```typescript
export const runtime = 'edge'

export async function GET() {
  return Response.json({ data: 'from edge' })
}
```
**When to use**: Simple, fast responses

### Pattern 2: Edge with Headers
```typescript
export const runtime = 'edge'

export async function GET(request: Request) {
  const geo = request.headers.get('x-vercel-ip-country')
  return Response.json({ country: geo })
}
```
**When to use**: Geo-based logic

### Pattern 3: Edge Proxy
```typescript
export const runtime = 'edge'

export async function GET(request: Request) {
  const res = await fetch(externalUrl)
  return Response.json(await res.json())
}
```
**When to use**: Proxying external APIs

## ⚠️ Common Mistakes

### Mistake 1: Using Node.js APIs
```typescript
// ❌ Wrong: Using Node.js APIs in Edge
export const runtime = 'edge'

export async function GET() {
  const fs = require('fs') // Error: Not available in Edge
  const data = fs.readFileSync('file.txt')
  return Response.json({ data })
}
```
**Why**: Edge Runtime doesn't support Node.js APIs.

```typescript
// ✅ Correct: Use Edge-compatible APIs
export const runtime = 'edge'

export async function GET() {
  // Use fetch or other Web APIs
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return Response.json({ data })
}
```

### Mistake 2: Using Heavy Dependencies
```typescript
// ❌ Wrong: Heavy dependencies
export const runtime = 'edge'
import heavyLibrary from 'heavy-library' // Might not work

export async function GET() {
  return Response.json({ data: heavyLibrary.process() })
}
```
**Why**: Edge has bundle size limitations.

```typescript
// ✅ Correct: Keep it simple
export const runtime = 'edge'

export async function GET() {
  // Simple logic without heavy dependencies
  return Response.json({ data: 'simple' })
}
```

### Mistake 3: Not Handling Edge Limitations
```typescript
// ❌ Wrong: Assuming full Node.js support
export const runtime = 'edge'

export async function POST(request: Request) {
  const body = await request.json()
  await db.query('INSERT...') // Database might not work
}
```
**Why**: Some operations require Node.js runtime.

```typescript
// ✅ Correct: Use Node.js runtime for database
// Don't set runtime = 'edge' for database operations
export async function POST(request: Request) {
  const body = await request.json()
  await db.query('INSERT...') // Works in Node.js runtime
}
```

## ✨ Best Practices

1. **Use for simple operations**: Keep Edge handlers simple
2. **Avoid Node.js APIs**: Use Web APIs instead
3. **Minimize dependencies**: Keep bundle size small
4. **Use for fast responses**: When speed is critical
5. **Test thoroughly**: Edge has different behavior
6. **Consider limitations**: Not all features work in Edge
7. **Monitor performance**: Measure Edge vs Node.js performance

## 🔗 Related Concepts

- [Route Handlers](./route-handlers.md) - Creating handlers
- [Performance Optimization](../22-performance-optimization/README.md) - Performance
- [Middleware](../13-middleware/README.md) - Edge middleware

## 📚 Resources

### Official Documentation
- [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🧪 Practice Exercises

### Exercise 1: Basic Edge Handler
**Difficulty**: Beginner  
**Goal**: Understand Edge Runtime  
**Instructions**:
1. Create a simple Edge handler
2. Test response time
3. Compare with Node.js runtime
4. Test Edge-specific features

### Exercise 2: Edge Proxy
**Difficulty**: Intermediate  
**Goal**: Practice Edge proxying  
**Instructions**:
1. Create an Edge handler that proxies requests
2. Add caching
3. Handle errors
4. Measure performance

## 🎓 Key Takeaways

- Edge Runtime runs on Edge network
- Faster response times and lower latency
- Limited Node.js APIs available
- Use Web APIs instead of Node.js APIs
- Keep handlers simple
- Not suitable for all use cases
- Better for stateless, fast operations

## ❓ FAQ

### Q: When should I use Edge Runtime?
**A**: Use for simple, fast operations that don't need Node.js APIs. Avoid for database operations or heavy processing.

### Q: What APIs are available in Edge?
**A**: Web APIs (fetch, Request, Response, etc.) are available. Node.js APIs (fs, crypto, etc.) are not.

### Q: Can I use databases in Edge Runtime?
**A**: Some Edge-compatible databases work, but most traditional databases require Node.js runtime.

### Q: How do I know if Edge is right for my use case?
**A**: If you need fast responses, simple logic, and don't need Node.js APIs, Edge is a good choice.

### Q: Can I mix Edge and Node.js handlers?
**A**: Yes, you can have some routes on Edge and others on Node.js runtime.

---

**Next Steps**: 
- Review: [Route Handlers](./route-handlers.md) for handler basics
- Practice: Create Edge handlers
- Build: Optimize API performance with Edge Runtime

