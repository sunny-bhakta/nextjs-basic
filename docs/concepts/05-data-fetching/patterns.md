# Data Fetching Patterns

> **Category**: Core | **Related Concepts**: [Server Component Fetching](./server-fetching.md), [Client Component Fetching](./client-fetching.md)  
> **Last Updated**: 2024

## 📖 Overview

Data Fetching Patterns are common approaches and best practices for fetching data in Next.js applications. Understanding these patterns helps you choose the right approach for different scenarios and build performant, maintainable applications.

**Key Points:**
- Common patterns for different use cases
- Best practices for performance
- Error handling strategies
- Loading state management
- Caching and revalidation patterns
- Combining Server and Client Components

## 🎯 When to Use

- **Choosing Approach**: Deciding how to fetch data
- **Optimizing Performance**: Improving data fetching performance
- **Error Handling**: Consistent error handling patterns
- **Loading States**: Managing loading states
- **Real-World Applications**: Patterns used in production

## 💻 Basic Example

### Server Component Pattern

```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache'
  })
  
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
      <ProductList products={products} />
    </div>
  )
}
```

### Client Component Pattern

```typescript
// app/components/UserProfile.tsx
'use client'

import { useState, useEffect } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  return <div>{user?.name}</div>
}
```

## 🔧 Advanced Example

### Hybrid Pattern: Server Data + Client Interactivity

```typescript
// app/products/page.tsx - Server Component
import ProductFilter from './components/ProductFilter'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  })
  return res.json()
}

export default async function ProductsPage() {
  // Fetch on server
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      {/* Pass data to client component */}
      <ProductFilter initialProducts={products} />
    </div>
  )
}

// app/products/components/ProductFilter.tsx - Client Component
'use client'

import { useState, useMemo } from 'react'

export default function ProductFilter({ initialProducts }) {
  const [filter, setFilter] = useState('all')
  
  // Filter on client using server data
  const filtered = useMemo(() => {
    if (filter === 'all') return initialProducts
    return initialProducts.filter(p => p.category === filter)
  }, [initialProducts, filter])
  
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        {/* ... */}
      </select>
      <ul>
        {filtered.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Parallel Fetching Pattern

```typescript
// app/dashboard/page.tsx
async function getUserData() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  })
  return res.json()
}

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 }
  })
  return res.json()
}

async function getActivity() {
  const res = await fetch('https://api.example.com/activity', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function DashboardPage() {
  // Fetch all in parallel
  const [user, stats, activity] = await Promise.all([
    getUserData(),
    getStats(),
    getActivity()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo user={user} />
      <StatsDisplay stats={stats} />
      <ActivityFeed activity={activity} />
    </div>
  )
}
```

### Error Boundary Pattern

```typescript
// app/blog/page.tsx
async function getPosts() {
  try {
    const res = await fetch('https://api.example.com/posts', {
      cache: 'force-cache'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    return res.json()
  } catch (error) {
    // Return empty array instead of throwing
    // Let error boundary handle if needed
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  if (posts.length === 0) {
    return <div>No posts available</div>
  }
  
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

// app/blog/error.tsx - Error boundary
'use client'

export default function BlogError({ error, reset }) {
  return (
    <div>
      <h2>Error loading blog</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Streaming Pattern with Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserStats from './components/UserStats'
import RecentActivity from './components/RecentActivity'

function StatsLoading() {
  return <div>Loading stats...</div>
}

function ActivityLoading() {
  return <div>Loading activity...</div>
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsLoading />}>
        <UserStats />
      </Suspense>
      
      <Suspense fallback={<ActivityLoading />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}

// app/dashboard/components/UserStats.tsx
async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function UserStats() {
  const stats = await getStats()
  
  return (
    <div>
      <p>Total: {stats.total}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Server-First
```typescript
// Fetch on server, enhance on client
export default async function Page() {
  const data = await fetchData() // Server
  return <InteractiveComponent initialData={data} /> // Client
}
```
**When to use**: Most common pattern - server data, client interactivity

### Pattern 2: Progressive Enhancement
```typescript
// Works without JS, enhanced with JS
<form action={serverAction}>
  {/* Works without JS */}
</form>
```
**When to use**: Forms and critical actions

### Pattern 3: Optimistic Updates
```typescript
// Update UI immediately, sync later
const handleUpdate = async () => {
  setData(newData) // Optimistic
  await updateOnServer(newData) // Sync
}
```
**When to use**: Better perceived performance

## ⚠️ Common Mistakes

### Mistake 1: Fetching in Client When Server Would Work
```typescript
// ❌ Wrong: Client fetching for initial data
'use client'

export default function Page() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  return <div>{data?.content}</div>
}
```
**Why**: Server fetching is better for initial data.

```typescript
// ✅ Correct: Server fetching
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```

### Mistake 2: Not Using Parallel Fetching
```typescript
// ❌ Wrong: Sequential fetching
const data1 = await fetch('/api/data1').then(res => res.json())
const data2 = await fetch('/api/data2').then(res => res.json())
// Slower
```
**Why**: Sequential fetching is slower.

```typescript
// ✅ Correct: Parallel fetching
const [data1, data2] = await Promise.all([
  fetch('/api/data1').then(res => res.json()),
  fetch('/api/data2').then(res => res.json())
])
// Faster
```

### Mistake 3: Not Handling Loading States
```typescript
// ❌ Wrong: No loading state
'use client'

export default function Component() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  return <div>{data.content}</div> // Error if null
}
```
**Why**: Data isn't available immediately.

```typescript
// ✅ Correct: Handle loading
'use client'

export default function Component() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  return <div>{data.content}</div>
}
```

## ✨ Best Practices

1. **Server-first**: Use Server Components for initial data
2. **Parallel fetching**: Use `Promise.all` for independent data
3. **Appropriate caching**: Choose right cache strategy
4. **Error handling**: Always handle errors gracefully
5. **Loading states**: Show loading indicators
6. **Hybrid approach**: Combine server and client fetching
7. **Optimize queries**: Fetch only needed data

## 🔗 Related Concepts

- [Server Component Fetching](./server-fetching.md) - Server-side patterns
- [Client Component Fetching](./client-fetching.md) - Client-side patterns
- [Server Actions](./server-actions.md) - Mutation patterns
- [Rendering Strategies](../02-rendering/README.md) - When data is fetched

## 📚 Resources

### Official Documentation
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)

## 🧪 Practice Exercises

### Exercise 1: Hybrid Data Fetching
**Difficulty**: Intermediate  
**Goal**: Combine server and client fetching  
**Instructions**:
1. Create a page with server-fetched data
2. Add client-side filtering
3. Add real-time updates
4. Test the hybrid approach

### Exercise 2: Optimized Data Fetching
**Difficulty**: Advanced  
**Goal**: Optimize data fetching performance  
**Instructions**:
1. Implement parallel fetching
2. Add appropriate caching
3. Use streaming with Suspense
4. Measure performance improvements

## 🎓 Key Takeaways

- Use Server Components for initial data
- Fetch in parallel when possible
- Choose appropriate caching strategies
- Always handle errors and loading states
- Combine server and client fetching
- Use Suspense for streaming
- Optimize for performance

## ❓ FAQ

### Q: Should I always use Server Components for data fetching?
**A**: Yes, for initial page data. Use Client Components only for user interactions or real-time updates.

### Q: How do I handle errors in data fetching?
**A**: Use try-catch in Server Components, and error boundaries for route-level errors.

### Q: When should I fetch in parallel?
**A**: When data sources are independent and don't depend on each other.

### Q: Can I mix Server and Client Components?
**A**: Yes! This is the recommended pattern - server data, client interactivity.

### Q: How do I optimize data fetching?
**A**: Use parallel fetching, appropriate caching, and fetch only needed data.

---

**Next Steps**: 
- Review: Individual fetching guides for details
- Practice: Implement different patterns
- Build: A production-ready app with optimized data fetching

