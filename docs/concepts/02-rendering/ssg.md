# Static Site Generation (SSG)

> **Category**: Core | **Related Concepts**: [ISR](./isr.md), [SSR](./ssr.md)  
> **Last Updated**: 2024

## 📖 Overview

Static Site Generation (SSG) is a rendering strategy where pages are pre-rendered at build time and served as static HTML files. This is the default behavior in Next.js App Router and provides the best performance and SEO.

**Key Points:**
- Pages are generated once at build time
- Served as static HTML files (fastest performance)
- Best for content that doesn't change frequently
- Excellent SEO since content is available immediately
- No server processing needed for each request

## 🎯 When to Use

- **Static Content**: Blog posts, documentation, landing pages
- **Content that rarely changes**: About pages, product catalogs (if updated infrequently)
- **Maximum Performance**: When you need the fastest possible page loads
- **SEO Critical Pages**: Pages that need to be indexed immediately
- **Cost Optimization**: Reduce server costs by serving static files

## 💻 Basic Example

### App Router (Recommended)

```typescript
// app/products/page.tsx
// This page is statically generated at build time

async function getProducts() {
  // This fetch runs at BUILD TIME, not request time
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Cache the response
  })
  
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

### Pages Router (Legacy)

```typescript
// pages/products.js
export default function ProductsPage({ products }) {
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

// This runs at BUILD TIME
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/products')
  const products = await res.json()
  
  return {
    props: {
      products,
    },
  }
}
```

## 🔧 Advanced Example

### Dynamic Routes with SSG

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

// Generate all possible paths at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
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
      <p><em>Generated at build time</em></p>
    </article>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Simple Static Page
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page has no data fetching - pure static content.</p>
    </div>
  )
}
```
**When to use**: Pages with no dynamic content

### Pattern 2: Static Page with Data
```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache'
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```
**When to use**: Pages that need data but it doesn't change often

### Pattern 3: Static with Metadata
```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
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
```
**When to use**: Pages that need dynamic metadata for SEO

## ⚠️ Common Mistakes

### Mistake 1: Using SSG for Frequently Changing Data
```typescript
// ❌ Wrong: Using SSG for real-time data
async function getStockPrice() {
  const res = await fetch('https://api.example.com/stock', {
    cache: 'force-cache' // This won't update!
  })
  return res.json()
}
```
**Why**: Stock prices change constantly. SSG will show stale data.

```typescript
// ✅ Correct: Use SSR or ISR for frequently changing data
async function getStockPrice() {
  const res = await fetch('https://api.example.com/stock', {
    cache: 'no-store' // Fetch fresh data
  })
  return res.json()
}
```

### Mistake 2: Not Generating All Static Paths
```typescript
// ❌ Wrong: Missing generateStaticParams
export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  // This will fail at build time if slug doesn't exist
}
```
**Why**: Next.js needs to know all possible paths at build time.

```typescript
// ✅ Correct: Generate all paths
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  return posts.map(post => ({ slug: post.slug }))
}
```

### Mistake 3: Using Client-Side Fetch in Server Components
```typescript
// ❌ Wrong: Using useEffect in Server Component
export default function ProductsPage() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts)
  }, [])
  // This won't work - Server Components can't use hooks
}
```
**Why**: Server Components run on the server, not in the browser.

```typescript
// ✅ Correct: Fetch directly in Server Component
export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```

## ✨ Best Practices

1. **Use SSG by default**: It's the fastest and most cost-effective option
2. **Generate all paths**: Always use `generateStaticParams` for dynamic routes
3. **Cache API responses**: Use `cache: 'force-cache'` for build-time fetches
4. **Add metadata**: Include proper metadata for SEO
5. **Handle errors**: Use try-catch for data fetching
6. **Optimize images**: Use `next/image` for static images
7. **Pre-render critical pages**: Ensure important pages are statically generated

## 🔗 Related Concepts

- [Incremental Static Regeneration](./isr.md) - Update static pages after build
- [Server-Side Rendering](./ssr.md) - Render on each request
- [Data Fetching](../05-data-fetching/README.md) - How to fetch data
- [App Router](../03-app-router/README.md) - Modern routing system

## 📚 Resources

### Official Documentation
- [Next.js Static Generation](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### Examples
- [Static Generation Example](./examples/01-static-site-generation.tsx)

## 🧪 Practice Exercises

### Exercise 1: Create a Static Blog
**Difficulty**: Beginner  
**Goal**: Understand basic SSG  
**Instructions**:
1. Create a blog listing page that fetches posts at build time
2. Create individual blog post pages with dynamic routes
3. Use `generateStaticParams` to pre-render all posts
4. Add metadata for SEO

**Solution**: See [examples/01-static-site-generation.tsx](./examples/01-static-site-generation.tsx)

### Exercise 2: Static Product Catalog
**Difficulty**: Intermediate  
**Goal**: Practice SSG with complex data  
**Instructions**:
1. Create a product listing page
2. Create category pages
3. Create individual product pages
4. Ensure all pages are statically generated
5. Add proper error handling

## 🎓 Key Takeaways

- SSG is the default and fastest rendering strategy in Next.js
- Pages are generated once at build time
- Best for content that doesn't change frequently
- Excellent for SEO and performance
- Use `generateStaticParams` for dynamic routes
- Consider ISR if content needs periodic updates

## ❓ FAQ

### Q: How do I know if my page is statically generated?
**A**: Check the build output. Static pages will show in `.next/server/app` as HTML files. You can also check the response headers - static pages won't have `Cache-Control: no-store`.

### Q: Can I use SSG with user-specific content?
**A**: No, SSG generates the same HTML for all users. Use SSR or CSR for user-specific content.

### Q: What happens if I add a new blog post after build?
**A**: The new post won't be available until you rebuild. Consider using ISR for this scenario.

### Q: How do I force a page to be static?
**A**: In App Router, it's the default. You can explicitly set `export const dynamic = 'force-static'`.

### Q: Can I use environment variables in SSG?
**A**: Yes, but they're evaluated at build time. Use `NEXT_PUBLIC_` prefix for client-side variables.

---

**Next Steps**: 
- Review: [Incremental Static Regeneration](./isr.md) for updating static content
- Practice: Create a static blog or documentation site
- Build: A portfolio site using SSG

