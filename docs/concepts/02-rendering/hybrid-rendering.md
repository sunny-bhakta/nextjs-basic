# Hybrid Rendering

> **Category**: Core | **Related Concepts**: [SSG](./ssg.md), [SSR](./ssr.md), [CSR](./csr.md)  
> **Last Updated**: 2024

## 📖 Overview

Hybrid Rendering is the practice of combining different rendering strategies (SSG, SSR, ISR, and CSR) in a single Next.js application. This allows you to optimize each page or component for its specific needs, achieving the best performance and user experience.

**Key Points:**
- Use the right strategy for each page/component
- Combine Server Components with Client Components
- Static content with dynamic interactivity
- Optimal performance and user experience
- Best of all worlds approach

## 🎯 When to Use

- **Different Content Types**: Mix of static, dynamic, and interactive content
- **Performance Optimization**: Use fastest strategy for each use case
- **Complex Applications**: Apps with diverse requirements
- **Progressive Enhancement**: Start with static, add interactivity
- **Cost Optimization**: Minimize server costs while maintaining functionality

## 💻 Basic Example

### Static Content with Client Interactivity

```typescript
// app/page.tsx - Server Component (Static)
import InteractiveCounter from './components/InteractiveCounter'

// This part is statically generated
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This content is statically generated at build time.</p>
      
      {/* Client component for interactivity */}
      <InteractiveCounter />
      
      <section>
        <h2>Static Content</h2>
        <p>This section is pre-rendered and cached.</p>
      </section>
    </div>
  )
}

// app/components/InteractiveCounter.tsx - Client Component
'use client'

import { useState } from 'react'

export default function InteractiveCounter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h3>Interactive Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
```

### ISR with Client-Side Filtering

```typescript
// app/products/page.tsx - Server Component (ISR)
import ProductFilter from './components/ProductFilter'

async function getProducts() {
  // ISR - revalidate every hour
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  })
  
  return res.json()
}

export default async function ProductsPage() {
  // Server component - statically generated with ISR
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      <p>Product list is statically generated and regenerated hourly.</p>
      
      {/* Client component for filtering */}
      <ProductFilter initialProducts={products} />
    </div>
  )
}

// app/products/components/ProductFilter.tsx - Client Component
'use client'

import { useState, useMemo } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

interface ProductFilterProps {
  initialProducts: Product[]
}

export default function ProductFilter({ initialProducts }: ProductFilterProps) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  const filteredAndSorted = useMemo(() => {
    let filtered = initialProducts
    
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.category === filter)
    }
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.price - b.price
    })
  }, [initialProducts, filter, sortBy])
  
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Categories</option>
        {/* ... */}
      </select>
      
      <ul>
        {filteredAndSorted.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 🔧 Advanced Example

### SSR + CSR Dashboard

```typescript
// app/dashboard/page.tsx - Server Component (SSR)
import DashboardWidgets from './components/DashboardWidgets'

async function getDashboardData() {
  // SSR - fetch fresh data on each request
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function DashboardPage() {
  // Server component - SSR
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Data fetched on server for each request</p>
      
      <div>
        <h2>Server-Rendered Stats</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Revenue: ${data.revenue}</p>
      </div>
      
      {/* Client component for interactive widgets */}
      <DashboardWidgets initialData={data} />
    </div>
  )
}

// app/dashboard/components/DashboardWidgets.tsx - Client Component
'use client'

import { useState } from 'react'

interface DashboardWidgetsProps {
  initialData: {
    totalUsers: number
    revenue: number
  }
}

export default function DashboardWidgets({ initialData }: DashboardWidgetsProps) {
  const [refreshCount, setRefreshCount] = useState(0)
  const [realTimeData, setRealTimeData] = useState(initialData)
  
  useEffect(() => {
    // Poll for real-time updates
    const interval = setInterval(async () => {
      const res = await fetch('/api/dashboard/realtime')
      const data = await res.json()
      setRealTimeData(data)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div>
      <h3>Interactive Widgets</h3>
      <p>Real-time Users: {realTimeData.totalUsers}</p>
      <p>Real-time Revenue: ${realTimeData.revenue}</p>
    </div>
  )
}
```

### Mixed Rendering Strategies

```typescript
// app/blog/page.tsx - Hybrid: SSR for latest, ISR for archive
async function getLatestPosts() {
  // SSR - fetch fresh data
  const res = await fetch('https://api.example.com/posts/latest', {
    cache: 'no-store'
  })
  
  return res.json()
}

async function getArchivePosts() {
  // ISR - cached, revalidate daily
  const res = await fetch('https://api.example.com/posts/archive', {
    next: { revalidate: 86400 }
  })
  
  return res.json()
}

export default async function BlogPage() {
  // Fetch both in parallel
  const [latestPosts, archivePosts] = await Promise.all([
    getLatestPosts(),
    getArchivePosts()
  ])
  
  return (
    <div>
      <section>
        <h2>Latest Posts (SSR)</h2>
        <p>Fresh content on every request</p>
        <ul>
          {latestPosts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Archive (ISR)</h2>
        <p>Pre-rendered and cached, regenerated daily</p>
        <ul>
          {archivePosts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Static Shell + Dynamic Content
```typescript
// Static layout and navigation
export default function Layout({ children }) {
  return (
    <div>
      <StaticNavigation />
      {children}
      <StaticFooter />
    </div>
  )
}

// Dynamic content per page
export default async function Page() {
  const data = await fetchData() // SSR or ISR
  return <DynamicContent data={data} />
}
```
**When to use**: When you have static UI with dynamic content

### Pattern 2: Server Data + Client Interactivity
```typescript
// Server component fetches data
export default async function Page() {
  const data = await getData() // SSG/SSR/ISR
  return <InteractiveComponent initialData={data} />
}

// Client component adds interactivity
'use client'
export function InteractiveComponent({ initialData }) {
  const [state, setState] = useState(initialData)
  // Add client-side interactions
}
```
**When to use**: When you need both server data and client interactivity

### Pattern 3: Progressive Enhancement
```typescript
// Start with static content
export default function Page() {
  return (
    <div>
      <StaticContent />
      <ClientEnhancement />
    </div>
  )
}

// Enhance with client features
'use client'
export function ClientEnhancement() {
  // Add features that work without JS as fallback
}
```
**When to use**: When you want to ensure basic functionality works without JavaScript

## ⚠️ Common Mistakes

### Mistake 1: Overusing Client Components
```typescript
// ❌ Wrong: Making everything a client component
'use client'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data && data.content}</div>
}
```
**Why**: Loses benefits of server rendering (SEO, performance).

```typescript
// ✅ Correct: Use server component when possible
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```

### Mistake 2: Not Passing Data Properly
```typescript
// ❌ Wrong: Fetching in client component when data is available on server
'use client'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  // Could have fetched on server
}
```
**Why**: Unnecessary client-side fetch when data could be fetched on server.

```typescript
// ✅ Correct: Fetch on server, pass to client
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <ClientComponent initialData={data} />
}
```

### Mistake 3: Mixing Strategies Incorrectly
```typescript
// ❌ Wrong: Using SSR for everything
export default async function Page() {
  const staticData = await fetch('/api/static', {
    cache: 'no-store' // Unnecessary - should be cached
  })
  return <div>{staticData.content}</div>
}
```
**Why**: Using wrong strategy wastes resources.

```typescript
// ✅ Correct: Use appropriate strategy for each data source
export default async function Page() {
  const staticData = await fetch('/api/static', {
    cache: 'force-cache' // SSG
  })
  const dynamicData = await fetch('/api/dynamic', {
    cache: 'no-store' // SSR
  })
  return <div>{staticData.content} {dynamicData.content}</div>
}
```

## ✨ Best Practices

1. **Use Server Components by default**: Only use Client Components when needed
2. **Choose right strategy per page**: SSG for static, SSR for dynamic, ISR for periodic
3. **Pass data from server to client**: Don't refetch on client what's available on server
4. **Minimize client components**: Keep interactivity isolated to specific components
5. **Optimize data fetching**: Fetch in parallel when possible
6. **Use streaming**: For better perceived performance
7. **Monitor performance**: Measure and optimize each strategy

## 🔗 Related Concepts

- [Static Site Generation](./ssg.md) - Pre-render at build time
- [Server-Side Rendering](./ssr.md) - Render on each request
- [Client-Side Rendering](./csr.md) - Render in browser
- [App Router](../03-app-router/README.md) - Server and Client Components

## 📚 Resources

### Official Documentation
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### Examples
- [Hybrid Rendering Example](./examples/05-hybrid-rendering.tsx)
- [Complete Example](./examples/07-complete-example.tsx)

## 🧪 Practice Exercises

### Exercise 1: Hybrid Blog
**Difficulty**: Intermediate  
**Goal**: Combine SSG, ISR, and CSR  
**Instructions**:
1. Create a blog with static home page (SSG)
2. Blog posts with ISR (revalidate every 5 minutes)
3. Add client-side search functionality
4. Combine all strategies in one app

**Solution**: See [examples/05-hybrid-rendering.tsx](./examples/05-hybrid-rendering.tsx)

### Exercise 2: E-commerce Site
**Difficulty**: Advanced  
**Goal**: Optimize different pages with different strategies  
**Instructions**:
1. Home page: SSG
2. Product listing: ISR (hourly)
3. Product detail: ISR with on-demand revalidation
4. Cart: CSR (client-side state)
5. Checkout: SSR (fresh data)

## 🎓 Key Takeaways

- Hybrid rendering combines multiple strategies for optimal performance
- Use Server Components by default, Client Components only when needed
- Choose the right strategy for each page/component
- Pass data from server to client instead of refetching
- Static content with dynamic interactivity is a common pattern
- Monitor and optimize each strategy independently

## ❓ FAQ

### Q: How do I decide which strategy to use?
**A**: Use SSG for static content, ISR for periodic updates, SSR for fresh data, and CSR for interactivity. Consider your content's update frequency and SEO needs.

### Q: Can I use multiple strategies on one page?
**A**: Yes! Fetch different data sources with different strategies, or combine server-rendered content with client-side interactivity.

### Q: Should I always use Server Components?
**A**: Use Server Components by default. Only use Client Components when you need interactivity, browser APIs, or state management.

### Q: How do I pass data from Server to Client Components?
**A**: Pass data as props. Server Components can pass serializable data to Client Components.

### Q: Can I mix SSG and SSR on the same page?
**A**: Yes, you can fetch different data sources with different strategies and combine them.

---

**Next Steps**: 
- Review: Individual rendering strategy guides
- Practice: Build an app using all strategies
- Build: A complex application with hybrid rendering

