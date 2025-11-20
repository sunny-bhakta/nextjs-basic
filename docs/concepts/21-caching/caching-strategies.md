# Caching Strategies

> **Category**: Intermediate | **Related Concepts**: [Rendering Strategies](../02-rendering/README.md), [Data Fetching](../05-data-fetching/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js provides multiple caching strategies to optimize performance. Understanding when and how to use each strategy is crucial for building fast applications.

**Key Points:**
- Static caching for build-time data
- ISR for periodically updated content
- Dynamic fetching for real-time data
- On-demand revalidation
- Tag-based cache invalidation

## 🎯 When to Use

- **Static Content**: Pages that don't change
- **Periodic Updates**: Content that updates on a schedule
- **Real-time Data**: Frequently changing data
- **User-specific**: Personalized content
- **Performance**: Optimize page load times

## 💻 Basic Example

### Static Caching

```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Cache at build time
  })
  
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: { id: number; name: string }) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### ISR with Time-Based Revalidation

```typescript
// app/blog/[slug]/page.tsx
async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  return res.json()
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### Dynamic Fetching

```typescript
// app/dashboard/page.tsx
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store' // Fetch fresh every time
  })
  
  return res.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
    </div>
  )
}
```

## 🔧 Advanced Example

### Tag-Based Revalidation

```typescript
// app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['products', `product-${id}`] // Tags for on-demand revalidation
    }
  })
  
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}

// app/api/revalidate/route.ts - On-demand revalidation
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  
  revalidateTag(tag) // Revalidate all pages with this tag
  
  return Response.json({ revalidated: true, tag })
}
```

### Revalidate Path

```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function updateProduct(id: string, data: any) {
  // Update product in database
  await updateProductInDb(id, data)
  
  // Revalidate the product page
  revalidatePath(`/products/${id}`)
  
  // Revalidate products listing
  revalidatePath('/products')
  
  return { success: true }
}
```

## 📋 Common Patterns

### Pattern 1: Static Caching
```typescript
const res = await fetch(url, {
  cache: 'force-cache'
})
```
**When to use**: Content that doesn't change

### Pattern 2: ISR
```typescript
const res = await fetch(url, {
  next: { revalidate: 3600 }
})
```
**When to use**: Content that updates periodically

### Pattern 3: Dynamic
```typescript
const res = await fetch(url, {
  cache: 'no-store'
})
```
**When to use**: Real-time or user-specific data

### Pattern 4: Tag-Based Revalidation
```typescript
const res = await fetch(url, {
  next: { tags: ['products'] }
})
revalidateTag('products')
```
**When to use**: Need on-demand cache invalidation

## ⚠️ Common Mistakes

### Mistake 1: Not Specifying Cache Strategy
```typescript
// ❌ Wrong: No cache strategy
const res = await fetch('https://api.example.com/data')
```

```typescript
// ✅ Correct: Specify cache strategy
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})
```
**Why**: Default behavior might not match your needs.

### Mistake 2: Caching POST Requests
```typescript
// ❌ Wrong: Caching mutations
const res = await fetch('https://api.example.com/data', {
  method: 'POST',
  cache: 'force-cache'
})
```

```typescript
// ✅ Correct: Don't cache mutations
const res = await fetch('https://api.example.com/data', {
  method: 'POST',
  cache: 'no-store'
})
```
**Why**: POST requests are mutations and shouldn't be cached.

### Mistake 3: Too Frequent Revalidation
```typescript
// ❌ Wrong: Revalidating too often
const res = await fetch(url, {
  next: { revalidate: 1 } // Every second
})
```

```typescript
// ✅ Correct: Reasonable revalidation time
const res = await fetch(url, {
  next: { revalidate: 3600 } // Every hour
})
```
**Why**: Too frequent revalidation defeats the purpose of caching.

## ✨ Best Practices

1. **Specify cache strategy**: Always specify `cache` or `next.revalidate`
2. **Use appropriate caching**: Match strategy to data type
3. **Set revalidation times**: Use reasonable intervals
4. **Use tags**: For on-demand revalidation
5. **Revalidate after mutations**: Use `revalidatePath` or `revalidateTag`
6. **Monitor cache behavior**: Test caching in development
7. **Document cache strategy**: Make it clear what's cached and when

## 🔗 Related Concepts

- [Rendering Strategies](../02-rendering/README.md) - How caching affects rendering
- [Data Fetching](../05-data-fetching/README.md) - Fetch API caching
- [Performance Optimization](../22-performance-optimization/README.md) - Performance impact

## 📚 Resources

### Official Documentation
- [Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/caching)
- [Revalidating](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)

## 🎓 Key Takeaways

- Use `force-cache` for static content
- Use `no-store` for dynamic content
- Use `revalidate` for ISR
- Use tags for on-demand revalidation
- Revalidate after mutations
- Always specify cache strategy explicitly

