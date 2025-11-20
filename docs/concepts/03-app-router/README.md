# App Router (Next.js 13+)

> **Category**: Core | **Priority**: 🔴 High | **Difficulty**: Beginner  
> **Related Concepts**: [Pages & Routing](../01-routing/README.md), [Rendering Strategies](../02-rendering/README.md)  
> **Status**: ⏳ Not Started

## Overview

The App Router is the modern routing system in Next.js 13+ that uses the `app/` directory. It introduces Server Components, improved layouts, loading states, and better data fetching patterns.

## Key Topics

- [Directory Structure](./directory-structure.md) - Understanding the `app/` folder
- [Layouts](./layouts.md) - Shared UI with layouts
- [Pages](./pages.md) - Creating pages with `page.tsx`
- [Loading States](./loading-states.md) - Showing loading UI
- [Error Boundaries](./error-boundaries.md) - Handling errors
- [Server Components](./server-components.md) - Server-side React components
- [Client Components](./client-components.md) - Client-side React components
- [Streaming](./streaming.md) - Progressive rendering with Suspense

## Quick Start

```typescript
// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx - Home page
export default function Home() {
  return <h1>Home</h1>
}
```

## Learning Path

1. Understand [Directory Structure](./directory-structure.md)
2. Learn [Layouts](./layouts.md)
3. Create [Pages](./pages.md)
4. Handle [Loading States](./loading-states.md)
5. Understand [Server vs Client Components](./server-components.md)

## Resources

- [App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**Previous**: [Rendering Strategies](../02-rendering/README.md) | **Next**: [Pages Router](../04-pages-router/README.md)

