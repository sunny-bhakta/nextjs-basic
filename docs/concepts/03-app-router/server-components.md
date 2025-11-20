# Server Components

> **Category**: Core | **Related Concepts**: [Client Components](./client-components.md), [Pages](./pages.md)  
> **Last Updated**: 2024

## 📖 Overview

Server Components are the default component type in the App Router. They run on the server, can directly access backend resources, and are not sent to the client, resulting in smaller bundle sizes and better performance.

**Key Points:**
- Default component type in App Router
- Run on the server only
- Can directly fetch data and access databases
- Not sent to the client (smaller bundles)
- Better performance and SEO
- Cannot use browser APIs or client-side features

## 🎯 When to Use

- **Data Fetching**: Fetch data directly from APIs or databases
- **Backend Access**: Access file system, databases, or internal APIs
- **SEO Critical**: Content that needs to be indexed by search engines
- **Performance**: Reduce JavaScript bundle size
- **Default Choice**: Use by default, only use Client Components when needed

## 💻 Basic Example

### Simple Server Component

```typescript
// app/page.tsx - Server Component by default
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is a Server Component</p>
    </div>
  )
}
```

### Server Component with Data Fetching

```typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
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

### Server Component with Database Access

```typescript
// app/products/page.tsx
import { db } from '@/lib/db'

export default async function ProductsPage() {
  // Direct database access in Server Component
  const products = await db.product.findMany()
  
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

## 🔧 Advanced Example

### Server Component with Multiple Data Sources

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

async function getRecentActivity() {
  // Direct database query
  const activity = await db.activity.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  })
  return activity
}

export default async function DashboardPage() {
  // Fetch in parallel
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

### Server Component with File System Access

```typescript
// app/docs/page.tsx
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

async function getDocs() {
  const docsDir = join(process.cwd(), 'docs')
  const files = await readdir(docsDir)
  
  const docs = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(join(docsDir, file), 'utf-8')
      return {
        name: file,
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

### Server Component with Environment Variables

```typescript
// app/admin/page.tsx
export default async function AdminPage() {
  // Access server-side environment variables
  const apiKey = process.env.ADMIN_API_KEY
  const dbUrl = process.env.DATABASE_URL
  
  // This is secure - not exposed to client
  const data = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }).then(res => res.json())
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Direct Data Fetching
```typescript
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```
**When to use**: Simple data fetching

### Pattern 2: Database Queries
```typescript
export default async function Page() {
  const items = await db.item.findMany()
  return <ItemList items={items} />
}
```
**When to use**: Direct database access

### Pattern 3: Parallel Fetching
```typescript
export default async function Page() {
  const [data1, data2] = await Promise.all([
    fetch('/api/data1').then(res => res.json()),
    fetch('/api/data2').then(res => res.json())
  ])
  return <div>{/* Use both data sources */}</div>
}
```
**When to use**: Multiple independent data sources

## ⚠️ Common Mistakes

### Mistake 1: Using Client Features
```typescript
// ❌ Wrong: Using hooks in Server Component
export default function Page() {
  const [state, setState] = useState(0) // Error!
  useEffect(() => {}) // Error!
  return <div>Content</div>
}
```
**Why**: Server Components can't use React hooks or browser APIs.

```typescript
// ✅ Correct: Use Client Component for interactivity
'use client'

export default function Page() {
  const [state, setState] = useState(0)
  return <div>Content</div>
}
```

### Mistake 2: Accessing Browser APIs
```typescript
// ❌ Wrong: Using browser APIs
export default function Page() {
  const width = window.innerWidth // Error!
  return <div>Width: {width}</div>
}
```
**Why**: Server Components run on server, no browser APIs available.

```typescript
// ✅ Correct: Use Client Component
'use client'

export default function Page() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return <div>Width: {width}</div>
}
```

### Mistake 3: Not Using Async
```typescript
// ❌ Wrong: Not using async for data fetching
export default function Page() {
  const data = fetch('/api/data').then(res => res.json()) // Won't work
  return <div>{data.content}</div> // data is a Promise
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

## ✨ Best Practices

1. **Use by default**: Server Components are the default, use them unless you need client features
2. **Fetch data directly**: Use async/await to fetch data directly
3. **Access backend resources**: Use databases, file system, APIs directly
4. **Keep components simple**: Move complex logic to separate functions
5. **Fetch in parallel**: Use `Promise.all` for independent data sources
6. **Handle errors**: Always handle potential errors in data fetching
7. **Optimize caching**: Use appropriate cache strategies

## 🔗 Related Concepts

- [Client Components](./client-components.md) - Client-side components
- [Pages](./pages.md) - Creating pages
- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns

## 📚 Resources

### Official Documentation
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

## 🧪 Practice Exercises

### Exercise 1: Server Component with Data
**Difficulty**: Beginner  
**Goal**: Understand Server Components  
**Instructions**:
1. Create a page that fetches data from an API
2. Display the data in a Server Component
3. Add error handling
4. Test the page

### Exercise 2: Database Integration
**Difficulty**: Intermediate  
**Goal**: Practice database access in Server Components  
**Instructions**:
1. Set up a database connection
2. Create a page that queries the database
3. Display results in Server Component
4. Add error handling

## 🎓 Key Takeaways

- Server Components are the default in App Router
- Run on the server only, not sent to client
- Can directly fetch data and access backend resources
- Better performance and SEO
- Cannot use hooks, browser APIs, or client-side features
- Use async/await for data fetching
- Smaller JavaScript bundles

## ❓ FAQ

### Q: Are all components Server Components by default?
**A**: Yes, in the App Router, components are Server Components by default unless you use `'use client'`.

### Q: Can Server Components use React hooks?
**A**: No, Server Components cannot use hooks like `useState`, `useEffect`, etc.

### Q: Can Server Components access browser APIs?
**A**: No, Server Components run on the server, so they can't access `window`, `document`, etc.

### Q: How do I fetch data in Server Components?
**A**: Use async/await directly in the component function.

### Q: Can Server Components be interactive?
**A**: No, for interactivity you need Client Components. You can combine both.

---

**Next Steps**: 
- Review: [Client Components](./client-components.md) for interactivity
- Practice: Create pages with Server Components
- Build: A data-driven application using Server Components

