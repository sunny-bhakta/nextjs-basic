# Incremental Static Regeneration (ISR)

> **Category**: Core | **Related Concepts**: [SSG](./ssg.md), [SSR](./ssr.md)  
> **Last Updated**: 2024

## 📖 Overview

Incremental Static Regeneration (ISR) is a rendering strategy that allows you to update static pages after they've been built, without rebuilding the entire site. It combines the benefits of SSG (fast performance) with the ability to update content periodically.

**Key Points:**
- Pages are statically generated at build time
- Can be regenerated in the background at specified intervals
- Best of both worlds: SSG performance + fresh content
- Perfect for content that updates periodically
- Reduces build times for large sites

## 🎯 When to Use

- **Periodic Updates**: Blog posts, product catalogs, news articles
- **Large Sites**: Sites with thousands of pages that would take too long to build
- **Content Updates**: Content that changes but doesn't need to be real-time
- **Performance + Freshness**: When you need both fast performance and relatively fresh content
- **E-commerce**: Product pages that update periodically

## 💻 Basic Example

### App Router (Recommended)

```typescript
// app/blog/[slug]/page.tsx
// This page uses ISR - regenerated every 60 seconds

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Revalidate post list every hour
  }).then(res => res.json())
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><em>This page regenerates every 60 seconds</em></p>
    </article>
  )
}
```

### Pages Router (Legacy)

```typescript
// pages/blog/[slug].js
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking', // Enable ISR
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`)
  const post = await res.json()
  
  return {
    props: { post },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
```

## 🔧 Advanced Example

### On-Demand Revalidation

```typescript
// app/api/revalidate/route.ts
// Call this API to manually revalidate a page
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { path, secret } = await request.json()
  
  // Verify secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }
  
  try {
    revalidatePath(path) // Revalidate the specified path
    return Response.json({ revalidated: true, path })
  } catch (error) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 })
  }
}

// Usage: POST /api/revalidate
// Body: { "path": "/blog/my-post", "secret": "your-secret" }
```

### ISR with Tag-Based Revalidation

```typescript
// app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { 
      revalidate: 3600, // Revalidate every hour
      tags: ['products'] // Tag for on-demand revalidation
    }
  })
  
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
    </div>
  )
}

// app/api/revalidate-tag/route.ts
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag, secret } = await request.json()
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }
  
  revalidateTag(tag) // Revalidate all pages with this tag
  return Response.json({ revalidated: true, tag })
}
```

### Different Revalidation Times

```typescript
// app/products/page.tsx - Revalidate every hour
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // 1 hour
  })
  return res.json()
}

// app/blog/page.tsx - Revalidate every 5 minutes
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 300 } // 5 minutes
  })
  return res.json()
}

// app/news/page.tsx - Revalidate every minute
async function getNews() {
  const res = await fetch('https://api.example.com/news', {
    next: { revalidate: 60 } // 1 minute
  })
  return res.json()
}
```

## 📋 Common Patterns

### Pattern 1: Time-Based Revalidation
```typescript
// app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  return res.json()
}
```
**When to use**: Content that updates on a predictable schedule

### Pattern 2: On-Demand Revalidation
```typescript
// Revalidate when content is updated
// app/api/webhook/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { type, id } = await request.json()
  
  if (type === 'product') {
    revalidatePath(`/products/${id}`)
  }
  
  return Response.json({ success: true })
}
```
**When to use**: When you want to update immediately after content changes

### Pattern 3: Tag-Based Revalidation
```typescript
// app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { 
      revalidate: 3600,
      tags: ['products', `product-${id}`]
    }
  })
  return res.json()
}

// Revalidate all products or specific product
revalidateTag('products') // All products
revalidateTag(`product-123`) // Specific product
```
**When to use**: When you need to revalidate multiple related pages

## ⚠️ Common Mistakes

### Mistake 1: Too Frequent Revalidation
```typescript
// ❌ Wrong: Revalidating too often
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 1 } // Every second - defeats purpose of ISR
  })
  return res.json()
}
```
**Why**: Revalidating too frequently makes ISR behave like SSR but with caching complexity.

```typescript
// ✅ Correct: Choose appropriate revalidation time
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Every hour - reasonable
  })
  return res.json()
}
```

### Mistake 2: Not Using Fallback
```typescript
// ❌ Wrong: No fallback for new pages
export async function getStaticPaths() {
  return {
    paths: [], // Only pre-render these
    fallback: false, // 404 for new pages
  }
}
```
**Why**: New content won't be available until rebuild.

```typescript
// ✅ Correct: Use fallback for ISR
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // Generate on-demand
  }
}
```

### Mistake 3: Inconsistent Revalidation Times
```typescript
// ❌ Wrong: Different revalidation for related data
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 60 } // 1 minute
  })
  return res.json()
}

async function getProductList() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // 1 hour - inconsistent!
  })
  return res.json()
}
```
**Why**: Can cause inconsistencies where product page shows different data than list.

```typescript
// ✅ Correct: Consistent revalidation
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 } // 1 hour
  })
  return res.json()
}

async function getProductList() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // Same time
  })
  return res.json()
}
```

## ✨ Best Practices

1. **Choose appropriate revalidation time**: Balance freshness with performance
2. **Use on-demand revalidation**: For immediate updates after content changes
3. **Use tags**: For revalidating related pages together
4. **Monitor revalidation**: Track how often pages are regenerated
5. **Handle stale content**: Show when content was last updated
6. **Use fallback**: Enable fallback for new content
7. **Secure revalidation**: Protect revalidation endpoints with secrets

## 🔗 Related Concepts

- [Static Site Generation](./ssg.md) - Pre-render at build time
- [Server-Side Rendering](./ssr.md) - Render on each request
- [Data Fetching](../05-data-fetching/README.md) - How to fetch data

## 📚 Resources

### Official Documentation
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)

### Examples
- [ISR Example](./examples/03-incremental-static-regeneration.tsx)

## 🧪 Practice Exercises

### Exercise 1: Blog with ISR
**Difficulty**: Intermediate  
**Goal**: Understand ISR with time-based revalidation  
**Instructions**:
1. Create a blog with ISR
2. Set revalidation to 5 minutes
3. Add timestamp to show when page was generated
4. Test revalidation by waiting and refreshing

**Solution**: See [examples/03-incremental-static-regeneration.tsx](./examples/03-incremental-static-regeneration.tsx)

### Exercise 2: On-Demand Revalidation
**Difficulty**: Advanced  
**Goal**: Implement on-demand revalidation  
**Instructions**:
1. Create a product page with ISR
2. Create an API route for revalidation
3. Add a webhook to trigger revalidation when product updates
4. Test revalidation endpoint

## 🎓 Key Takeaways

- ISR combines SSG performance with periodic updates
- Use `next: { revalidate: 60 }` for time-based revalidation
- Use `revalidatePath()` for on-demand revalidation
- Use tags for revalidating related pages
- Choose revalidation time based on content update frequency
- Enable fallback for new content

## ❓ FAQ

### Q: What's the difference between ISR and SSG?
**A**: SSG generates pages once at build time. ISR allows pages to be regenerated periodically or on-demand after build.

### Q: How often should I revalidate?
**A**: It depends on how often your content changes. For blogs, 5-60 minutes is common. For e-commerce, hourly or on-demand works well.

### Q: Can I revalidate immediately?
**A**: Yes, use on-demand revalidation with `revalidatePath()` or `revalidateTag()`.

### Q: What happens during revalidation?
**A**: Next.js serves the cached page while regenerating in the background. Users see the cached version until regeneration completes.

### Q: Can I use ISR with dynamic routes?
**A**: Yes, use `generateStaticParams` to pre-render some paths, and use `fallback: 'blocking'` for new paths.

---

**Next Steps**: 
- Review: [Hybrid Rendering](./hybrid-rendering.md) for combining strategies
- Practice: Create a blog with ISR
- Build: An e-commerce site with on-demand revalidation

