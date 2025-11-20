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

## Detailed Guides

- **[Directory Structure](./directory-structure.md)** - Understanding the `app/` folder structure
- **[Layouts](./layouts.md)** - Creating shared UI with layouts
- **[Pages](./pages.md)** - Creating pages with `page.tsx`
- **[Loading States](./loading-states.md)** - Showing loading UI during data fetching
- **[Error Boundaries](./error-boundaries.md)** - Handling errors gracefully
- **[Server Components](./server-components.md)** - Server-side React components
- **[Client Components](./client-components.md)** - Client-side React components
- **[Streaming](./streaming.md)** - Progressive rendering with Suspense

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Basic Structure](./examples/01-basic-structure.tsx)** - Fundamental App Router structure
- **[Layouts](./examples/02-layouts.tsx)** - Nested layouts and route groups
- **[Pages](./examples/03-pages.tsx)** - Pages with data fetching and metadata
- **[Loading States](./examples/04-loading-states.tsx)** - Loading UI and Suspense
- **[Error Boundaries](./examples/05-error-boundaries.tsx)** - Error handling
- **[Server Components](./examples/06-server-components.tsx)** - Server-side components
- **[Client Components](./examples/07-client-components.tsx)** - Client-side interactivity
- **[Streaming](./examples/08-streaming.tsx)** - Progressive rendering
- **[Hybrid Components](./examples/09-hybrid-components.tsx)** - Combining Server and Client
- **[Complete Example](./examples/10-complete-example.tsx)** - Comprehensive App Router app

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**Previous**: [Rendering Strategies](../02-rendering/README.md) | **Next**: [Pages Router](../04-pages-router/README.md)

