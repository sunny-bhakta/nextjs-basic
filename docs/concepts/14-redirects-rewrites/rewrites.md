# Rewrites

> **Category**: Intermediate | **Related Concepts**: [Redirects](./redirects.md), [Middleware](../13-middleware/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Rewrites in Next.js allow you to rewrite URLs internally without changing the browser URL. This is useful for proxying, API routes, and internal routing.

**Key Points:**
- URL rewriting without redirect
- Browser URL stays the same
- Internal routing
- API proxying
- Pattern matching
- Query parameter handling

## 🎯 When to Use

- **API Proxying**: Proxying external APIs
- **Internal Routing**: Internal URL mapping
- **Path Aliases**: Creating path aliases
- **Backend Integration**: Integrating with backend
- **Microservices**: Routing to microservices

## 💻 Basic Example

### Simple Rewrite

```typescript
// next.config.js
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
```

### Pattern Rewrite

```typescript
// next.config.js
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
```

### Internal Rewrite

```typescript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/app/dashboard',
      },
    ]
  },
}
```

## 🔧 Advanced Example

### Multiple Rewrites

```typescript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/admin/:path*',
        destination: '/app/admin/:path*',
      },
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
      },
    ]
  },
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
    return NextResponse.rewrite(new URL('/us-version', request.url))
  }
  
  return NextResponse.next()
}
```

## 📋 Common Patterns

### Pattern 1: API Proxy
```typescript
{ source: '/api/:path*', destination: 'https://api.example.com/:path*' }
```
**When to use**: Proxying external APIs

### Pattern 2: Internal Routing
```typescript
{ source: '/dashboard', destination: '/app/dashboard' }
```
**When to use**: Internal URL mapping

### Pattern 3: Path Alias
```typescript
{ source: '/old/:slug', destination: '/new/:slug' }
```
**When to use**: Creating path aliases

## ⚠️ Common Mistakes

### Mistake 1: Confusing with Redirects
```typescript
// ❌ Wrong: Using rewrite when redirect needed
{ source: '/old', destination: '/new' }
// URL stays /old, user expects /new
```
**Why**: Rewrite keeps URL, redirect changes it.

```typescript
// ✅ Correct: Use redirect for URL change
{ source: '/old', destination: '/new', permanent: true }
```

### Mistake 2: Wrong Pattern
```typescript
// ❌ Wrong: Incorrect pattern
{ source: '/api/*', destination: '/backend/*' }
```
**Why**: Use :path* for catch-all.

```typescript
// ✅ Correct: Use :path*
{ source: '/api/:path*', destination: '/backend/:path*' }
```

### Mistake 3: Not Testing
```typescript
// ❌ Wrong: Not testing rewrites
// Rewrites might not work as expected
```
**Why**: Always test rewrites.

```typescript
// ✅ Correct: Test all rewrites
// Verify rewrites work correctly
```

## ✨ Best Practices

1. **Use for proxying**: Great for API proxying
2. **Keep URL same**: Use when URL should stay same
3. **Test thoroughly**: Test all rewrite paths
4. **Document rewrites**: Document why rewrites exist
5. **Use middleware for dynamic**: Dynamic rewrites in middleware
6. **Monitor performance**: Check rewrite performance

## 🔗 Related Concepts

- [Redirects](./redirects.md) - URL redirects
- [Middleware](../13-middleware/README.md) - Dynamic rewrites

## 📚 Resources

### Official Documentation
- [Rewrites](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites)

## 🧪 Practice Exercises

### Exercise 1: Basic Rewrite
**Difficulty**: Beginner  
**Goal**: Understand rewrites  
**Instructions**:
1. Create rewrite in next.config.js
2. Test rewrite
3. Verify URL stays same
4. Check content loads

### Exercise 2: API Proxy
**Difficulty**: Intermediate  
**Goal**: Practice API proxying  
**Instructions**:
1. Create API proxy rewrite
2. Test API calls
3. Verify proxying works
4. Handle errors

## 🎓 Key Takeaways

- Rewrites keep browser URL same
- Use for API proxying
- Pattern matching with :path*
- Test all rewrites
- Use middleware for dynamic rewrites
- Document rewrite reasons

## ❓ FAQ

### Q: What's the difference between rewrite and redirect?
**A**: Rewrite keeps URL same, redirect changes URL.

### Q: Can I rewrite to external URLs?
**A**: Yes, use full URL in destination.

### Q: Do rewrites work with query parameters?
**A**: Yes, query parameters are preserved.

### Q: Can I use rewrites in middleware?
**A**: Yes, middleware is better for dynamic rewrites.

### Q: How do I test rewrites?
**A**: Visit source URL and verify content loads from destination.

---

**Next Steps**: 
- Review: [Redirects](./redirects.md) for URL redirects
- Practice: Create rewrites for your app
- Build: Proxy APIs with rewrites

