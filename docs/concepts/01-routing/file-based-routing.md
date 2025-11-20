# File-based Routing

## Overview

Next.js automatically creates routes based on the file structure in your `app/` directory (App Router) or `pages/` directory (Pages Router). This eliminates the need for manual route configuration.

## How It Works

### App Router (Next.js 13+)

The `app/` directory uses a special file convention:

```
app/
├── page.tsx          → Route: /
├── about/
│   └── page.tsx      → Route: /about
├── blog/
│   ├── page.tsx      → Route: /blog
│   └── [slug]/
│       └── page.tsx   → Route: /blog/[slug]
└── layout.tsx        → Shared layout
```

### Pages Router (Legacy)

The `pages/` directory uses a simpler convention:

```
pages/
├── index.js          → Route: /
├── about.js          → Route: /about
└── blog/
    └── [slug].js     → Route: /blog/[slug]
```

## Basic Example

### App Router

```typescript
// app/page.tsx
export default function Home() {
  return <h1>Home Page</h1>
}

// app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>
}

// app/contact/page.tsx
export default function Contact() {
  return <h1>Contact Page</h1>
}
```

This creates three routes:
- `/` → Home Page
- `/about` → About Page
- `/contact` → Contact Page

## Nested Routes

Create nested routes by creating nested folders:

```typescript
// app/products/page.tsx
export default function Products() {
  return <h1>Products List</h1>
}

// app/products/featured/page.tsx
export default function FeaturedProducts() {
  return <h1>Featured Products</h1>
}
```

Routes created:
- `/products` → Products List
- `/products/featured` → Featured Products

## Special Files

### App Router

- `page.tsx` - The page component (required for a route)
- `layout.tsx` - Shared layout for a segment
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 page
- `route.ts` - API route handler

### Pages Router

- `index.js` - Home page (`/`)
- `_app.js` - Custom App component
- `_document.js` - Custom Document
- `404.js` - Custom 404 page

## Best Practices

1. **Use descriptive folder names**: `user-profile` instead of `up`
2. **Keep routes shallow**: Avoid deep nesting when possible
3. **Use route groups**: Organize without affecting URLs
4. **Follow naming conventions**: Use `page.tsx` for pages, `layout.tsx` for layouts

## Common Mistakes

### ❌ Wrong: Missing page.tsx

```
app/
└── about/
    └── component.tsx  // This won't create a route!
```

### ✅ Correct: Include page.tsx

```
app/
└── about/
    └── page.tsx  // This creates /about route
```

## Related Topics

- [Dynamic Routes](./dynamic-routes.md)
- [Route Groups](./route-groups.md)
- [App Router](../03-app-router/README.md)

