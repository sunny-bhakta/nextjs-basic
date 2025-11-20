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

## Resources

- [Data Fetching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

---

**Previous**: [Pages Router](../04-pages-router/README.md) | **Next**: [API Routes](../06-api-routes/README.md)

