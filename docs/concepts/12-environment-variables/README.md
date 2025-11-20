# Environment Variables

> **Category**: Intermediate | **Priority**: 🔴 High | **Difficulty**: Beginner  
> **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Status**: ⏳ Not Started

## Overview

Environment variables allow you to configure your Next.js application for different environments (development, production) without hardcoding values.

## Key Topics

- [Environment Files](./env-files.md) - `.env.local`, `.env.development`, `.env.production`
- [Server vs Client Variables](./server-client-variables.md) - Understanding variable scope
- `NEXT_PUBLIC_` Prefix - Exposing variables to the browser
- Environment Variable Validation - Validating required variables

## Quick Start

```bash
# .env.local
DATABASE_URL=postgresql://localhost:5432/mydb
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```typescript
// Server Component
const dbUrl = process.env.DATABASE_URL

// Client Component
const appUrl = process.env.NEXT_PUBLIC_APP_URL
```

## Learning Path

1. Understand [Environment Files](./env-files.md)
2. Learn [Server vs Client Variables](./server-client-variables.md)
3. Set up validation
4. Use type-safe config

## Detailed Guides

- **[Environment Files](./env-files.md)** - Setting up environment files
- **[Server vs Client Variables](./server-client-variables.md)** - Understanding variable scope

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Basic Environment Variables](./examples/01-basic-env.tsx)** - Basic usage examples

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**Previous**: [Metadata & SEO](../11-metadata-seo/README.md) | **Next**: [Middleware](../13-middleware/README.md)

