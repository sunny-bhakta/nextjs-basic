# Dynamic Routes

## Overview

Dynamic routes allow you to create pages with dynamic segments that can match different values. This is essential for creating pages like user profiles, blog posts, or product pages.

## Syntax

### App Router

Use square brackets `[]` to create dynamic segments:

```
app/
├── blog/
│   └── [slug]/
│       └── page.tsx        → /blog/[slug]
└── users/
    └── [id]/
        └── page.tsx         → /users/[id]
```

### Pages Router

```
pages/
├── blog/
│   └── [slug].js           → /blog/[slug]
└── users/
    └── [id].js             → /users/[id]
```

## Basic Example

### App Router

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: PageProps) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  )
}
```

Accessible at:
- `/blog/my-first-post` → `params.slug = "my-first-post"`
- `/blog/hello-world` → `params.slug = "hello-world"`

### Pages Router

```typescript
// pages/blog/[slug].js
export default function BlogPost({ router }) {
  return (
    <div>
      <h1>Blog Post: {router.query.slug}</h1>
    </div>
  )
}
```

## Multiple Dynamic Segments

```typescript
// app/shop/[category]/[product]/page.tsx
interface PageProps {
  params: {
    category: string
    product: string
  }
}

export default function Product({ params }: PageProps) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Product: {params.product}</h2>
    </div>
  )
}
```

Routes:
- `/shop/electronics/laptop` → category: "electronics", product: "laptop"
- `/shop/clothing/shirt` → category: "clothing", product: "shirt"

## Catch-All Routes

Match multiple segments using `[...slug]`:

```typescript
// app/docs/[...slug]/page.tsx
interface PageProps {
  params: {
    slug: string[]
  }
}

export default function Docs({ params }: PageProps) {
  return (
    <div>
      <h1>Docs: {params.slug.join('/')}</h1>
    </div>
  )
}
```

Routes:
- `/docs/getting-started` → slug: ["getting-started"]
- `/docs/guides/installation` → slug: ["guides", "installation"]

## Optional Catch-All Routes

Use `[[...slug]]` for optional catch-all:

```typescript
// app/shop/[[...slug]]/page.tsx
interface PageProps {
  params: {
    slug?: string[]
  }
}

export default function Shop({ params }: PageProps) {
  if (!params.slug) {
    return <h1>Shop Home</h1>
  }
  return <h1>Shop: {params.slug.join('/')}</h1>
}
```

Routes:
- `/shop` → Shows "Shop Home"
- `/shop/electronics` → slug: ["electronics"]
- `/shop/electronics/laptops` → slug: ["electronics", "laptops"]

## Fetching Data with Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`)
  return res.json()
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

## Generating Static Paths (SSG)

For static generation, generate all possible paths:

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}
```

## Best Practices

1. **Validate parameters**: Always validate dynamic route parameters
2. **Handle missing data**: Show 404 for invalid routes
3. **Use TypeScript**: Type your params for type safety
4. **Generate static paths**: Use `generateStaticParams` for SSG

## Common Mistakes

### ❌ Wrong: Not handling undefined

```typescript
export default function Page({ params }: PageProps) {
  return <h1>{params.slug.toUpperCase()}</h1> // Error if slug is undefined
}
```

### ✅ Correct: Handle edge cases

```typescript
export default function Page({ params }: PageProps) {
  if (!params.slug) {
    return <h1>Not Found</h1>
  }
  return <h1>{params.slug.toUpperCase()}</h1>
}
```

## Related Topics

- [File-based Routing](./file-based-routing.md)
- [Data Fetching](../05-data-fetching/README.md)
- [Route Groups](./route-groups.md)

