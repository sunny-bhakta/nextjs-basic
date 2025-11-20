# Server Component Fetching

> **Category**: Core | **Related Concepts**: [Client Component Fetching](./client-fetching.md), [Fetch API](./fetch-api.md)  
> **Last Updated**: 2024

## 📖 Overview

Server Component Fetching is the primary way to fetch data in Next.js App Router. Server Components can directly use async/await to fetch data from APIs, databases, or other data sources. This data is fetched on the server, reducing client-side JavaScript and improving performance.

**Key Points:**
- Fetch data directly in Server Components using async/await
- Runs on the server (build time or request time)
- No client-side JavaScript needed
- Better performance and SEO
- Can access databases, file system, and internal APIs
- Supports caching strategies

## 🎯 When to Use

- **Initial Page Data**: Data needed when page loads
- **SEO Critical**: Content that needs to be indexed
- **Server Resources**: Access to databases, file system, internal APIs
- **Performance**: Reduce client-side JavaScript
- **Default Choice**: Use for most data fetching needs

## 💻 Basic Example

### Simple Data Fetching

```typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Static generation
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
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

### Data Fetching with Error Handling

```typescript
// app/products/page.tsx
async function getProducts() {
  try {
    const res = await fetch('https://api.example.com/products', {
      cache: 'force-cache'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return [] // Return empty array on error
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}
```

### Dynamic Route Data Fetching

```typescript
// app/blog/[slug]/page.tsx
interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

## 🔧 Advanced Example

### Parallel Data Fetching

```typescript
// app/dashboard/page.tsx
async function getUserData() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store' // Fresh data on each request
  })
  return res.json()
}

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 } // Revalidate every minute
  })
  return res.json()
}

async function getRecentActivity() {
  const res = await fetch('https://api.example.com/activity', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [user, stats, activity] = await Promise.all([
    getUserData(),
    getStats(),
    getRecentActivity()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <div>
        <h2>Stats</h2>
        <p>Total: {stats.total}</p>
      </div>
      <div>
        <h2>Recent Activity</h2>
        <ul>
          {activity.map(item => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

### Database Access

```typescript
// app/products/page.tsx
import { db } from '@/lib/db'

export default async function ProductsPage() {
  // Direct database access in Server Component
  const products = await db.product.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  })
  
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

### File System Access

```typescript
// app/docs/page.tsx
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

async function getDocs() {
  const docsDir = join(process.cwd(), 'content', 'docs')
  const files = await readdir(docsDir)
  
  const docs = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(join(docsDir, file), 'utf-8')
      return {
        name: file.replace('.md', ''),
        content
      }
    })
  )
  
  return docs
}

export default async function DocsPage() {
  const docs = await getDocs()
  
  return (
    <div>
      <h1>Documentation</h1>
      {docs.map(doc => (
        <div key={doc.name}>
          <h2>{doc.name}</h2>
          <pre>{doc.content}</pre>
        </div>
      ))}
    </div>
  )
}
```

### Environment Variables

```typescript
// app/admin/page.tsx
async function getAdminData() {
  // Access server-side environment variables
  const apiKey = process.env.ADMIN_API_KEY
  
  const res = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
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

## 📋 Common Patterns

### Pattern 1: Simple Fetch
```typescript
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```
**When to use**: Simple data fetching

### Pattern 2: Parallel Fetching
```typescript
export default async function Page() {
  const [data1, data2] = await Promise.all([
    fetch('/api/data1').then(res => res.json()),
    fetch('/api/data2').then(res => res.json())
  ])
  return <div>{/* Use both */}</div>
}
```
**When to use**: Multiple independent data sources

### Pattern 3: Conditional Fetching
```typescript
export default async function Page({ searchParams }) {
  const query = searchParams.q
  
  const data = query 
    ? await fetch(`/api/search?q=${query}`).then(res => res.json())
    : await fetch('/api/data').then(res => res.json())
  
  return <div>{data.content}</div>
}
```
**When to use**: Data depends on request parameters

## ⚠️ Common Mistakes

### Mistake 1: Not Using Async
```typescript
// ❌ Wrong: Not awaiting fetch
export default function Page() {
  const data = fetch('/api/data').then(res => res.json()) // Returns Promise
  return <div>{data.content}</div> // Error: data is a Promise
}
```
**Why**: Need to await async operations.

```typescript
// ✅ Correct: Use async/await
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div> // Might fail
}
```
**Why**: API calls can fail.

```typescript
// ✅ Correct: Handle errors
export default async function Page() {
  try {
    const data = await fetch('/api/data').then(res => res.json())
    return <div>{data.content}</div>
  } catch (error) {
    return <div>Error loading data</div>
  }
}
```

### Mistake 3: Sequential Fetching
```typescript
// ❌ Wrong: Sequential fetching
export default async function Page() {
  const data1 = await fetch('/api/data1').then(res => res.json())
  const data2 = await fetch('/api/data2').then(res => res.json())
  // Slower - waits for data1 before fetching data2
}
```
**Why**: Slower when data sources are independent.

```typescript
// ✅ Correct: Parallel fetching
export default async function Page() {
  const [data1, data2] = await Promise.all([
    fetch('/api/data1').then(res => res.json()),
    fetch('/api/data2').then(res => res.json())
  ])
  // Faster - fetches both simultaneously
}
```

## ✨ Best Practices

1. **Use async/await**: Direct async/await in Server Components
2. **Fetch in parallel**: Use `Promise.all` for independent data
3. **Handle errors**: Always wrap in try-catch
4. **Choose caching**: Use appropriate cache strategies
5. **Optimize queries**: Fetch only needed data
6. **Use TypeScript**: Type your data for safety
7. **Validate data**: Validate API responses

## 🔗 Related Concepts

- [Client Component Fetching](./client-fetching.md) - Client-side fetching
- [Fetch API](./fetch-api.md) - Fetch API details
- [Server Actions](./server-actions.md) - Server-side mutations
- [Rendering Strategies](../02-rendering/README.md) - When data is fetched

## 📚 Resources

### Official Documentation
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## 🧪 Practice Exercises

### Exercise 1: Basic Data Fetching
**Difficulty**: Beginner  
**Goal**: Understand Server Component fetching  
**Instructions**:
1. Create a page that fetches data from an API
2. Display the data
3. Add error handling
4. Test the page

### Exercise 2: Parallel Fetching
**Difficulty**: Intermediate  
**Goal**: Practice parallel data fetching  
**Instructions**:
1. Create a page that needs multiple data sources
2. Fetch data in parallel
3. Handle errors for each source
4. Display all data

## 🎓 Key Takeaways

- Server Components can fetch data directly with async/await
- Runs on the server (build or request time)
- Better performance and SEO
- Can access databases, file system, APIs
- Use `Promise.all` for parallel fetching
- Always handle errors
- Choose appropriate caching strategies

## ❓ FAQ

### Q: Can I use hooks in Server Components?
**A**: No, Server Components cannot use React hooks. Use async/await directly.

### Q: When does data fetching happen?
**A**: Depends on caching strategy - at build time (SSG), on each request (SSR), or periodically (ISR).

### Q: Can I access databases directly?
**A**: Yes, Server Components can directly access databases, file system, and other server resources.

### Q: How do I handle errors?
**A**: Use try-catch blocks or return fallback values.

### Q: Should I fetch in parallel?
**A**: Yes, use `Promise.all` when data sources are independent to improve performance.

---

**Next Steps**: 
- Review: [Client Component Fetching](./client-fetching.md) for client-side fetching
- Practice: Create pages with data fetching
- Build: A data-driven application using Server Components

