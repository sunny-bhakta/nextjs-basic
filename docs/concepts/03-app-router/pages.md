# Pages

> **Category**: Core | **Related Concepts**: [Layouts](./layouts.md), [Directory Structure](./directory-structure.md)  
> **Last Updated**: 2024

## 📖 Overview

Pages in the App Router are created using `page.tsx` files. Each `page.tsx` file creates a route in your application. Pages are Server Components by default, can fetch data directly, and are the building blocks of your Next.js application.

**Key Points:**
- Created with `page.tsx` files
- Each page creates a route
- Server Components by default
- Can fetch data directly
- Support dynamic routes and metadata

## 🎯 When to Use

- **Creating routes**: Every route needs a `page.tsx` file
- **Displaying content**: Show content to users
- **Data fetching**: Fetch data on the server
- **SEO optimization**: Add metadata for search engines
- **User interaction**: Create interactive pages

## 💻 Basic Example

### Simple Page

```typescript
// app/page.tsx - Home page (/)
export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the home page</p>
    </div>
  )
}
```

### Page with Data Fetching

```typescript
// app/blog/page.tsx - Blog listing
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

### Page with Metadata

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
}

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Company information...</p>
    </div>
  )
}
```

## 🔧 Advanced Example

### Dynamic Route Page

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

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
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

### Page with Multiple Data Sources

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

export default async function DashboardPage() {
  // Fetch in parallel
  const [user, stats] = await Promise.all([
    getUserData(),
    getStats()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <div>
        <p>Total Views: {stats.views}</p>
        <p>Total Users: {stats.users}</p>
      </div>
    </div>
  )
}
```

### Page with Search Params

```typescript
// app/search/page.tsx
interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

async function search(query: string, category?: string) {
  const url = new URL('https://api.example.com/search')
  url.searchParams.set('q', query)
  if (category) {
    url.searchParams.set('category', category)
  }
  
  const res = await fetch(url.toString(), {
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const category = searchParams.category
  
  const results = query ? await search(query, category) : []
  
  return (
    <div>
      <h1>Search</h1>
      {query && (
        <div>
          <p>Results for: {query}</p>
          <ul>
            {results.map(result => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Static Page
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About content</div>
}
```
**When to use**: Simple static content

### Pattern 2: Data-Fetching Page
```typescript
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```
**When to use**: Pages that need data

### Pattern 3: Dynamic Metadata
```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return { title: post.title }
}
```
**When to use**: Pages with dynamic SEO needs

## ⚠️ Common Mistakes

### Mistake 1: Using Client Components Unnecessarily
```typescript
// ❌ Wrong: Using 'use client' when not needed
'use client'

export default function Page() {
  return <div>Static content</div>
}
```
**Why**: Server Components are faster and better for SEO.

```typescript
// ✅ Correct: Use Server Component by default
export default function Page() {
  return <div>Static content</div>
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
**Why**: API calls can fail, causing page crashes.

```typescript
// ✅ Correct: Handle errors
export default async function Page() {
  try {
    const data = await fetch('/api/data').then(res => res.json())
    return <div>{data.content}</div>
  } catch (error) {
    return <div>Error loading content</div>
  }
}
```

### Mistake 3: Not Using generateStaticParams
```typescript
// ❌ Wrong: Missing generateStaticParams for dynamic routes
export default async function Page({ params }) {
  const data = await getData(params.id)
  return <div>{data.content}</div>
}
```
**Why**: Next.js needs to know all possible paths at build time.

```typescript
// ✅ Correct: Generate static params
export async function generateStaticParams() {
  const items = await getAllItems()
  return items.map(item => ({ id: item.id }))
}

export default async function Page({ params }) {
  const data = await getData(params.id)
  return <div>{data.content}</div>
}
```

## ✨ Best Practices

1. **Use Server Components**: Default to Server Components
2. **Fetch data directly**: Use async/await in Server Components
3. **Add metadata**: Include metadata for SEO
4. **Handle errors**: Always handle potential errors
5. **Use generateStaticParams**: For dynamic routes with SSG
6. **Fetch in parallel**: Use `Promise.all` when possible
7. **Optimize images**: Use `next/image` for images

## 🔗 Related Concepts

- [Layouts](./layouts.md) - Shared UI
- [Server Components](./server-components.md) - Default component type
- [Data Fetching](../05-data-fetching/README.md) - Fetching data

## 📚 Resources

### Official Documentation
- [Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## 🧪 Practice Exercises

### Exercise 1: Create Multiple Pages
**Difficulty**: Beginner  
**Goal**: Understand basic page creation  
**Instructions**:
1. Create home, about, and contact pages
2. Add metadata to each page
3. Create navigation between pages
4. Test all routes

### Exercise 2: Dynamic Blog
**Difficulty**: Intermediate  
**Goal**: Practice dynamic routes and data fetching  
**Instructions**:
1. Create blog listing page
2. Create dynamic blog post pages
3. Add generateStaticParams
4. Add dynamic metadata
5. Handle errors

## 🎓 Key Takeaways

- Pages are created with `page.tsx` files
- Each page creates a route
- Server Components by default
- Can fetch data directly with async/await
- Support dynamic routes and metadata
- Always handle errors

## ❓ FAQ

### Q: Can pages be client components?
**A**: Yes, use `'use client'` when you need client-side features, but prefer Server Components.

### Q: How do I create a route?
**A**: Create a `page.tsx` file in the `app/` directory structure.

### Q: Can I fetch data in pages?
**A**: Yes, Server Components can use async/await to fetch data directly.

### Q: How do dynamic routes work?
**A**: Use folders with brackets like `[id]` or `[slug]` and access params in the page component.

### Q: Do pages re-render on navigation?
**A**: Yes, pages re-render on navigation, unlike layouts.

---

**Next Steps**: 
- Review: [Server Components](./server-components.md) for data fetching
- Practice: Create a blog with dynamic routes
- Build: A multi-page application with data fetching

