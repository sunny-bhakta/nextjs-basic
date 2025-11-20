# Rendering Strategies

> **Category**: Core | **Priority**: 🔴 High | **Difficulty**: Beginner-Intermediate  
> **Related Concepts**: [App Router](../03-app-router/README.md), [Data Fetching](../05-data-fetching/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js supports multiple rendering strategies: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR). Understanding when to use each is crucial for building performant applications.

## Key Topics

- [Server-Side Rendering (SSR)](./ssr.md) - Render pages on each request
- [Static Site Generation (SSG)](./ssg.md) - Pre-render pages at build time
- [Incremental Static Regeneration (ISR)](./isr.md) - Update static pages after build
- [Client-Side Rendering (CSR)](./csr.md) - Render in the browser
- [Hybrid Rendering](./hybrid-rendering.md) - Mixing different strategies

## Quick Comparison

| Strategy | When to Use | Performance | SEO |
|----------|-------------|-------------|-----|
| SSG | Content doesn't change often | ⚡⚡⚡ Fastest | ✅ Best |
| ISR | Content updates periodically | ⚡⚡ Fast | ✅ Good |
| SSR | Content changes frequently | ⚡ Medium | ✅ Good |
| CSR | User-specific, interactive | ⚡⚡ Fast | ❌ Poor |

## Learning Path

1. Start with [Static Site Generation](./ssg.md)
2. Learn [Server-Side Rendering](./ssr.md)
3. Understand [Incremental Static Regeneration](./isr.md)
4. Explore [Client-Side Rendering](./csr.md)
5. Practice with [examples](./examples/)

## Resources

- [Next.js Rendering Docs](https://nextjs.org/docs/app/building-your-application/rendering)
- [Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**Previous**: [Pages & Routing](../01-routing/README.md) | **Next**: [App Router](../03-app-router/README.md)

