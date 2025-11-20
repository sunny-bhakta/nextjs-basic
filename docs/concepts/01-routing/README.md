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

See the [examples](./examples/) folder for working code samples:

- **[Basic Routing](./examples/01-basic-routing.tsx)** - File-based routing examples
- **[Dynamic Routes](./examples/02-dynamic-routes.tsx)** - Dynamic route parameters
- **[Catch-All Routes](./examples/03-catch-all-routes.tsx)** - Catch-all and optional catch-all
- **[Navigation with Link](./examples/04-navigation-link.tsx)** - Using the Link component
- **[Programmatic Navigation](./examples/05-navigation-userouter.tsx)** - Using useRouter hook
- **[Route Groups](./examples/06-route-groups.tsx)** - Organizing routes with groups
- **[Route Handlers](./examples/07-route-handlers.tsx)** - API route handlers
- **[Complete Example](./examples/08-complete-example.tsx)** - Comprehensive routing example

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

---

**Next Concept**: [Rendering Strategies](../02-rendering/README.md)

