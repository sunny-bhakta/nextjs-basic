# Data Fetching

> **Category**: Core | **Priority**: 🔴 High | **Difficulty**: Intermediate  
> **Related Concepts**: [Rendering Strategies](../02-rendering/README.md), [API Routes](../06-api-routes/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js provides multiple ways to fetch data: Server Components, Server Actions, and client-side fetching. Choosing the right method depends on when and where you need the data.

## Key Topics

- [Server Component Fetching](./server-fetching.md) - Fetching in Server Components
- [Client Component Fetching](./client-fetching.md) - Fetching in Client Components
- [Server Actions](./server-actions.md) - Server-side mutations
- [Fetch API](./fetch-api.md) - Using the fetch API with caching
- [Data Fetching Patterns](./patterns.md) - Common patterns and best practices

## Quick Comparison

| Method | Where | When | Use Case |
|--------|-------|------|----------|
| Server Component | Server | Build/Request | Initial page data |
| Server Action | Server | On demand | Form submissions, mutations |
| Client Fetch | Browser | Runtime | User interactions, real-time |

## Learning Path

1. Start with [Server Component Fetching](./server-fetching.md)
2. Learn [Server Actions](./server-actions.md)
3. Understand [Client Component Fetching](./client-fetching.md)
4. Explore [Data Fetching Patterns](./patterns.md)

## Detailed Guides

- **[Server Component Fetching](./server-fetching.md)** - Fetching data in Server Components
- **[Client Component Fetching](./client-fetching.md)** - Fetching data in Client Components
- **[Server Actions](./server-actions.md)** - Server-side mutations and form handling
- **[Fetch API](./fetch-api.md)** - Using the fetch API with caching and revalidation
- **[Data Fetching Patterns](./patterns.md)** - Common patterns and best practices

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Server Fetching](./examples/01-server-fetching.tsx)** - Fetching data in Server Components
- **[Client Fetching](./examples/02-client-fetching.tsx)** - Fetching data in Client Components
- **[Server Actions](./examples/03-server-actions.tsx)** - Server-side mutations and forms
- **[Fetch API](./examples/04-fetch-api.tsx)** - Different caching strategies
- **[Patterns](./examples/05-patterns.tsx)** - Common data fetching patterns
- **[Complete Example](./examples/06-complete-example.tsx)** - Comprehensive data fetching app

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [Data Fetching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

---

**Previous**: [Pages Router](../04-pages-router/README.md) | **Next**: [API Routes](../06-api-routes/README.md)

