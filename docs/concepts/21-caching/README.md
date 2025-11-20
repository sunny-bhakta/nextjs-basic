# Caching

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Intermediate-Advanced  
> **Related Concepts**: [Rendering Strategies](../02-rendering/README.md), [Performance Optimization](../22-performance-optimization/README.md)  
> **Status**: ✅ In Progress

## Overview

Understanding and configuring caching strategies in Next.js for optimal performance.

## Key Topics

- [Caching Strategies](./caching-strategies.md) - Static, ISR, and dynamic caching
- Static Page Caching - Caching static pages
- ISR Caching - Incremental Static Regeneration
- Fetch Caching - Caching fetch requests
- Cache Revalidation - On-demand and time-based
- Cache Tags - Tag-based cache invalidation

## Documentation

### Detailed Guides

1. **[Caching Strategies](./caching-strategies.md)**
   - Static page caching
   - ISR caching
   - Fetch caching
   - Cache revalidation
   - Cache tags

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-static-caching.tsx` - Static caching patterns
- `02-isr-caching.tsx` - ISR with revalidation
- `03-cache-revalidation.tsx` - On-demand revalidation

## Quick Start

### Static Caching

```typescript
// Cache at build time
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})
```

### ISR with Revalidation

```typescript
// Revalidate every 60 seconds
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})
```

## Resources

- [Caching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/caching)

---

**Previous**: [Database Integration](../20-database-integration/README.md) | **Next**: [Performance Optimization](../22-performance-optimization/README.md)

