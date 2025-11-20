# Redirects

> **Category**: Intermediate | **Related Concepts**: [Rewrites](./rewrites.md), [Middleware](../13-middleware/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Redirects in Next.js allow you to redirect users from one URL to another. You can configure redirects in `next.config.js` or use middleware for dynamic redirects.

**Key Points:**
- Permanent (301) and temporary (302) redirects
- Pattern matching
- Query parameter preservation
- Dynamic redirects in middleware
- SEO considerations
- Performance impact

## 🎯 When to Use

- **URL Changes**: When URLs have changed
- **SEO**: Preserving SEO value
- **Route Migration**: Moving to new routes
- **Conditional Redirects**: Based on conditions
- **A/B Testing**: Redirecting based on tests

## 💻 Basic Example

### Simple Redirect

```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ]
  },
}
```

### Pattern Redirect

```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}
```

### Query Parameter Redirect

```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/search-results',
        permanent: false, // 302 redirect
      },
    ]
  },
}
```

## 🔧 Advanced Example

### Multiple Redirects

```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/products/:id',
        destination: '/items/:id',
        permanent: false,
      },
    ]
  },
}
```

### Conditional Redirect

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country
  
  if (country === 'US' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/us', request.url))
  }
  
  return NextResponse.next()
}
```

## 📋 Common Patterns

### Pattern 1: Simple Redirect
```typescript
{ source: '/old', destination: '/new', permanent: true }
```
**When to use**: Simple URL changes

### Pattern 2: Pattern Matching
```typescript
{ source: '/old/:slug', destination: '/new/:slug', permanent: true }
```
**When to use**: Bulk redirects with patterns

### Pattern 3: Conditional
```typescript
// In middleware
if (condition) {
  return NextResponse.redirect(new URL('/new', request.url))
}
```
**When to use**: Dynamic redirects

## ⚠️ Common Mistakes

### Mistake 1: Wrong Permanent Value
```typescript
// ❌ Wrong: Using string
{ source: '/old', destination: '/new', permanent: 'true' }
```
**Why**: permanent must be boolean.

```typescript
// ✅ Correct: Use boolean
{ source: '/old', destination: '/new', permanent: true }
```

### Mistake 2: Infinite Redirects
```typescript
// ❌ Wrong: Redirecting to same path
{ source: '/page', destination: '/page', permanent: true }
```
**Why**: Creates infinite redirect loop.

```typescript
// ✅ Correct: Different destination
{ source: '/old-page', destination: '/new-page', permanent: true }
```

### Mistake 3: Not Testing
```typescript
// ❌ Wrong: Not testing redirects
// Redirects might not work as expected
```
**Why**: Always test redirects.

```typescript
// ✅ Correct: Test all redirects
// Verify redirects work correctly
```

## ✨ Best Practices

1. **Use permanent for SEO**: Use 301 for permanent moves
2. **Test redirects**: Always test redirect behavior
3. **Preserve query params**: Use has: false if needed
4. **Use middleware for dynamic**: Dynamic redirects in middleware
5. **Document redirects**: Document why redirects exist
6. **Monitor redirects**: Check redirect performance

## 🔗 Related Concepts

- [Rewrites](./rewrites.md) - URL rewriting
- [Middleware](../13-middleware/README.md) - Dynamic redirects

## 📚 Resources

### Official Documentation
- [Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

## 🧪 Practice Exercises

### Exercise 1: Basic Redirect
**Difficulty**: Beginner  
**Goal**: Understand redirects  
**Instructions**:
1. Create redirect in next.config.js
2. Test redirect
3. Verify status code
4. Check browser behavior

### Exercise 2: Pattern Redirects
**Difficulty**: Intermediate  
**Goal**: Practice pattern matching  
**Instructions**:
1. Create pattern redirects
2. Test with different paths
3. Verify parameter passing
4. Test edge cases

## 🎓 Key Takeaways

- Use permanent: true for 301 redirects
- Use permanent: false for 302 redirects
- Pattern matching with :param
- Test all redirects
- Use middleware for dynamic redirects
- Document redirect reasons

## ❓ FAQ

### Q: What's the difference between permanent true and false?
**A**: true = 301 (permanent), false = 302 (temporary).

### Q: Can I use redirects in middleware?
**A**: Yes, middleware is better for dynamic/conditional redirects.

### Q: Do redirects preserve query parameters?
**A**: Yes, by default. Use has: false to prevent.

### Q: How do I test redirects?
**A**: Visit the source URL and verify it redirects to destination.

### Q: Can I redirect to external URLs?
**A**: Yes, use full URL in destination.

---

**Next Steps**: 
- Review: [Rewrites](./rewrites.md) for URL rewriting
- Practice: Create redirects for your app
- Build: Migrate routes with redirects

