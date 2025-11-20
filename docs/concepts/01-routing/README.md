# Pages & Routing

> **Category**: Core | **Priority**: 🔴 High | **Difficulty**: Beginner  
> **Related Concepts**: [App Router](../03-app-router/README.md), [Middleware](../13-middleware/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js uses a file-based routing system where the file structure in your `app/` or `pages/` directory automatically determines the routes of your application. This is one of the most fundamental concepts in Next.js.

## Key Topics

- [File-based Routing](./file-based-routing.md) - How Next.js creates routes from your file structure
- [Dynamic Routes](./dynamic-routes.md) - Creating routes with parameters like `[id]` and `[...slug]`
- [Route Groups](./route-groups.md) - Organizing routes without affecting the URL structure
- [Navigation](./navigation.md) - Programmatic navigation with `useRouter` and `Link`
- [Route Handlers](./route-handlers.md) - API routes in the App Router

## Quick Start

```typescript
// app/page.tsx - Creates route: /
export default function Home() {
  return <h1>Home Page</h1>
}

// app/about/page.tsx - Creates route: /about
export default function About() {
  return <h1>About Page</h1>
}
```

## Learning Path

1. Start with [File-based Routing](./file-based-routing.md)
2. Learn [Dynamic Routes](./dynamic-routes.md)
3. Understand [Navigation](./navigation.md)
4. Explore [Route Groups](./route-groups.md)
5. Practice with [examples](./examples/)

## Resources

- [Next.js Routing Docs](https://nextjs.org/docs/app/building-your-application/routing)
- [App Router Routing](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

## Examples

See the [examples](./examples/) folder for working code samples.

---

**Next Concept**: [Rendering Strategies](../02-rendering/README.md)

