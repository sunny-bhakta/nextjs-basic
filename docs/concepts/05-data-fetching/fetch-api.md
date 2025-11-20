# Fetch API

> **Category**: Core | **Related Concepts**: [Server Component Fetching](./server-fetching.md), [Rendering Strategies](../02-rendering/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js extends the native Fetch API with automatic request deduplication, caching, and revalidation. Understanding how to configure fetch options is crucial for controlling when and how data is fetched, cached, and revalidated.

**Key Points:**
- Extended Fetch API with caching
- Automatic request deduplication
- Configurable caching strategies
- Time-based and on-demand revalidation
- Works in Server Components
- Supports all fetch options

## 🎯 When to Use

- **Data Fetching**: Fetch data from APIs
- **Caching Control**: Control when data is cached
- **Revalidation**: Update cached data
- **Performance**: Optimize data fetching
- **All Fetching**: Primary way to fetch data in Server Components

## 💻 Basic Example

### Basic Fetch

```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Fetch with Caching

```typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Cache the response
  })
  
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Fetch with No Cache

```typescript
// app/dashboard/page.tsx
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store' // Don't cache, fetch fresh every time
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

### Fetch with Revalidation

```typescript
// app/blog/[slug]/page.tsx
async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
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

### Fetch with Tags

```typescript
// app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['products', `product-${id}`] // Tag for on-demand revalidation
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

// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  
  revalidateTag(tag) // Revalidate all requests with this tag
  
  return Response.json({ revalidated: true })
}
```

### Fetch with Headers

```typescript
// app/admin/page.tsx
async function getAdminData() {
  const res = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function AdminPage() {
  const data = await getAdminData()
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
```

### Fetch with POST Request

```typescript
// app/actions.ts
'use server'

export async function createPost(data: { title: string, content: string }) {
  const res = await fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(data),
    cache: 'no-store' // Don't cache POST requests
  })
  
  if (!res.ok) {
    throw new Error('Failed to create post')
  }
  
  return res.json()
}
```

### Fetch with Timeout

```typescript
// app/lib/fetch-with-timeout.ts
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return res
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

// Usage
async function getData() {
  const res = await fetchWithTimeout('https://api.example.com/data', {}, 5000)
  return res.json()
}
```

## 📋 Common Patterns

### Pattern 1: Static Caching
```typescript
const res = await fetch(url, {
  cache: 'force-cache' // Cache at build time
})
```
**When to use**: Static content that doesn't change

### Pattern 2: Dynamic Fetching
```typescript
const res = await fetch(url, {
  cache: 'no-store' // Fetch fresh every time
})
```
**When to use**: Frequently changing or user-specific data

### Pattern 3: Time-Based Revalidation
```typescript
const res = await fetch(url, {
  next: { revalidate: 60 } // Revalidate every 60 seconds
})
```
**When to use**: Content that updates periodically

## ⚠️ Common Mistakes

### Mistake 1: Not Specifying Cache Strategy
```typescript
// ❌ Wrong: No cache strategy specified
const res = await fetch('https://api.example.com/data')
// Default behavior might not be what you want
```
**Why**: Default caching might not match your needs.

```typescript
// ✅ Correct: Specify cache strategy
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache' // Explicit caching
})
```

### Mistake 2: Caching POST Requests
```typescript
// ❌ Wrong: Caching POST requests
const res = await fetch('https://api.example.com/data', {
  method: 'POST',
  cache: 'force-cache' // POST requests shouldn't be cached
})
```
**Why**: POST requests are mutations and shouldn't be cached.

```typescript
// ✅ Correct: Don't cache POST requests
const res = await fetch('https://api.example.com/data', {
  method: 'POST',
  cache: 'no-store' // Don't cache mutations
})
```

### Mistake 3: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
const data = await fetch(url).then(res => res.json())
return data // Might fail
```
**Why**: Network requests can fail.

```typescript
// ✅ Correct: Handle errors
try {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  const data = await res.json()
  return data
} catch (error) {
  console.error('Fetch error:', error)
  throw error
}
```

## ✨ Best Practices

1. **Specify cache strategy**: Always specify `cache` or `next.revalidate`
2. **Use appropriate caching**: `force-cache` for static, `no-store` for dynamic
3. **Set revalidation**: Use `revalidate` for ISR
4. **Use tags**: For on-demand revalidation
5. **Handle errors**: Always check `res.ok` and handle errors
6. **Set timeouts**: For long-running requests
7. **Use headers**: For authentication and content type

## 🔗 Related Concepts

- [Server Component Fetching](./server-fetching.md) - Using fetch in Server Components
- [Rendering Strategies](../02-rendering/README.md) - How caching affects rendering
- [Caching](../21-caching/README.md) - Caching strategies

## 📚 Resources

### Official Documentation
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/caching)

## 🧪 Practice Exercises

### Exercise 1: Caching Strategies
**Difficulty**: Beginner  
**Goal**: Understand different cache options  
**Instructions**:
1. Create pages with different cache strategies
2. Test static caching
3. Test dynamic fetching
4. Test revalidation

### Exercise 2: On-Demand Revalidation
**Difficulty**: Intermediate  
**Goal**: Practice tag-based revalidation  
**Instructions**:
1. Create pages with fetch tags
2. Create revalidation API route
3. Test on-demand revalidation
4. Monitor cache behavior

## 🎓 Key Takeaways

- Next.js extends Fetch API with caching
- Use `cache: 'force-cache'` for static content
- Use `cache: 'no-store'` for dynamic content
- Use `next: { revalidate: 60 }` for ISR
- Use tags for on-demand revalidation
- Always handle errors
- Specify cache strategy explicitly

## ❓ FAQ

### Q: What's the default cache behavior?
**A**: Default is to cache requests, but it's better to be explicit with `cache` or `next.revalidate`.

### Q: Can I use fetch in Client Components?
**A**: Yes, but it won't have Next.js caching extensions. Use Server Components when possible.

### Q: How do I revalidate cached data?
**A**: Use `revalidatePath`, `revalidateTag`, or time-based revalidation with `next.revalidate`.

### Q: Can I cache POST requests?
**A**: No, POST requests are mutations and shouldn't be cached. Use `cache: 'no-store'`.

### Q: How does request deduplication work?
**A**: Next.js automatically deduplicates identical fetch requests in the same render.

---

**Next Steps**: 
- Review: [Data Fetching Patterns](./patterns.md) for best practices
- Practice: Implement different caching strategies
- Build: Optimize data fetching with proper caching

