# Advanced Features

> **Category**: Advanced | **Priority**: 🟡 Medium | **Difficulty**: Advanced  
> **Related Concepts**: [App Router](../03-app-router/README.md), [Rendering Strategies](../02-rendering/README.md)  
> **Status**: ✅ In Progress

## Overview

Advanced Next.js features including Edge Functions, Streaming, React Server Components, and Turbopack.

## Key Topics

- [Advanced Features Guide](./advanced-features.md) - Comprehensive advanced features guide
- Edge Functions - Running on the Edge network
- Streaming - Streaming SSR with Suspense
- React Server Components - Server Components deep dive
- Turbopack - Next-generation bundler
- Partial Prerendering - Hybrid rendering approach

## Documentation

### Detailed Guides

1. **[Advanced Features Guide](./advanced-features.md)**
   - Edge Functions
   - Streaming
   - Server Components
   - Turbopack

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-edge-functions.ts` - Edge runtime examples
- `02-streaming.tsx` - Streaming with Suspense
- `03-server-components.tsx` - Advanced Server Components

## Quick Start

### Edge Runtime

```typescript
// app/api/edge/route.ts
export const runtime = 'edge'

export async function GET() {
  return Response.json({ message: 'Running on Edge' })
}
```

## Resources

- [Advanced Features](https://nextjs.org/docs/app/building-your-application/routing)

---

**Previous**: [Security](../29-security/README.md) | **Next**: [Configuration](../31-configuration/README.md)

