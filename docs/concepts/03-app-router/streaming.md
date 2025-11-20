# Streaming

> **Category**: Core | **Related Concepts**: [Loading States](./loading-states.md), [Server Components](./server-components.md)  
> **Last Updated**: 2024

## 📖 Overview

Streaming in Next.js allows you to progressively render and send parts of a page to the client as they become ready. This is achieved using React Suspense boundaries, which enable you to show loading states for specific parts of a page while other parts are already rendered.

**Key Points:**
- Progressive rendering with Suspense
- Show loading states for specific components
- Improve perceived performance
- Stream HTML to client as it's ready
- Works with Server Components
- Better user experience

## 🎯 When to Use

- **Multiple Data Sources**: Different loading times for different data
- **Better UX**: Show content as it becomes available
- **Large Pages**: Pages with multiple slow data sources
- **Progressive Enhancement**: Show some content while loading others
- **Performance**: Improve perceived performance

## 💻 Basic Example

### Simple Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserStats from './components/UserStats'

function StatsLoading() {
  return <div>Loading stats...</div>
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsLoading />}>
        <UserStats />
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
      <p>Active: {stats.active}</p>
    </div>
  )
}
```

### Multiple Suspense Boundaries

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserStats from './components/UserStats'
import RecentActivity from './components/RecentActivity'
import Notifications from './components/Notifications'

function StatsLoading() {
  return <div>Loading stats...</div>
}

function ActivityLoading() {
  return <div>Loading activity...</div>
}

function NotificationsLoading() {
  return <div>Loading notifications...</div>
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
      
      <Suspense fallback={<NotificationsLoading />}>
        <Notifications />
      </Suspense>
    </div>
  )
}
```

## 🔧 Advanced Example

### Nested Suspense

```typescript
// app/blog/page.tsx
import { Suspense } from 'react'
import PostList from './components/PostList'
import Categories from './components/Categories'

function PostListLoading() {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded animate-pulse mb-4"></div>
      ))}
    </div>
  )
}

function CategoriesLoading() {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      
      <Suspense fallback={<CategoriesLoading />}>
        <Categories />
      </Suspense>
      
      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </div>
  )
}
```

### Streaming with Error Boundaries

```typescript
// app/products/page.tsx
import { Suspense } from 'react'
import ProductList from './components/ProductList'
import ProductFilters from './components/ProductFilters'

function ProductListLoading() {
  return <div>Loading products...</div>
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      
      <ProductFilters />
      
      <Suspense fallback={<ProductListLoading />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

// app/products/components/ProductList.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  return res.json()
}

export default async function ProductList() {
  const products = await getProducts()
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}

// app/products/error.tsx - Error boundary
'use client'

export default function ProductsError({ error, reset }) {
  return (
    <div>
      <h2>Error loading products</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Streaming with Metadata

```typescript
// app/blog/[slug]/page.tsx
import { Suspense } from 'react'
import PostContent from './components/PostContent'
import PostComments from './components/PostComments'
import type { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache'
  })
  return res.json()
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

function CommentsLoading() {
  return <div>Loading comments...</div>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <PostContent content={post.content} />
      
      <Suspense fallback={<CommentsLoading />}>
        <PostComments postId={post.id} />
      </Suspense>
    </article>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Single Suspense
```typescript
<Suspense fallback={<Loading />}>
  <DataComponent />
</Suspense>
```
**When to use**: Single slow data source

### Pattern 2: Multiple Suspense
```typescript
<Suspense fallback={<Loading1 />}>
  <Component1 />
</Suspense>
<Suspense fallback={<Loading2 />}>
  <Component2 />
</Suspense>
```
**When to use**: Multiple independent data sources

### Pattern 3: Nested Suspense
```typescript
<Suspense fallback={<OuterLoading />}>
  <OuterComponent>
    <Suspense fallback={<InnerLoading />}>
      <InnerComponent />
    </Suspense>
  </OuterComponent>
</Suspense>
```
**When to use**: Nested data dependencies

## ⚠️ Common Mistakes

### Mistake 1: Not Using Suspense
```typescript
// ❌ Wrong: No streaming, all-or-nothing loading
export default async function Page() {
  const [data1, data2, data3] = await Promise.all([
    fetch('/api/data1').then(res => res.json()),
    fetch('/api/data2').then(res => res.json()),
    fetch('/api/data3').then(res => res.json())
  ])
  // All must load before page renders
}
```
**Why**: Users wait for all data, even if some is ready.

```typescript
// ✅ Correct: Use Suspense for streaming
export default function Page() {
  return (
    <div>
      <Suspense fallback={<Loading1 />}>
        <DataComponent1 />
      </Suspense>
      <Suspense fallback={<Loading2 />}>
        <DataComponent2 />
      </Suspense>
    </div>
  )
}
```

### Mistake 2: Generic Loading States
```typescript
// ❌ Wrong: Same loading for everything
<Suspense fallback={<div>Loading...</div>}>
  <UserStats />
</Suspense>
<Suspense fallback={<div>Loading...</div>}>
  <ActivityFeed />
</Suspense>
```
**Why**: Generic loading doesn't match content structure.

```typescript
// ✅ Correct: Specific loading states
<Suspense fallback={<StatsSkeleton />}>
  <UserStats />
</Suspense>
<Suspense fallback={<ActivitySkeleton />}>
  <ActivityFeed />
</Suspense>
```

### Mistake 3: Suspense in Client Components
```typescript
// ❌ Wrong: Suspense around client component
'use client'

export default function Component() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  )
}
```
**Why**: Suspense works best with Server Components.

```typescript
// ✅ Correct: Suspense with Server Components
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ServerDataComponent />
    </Suspense>
  )
}
```

## ✨ Best Practices

1. **Use Suspense boundaries**: Wrap slow data fetching components
2. **Specific loading states**: Match loading UI to content structure
3. **Multiple boundaries**: Use separate Suspense for independent data
4. **Skeleton UI**: Use skeleton loaders for better UX
5. **Error boundaries**: Combine with error boundaries
6. **Server Components**: Use with Server Components for best results
7. **Measure performance**: Monitor streaming performance

## 🔗 Related Concepts

- [Loading States](./loading-states.md) - Loading UI
- [Server Components](./server-components.md) - Server-side components
- [Error Boundaries](./error-boundaries.md) - Error handling

## 📚 Resources

### Official Documentation
- [Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Suspense](https://react.dev/reference/react/Suspense)

## 🧪 Practice Exercises

### Exercise 1: Basic Streaming
**Difficulty**: Beginner  
**Goal**: Understand Suspense basics  
**Instructions**:
1. Create a page with multiple data sources
2. Add Suspense boundaries
3. Create specific loading states
4. Test streaming behavior

### Exercise 2: Advanced Streaming
**Difficulty**: Intermediate  
**Goal**: Practice nested Suspense  
**Instructions**:
1. Create nested Suspense boundaries
2. Add error boundaries
3. Use skeleton loaders
4. Measure performance

## 🎓 Key Takeaways

- Streaming enables progressive rendering
- Use Suspense boundaries for slow components
- Show content as it becomes available
- Better perceived performance
- Works best with Server Components
- Combine with error boundaries
- Use specific loading states

## ❓ FAQ

### Q: How does streaming work?
**A**: Next.js streams HTML to the client as Server Components finish rendering, showing Suspense fallbacks for components still loading.

### Q: Can I use Suspense in Client Components?
**A**: Suspense works best with Server Components. Client Components can use Suspense but with different behavior.

### Q: Do I need loading.tsx with Suspense?
**A**: `loading.tsx` handles route-level loading. Suspense handles component-level loading.

### Q: How many Suspense boundaries should I use?
**A**: Use separate Suspense for each independent data source that might load at different times.

### Q: Does streaming improve performance?
**A**: Yes, it improves perceived performance by showing content as it becomes available rather than waiting for everything.

---

**Next Steps**: 
- Review: [Loading States](./loading-states.md) for loading UI
- Practice: Implement streaming in your app
- Build: A dashboard with multiple streaming components

