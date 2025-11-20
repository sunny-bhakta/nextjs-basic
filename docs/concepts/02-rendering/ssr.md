# Server-Side Rendering (SSR)

> **Category**: Core | **Related Concepts**: [SSG](./ssg.md), [ISR](./isr.md)  
> **Last Updated**: 2024

## 📖 Overview

Server-Side Rendering (SSR) is a rendering strategy where pages are rendered on the server for each request. This ensures that every user gets fresh, up-to-date content, making it ideal for dynamic, frequently-changing, or user-specific content.

**Key Points:**
- Pages are rendered on the server for every request
- Content is always fresh and up-to-date
- Good for user-specific or frequently changing data
- Slightly slower than SSG but ensures data freshness
- Better SEO than CSR but not as good as SSG

## 🎯 When to Use

- **Frequently Changing Data**: Stock prices, news feeds, real-time analytics
- **User-Specific Content**: Dashboards, user profiles, personalized recommendations
- **Authentication Required**: Pages that need to check user authentication
- **Real-Time Data**: Content that must be current at request time
- **Dynamic Content**: Content that changes based on request parameters

## 💻 Basic Example

### App Router (Recommended)

```typescript
// app/dashboard/page.tsx
// This page is server-side rendered on each request

async function getDashboardData() {
  // This runs on EVERY request, not at build time
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store', // Don't cache - fetch fresh data every time
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data')
  }
  
  return res.json()
}

export default async function DashboardPage() {
  // This function runs on the server for each request
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      <div>
        <p>Total Users: {data.totalUsers}</p>
        <p>Active Sessions: {data.activeSessions}</p>
      </div>
    </div>
  )
}
```

### Force Dynamic Rendering

```typescript
// app/news/page.tsx
export const dynamic = 'force-dynamic' // Force SSR for this route

async function getLatestNews() {
  const res = await fetch('https://api.example.com/news', {
    cache: 'no-store',
  })
  
  return res.json()
}

export default async function NewsPage() {
  const news = await getLatestNews()
  
  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {news.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Pages Router (Legacy)

```typescript
// pages/dashboard.js
export default function DashboardPage({ data }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Users: {data.totalUsers}</p>
    </div>
  )
}

// This runs on EVERY REQUEST
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/dashboard')
  const data = await res.json()
  
  return {
    props: {
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
    },
  }
}
```

## 🔧 Advanced Example

### User-Specific Content with SSR

```typescript
// app/user/[id]/page.tsx
import { cookies } from 'next/headers'

interface UserPageProps {
  params: {
    id: string
  }
}

async function getUserData(id: string, token: string) {
  const res = await fetch(`https://api.example.com/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('User not found')
  }
  
  return res.json()
}

export default async function UserPage({ params }: UserPageProps) {
  // Access cookies on the server
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return <div>Please log in</div>
  }
  
  const user = await getUserData(params.id, token)
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Last login: {user.lastLogin}</p>
      <p>Rendered at: {new Date().toISOString()}</p>
    </div>
  )
}
```

### SSR with Request Headers

```typescript
// app/analytics/page.tsx
import { headers } from 'next/headers'

async function getAnalytics() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  
  // Use request information for analytics
  const res = await fetch('https://api.example.com/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAgent, ip }),
    cache: 'no-store',
  })
  
  return res.json()
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()
  
  return (
    <div>
      <h1>Analytics</h1>
      <p>Page Views: {analytics.pageViews}</p>
      <p>Unique Visitors: {analytics.uniqueVisitors}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Real-Time Data
```typescript
// app/stock/[symbol]/page.tsx
export const dynamic = 'force-dynamic'

async function getStockPrice(symbol: string) {
  const res = await fetch(`https://api.example.com/stock/${symbol}`, {
    cache: 'no-store',
  })
  return res.json()
}

export default async function StockPage({ params }: { params: { symbol: string } }) {
  const stock = await getStockPrice(params.symbol)
  return <div>Price: ${stock.price}</div>
}
```
**When to use**: Data that changes frequently and needs to be current

### Pattern 2: User Authentication
```typescript
// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    redirect('/login')
  }
  
  return token
}

export default async function DashboardPage() {
  const token = await checkAuth()
  // Fetch user-specific data
  return <div>Dashboard</div>
}
```
**When to use**: Pages that require authentication

### Pattern 3: Request-Based Content
```typescript
// app/search/page.tsx
import { searchParams } from 'next/navigation'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  
  const results = await fetch(`https://api.example.com/search?q=${query}`, {
    cache: 'no-store',
  }).then(res => res.json())
  
  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
**When to use**: Content that depends on request parameters

## ⚠️ Common Mistakes

### Mistake 1: Using SSR for Static Content
```typescript
// ❌ Wrong: Using SSR for content that doesn't change
export const dynamic = 'force-dynamic'

async function getAboutContent() {
  const res = await fetch('https://api.example.com/about', {
    cache: 'no-store', // Unnecessary - content doesn't change
  })
  return res.json()
}
```
**Why**: SSR is slower and uses more server resources. Use SSG for static content.

```typescript
// ✅ Correct: Use SSG for static content
async function getAboutContent() {
  const res = await fetch('https://api.example.com/about', {
    cache: 'force-cache', // Cache at build time
  })
  return res.json()
}
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserData(params.id) // Might throw error
  return <div>{user.name}</div>
}
```
**Why**: API calls can fail, causing the page to crash.

```typescript
// ✅ Correct: Handle errors properly
export default async function UserPage({ params }: { params: { id: string } }) {
  try {
    const user = await getUserData(params.id)
    return <div>{user.name}</div>
  } catch (error) {
    return <div>User not found</div>
  }
}
```

### Mistake 3: Caching SSR Responses
```typescript
// ❌ Wrong: Caching SSR data
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'force-cache', // This defeats the purpose of SSR
  })
  return res.json()
}
```
**Why**: SSR is meant to provide fresh data. Caching makes it behave like SSG.

```typescript
// ✅ Correct: Don't cache SSR data
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store', // Always fetch fresh
  })
  return res.json()
}
```

## ✨ Best Practices

1. **Use SSR sparingly**: Only when you need fresh data on every request
2. **Handle errors**: Always wrap data fetching in try-catch
3. **Don't cache**: Use `cache: 'no-store'` for SSR data
4. **Optimize API calls**: Make requests in parallel when possible
5. **Set timeouts**: Prevent long-running requests from blocking
6. **Use streaming**: Consider streaming for better performance
7. **Monitor performance**: SSR can be slower, monitor response times

## 🔗 Related Concepts

- [Static Site Generation](./ssg.md) - Pre-render at build time
- [Incremental Static Regeneration](./isr.md) - Update static pages periodically
- [Client-Side Rendering](./csr.md) - Render in the browser
- [Data Fetching](../05-data-fetching/README.md) - How to fetch data

## 📚 Resources

### Official Documentation
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### Examples
- [SSR Example](./examples/02-server-side-rendering.tsx)

## 🧪 Practice Exercises

### Exercise 1: User Dashboard
**Difficulty**: Intermediate  
**Goal**: Understand SSR with authentication  
**Instructions**:
1. Create a dashboard page that requires authentication
2. Fetch user-specific data on the server
3. Display real-time statistics
4. Handle authentication errors

**Solution**: See [examples/02-server-side-rendering.tsx](./examples/02-server-side-rendering.tsx)

### Exercise 2: Real-Time News Feed
**Difficulty**: Beginner  
**Goal**: Practice SSR for frequently changing content  
**Instructions**:
1. Create a news page that fetches latest articles
2. Use SSR to ensure fresh content
3. Add error handling
4. Display timestamp to show when page was rendered

## 🎓 Key Takeaways

- SSR renders pages on the server for each request
- Best for frequently changing or user-specific content
- Use `cache: 'no-store'` to ensure fresh data
- Slightly slower than SSG but ensures data freshness
- Good for authentication and personalization
- Always handle errors in data fetching

## ❓ FAQ

### Q: When should I use SSR instead of SSG?
**A**: Use SSR when content changes frequently, is user-specific, or needs to be real-time. Use SSG for static or infrequently changing content.

### Q: Is SSR slower than SSG?
**A**: Yes, SSR requires server processing for each request, while SSG serves pre-rendered HTML. However, the difference is usually minimal.

### Q: Can I use SSR with static content?
**A**: Technically yes, but it's inefficient. Use SSG for static content to get better performance.

### Q: How do I force a page to use SSR?
**A**: In App Router, use `export const dynamic = 'force-dynamic'` or `cache: 'no-store'` in fetch calls.

### Q: Can I cache SSR responses?
**A**: You can, but it defeats the purpose of SSR. Consider using ISR instead if you need some caching.

---

**Next Steps**: 
- Review: [Incremental Static Regeneration](./isr.md) for a middle ground
- Practice: Create a dashboard with SSR
- Build: A real-time analytics page using SSR

