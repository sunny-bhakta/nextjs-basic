# Redirects & Rewrites

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Beginner  
> **Related Concepts**: [Middleware](../13-middleware/README.md), [Configuration](../31-configuration/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js allows you to redirect and rewrite URLs at the configuration level or in middleware.

## Key Topics

- [Redirects](./redirects.md) - Configuring redirects
- [Rewrites](./rewrites.md) - Configuring rewrites
- Dynamic Redirects - Redirecting based on conditions
- Permanent vs Temporary - 301 vs 302 redirects

## Quick Start

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
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}
```

## Learning Path

1. Understand [Redirects](./redirects.md)
2. Learn [Rewrites](./rewrites.md)
3. Practice dynamic redirects
4. Implement API proxying

## Detailed Guides

- **[Redirects](./redirects.md)** - URL redirects
- **[Rewrites](./rewrites.md)** - URL rewriting

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Redirects](./examples/01-redirects.ts)** - Redirect examples
- **[Rewrites](./examples/02-rewrites.ts)** - Rewrite examples

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Redirects & Rewrites Docs](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

---

**Previous**: [Middleware](../13-middleware/README.md) | **Next**: [Internationalization](../15-internationalization/README.md)

