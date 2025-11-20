# Dynamic Metadata

> **Category**: Intermediate | **Related Concepts**: [Metadata API](./metadata-api.md), [Data Fetching](../05-data-fetching/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Dynamic metadata allows you to generate metadata based on route parameters, search params, or fetched data. Use the `generateMetadata` function for dynamic metadata generation.

**Key Points:**
- Generate metadata dynamically
- Based on route params
- Based on fetched data
- Type-safe with TypeScript
- SEO optimization
- Social sharing optimization

## 🎯 When to Use

- **Dynamic Routes**: When metadata depends on route params
- **Data-Driven**: When metadata comes from API/database
- **User-Specific**: When metadata varies per user
- **SEO**: When you need dynamic SEO optimization
- **Social Sharing**: When sharing dynamic content

## 💻 Basic Example

### Metadata from Route Params

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`)
  return res.json()
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  return <article>{post.content}</article>
}
```

### Metadata from Search Params

```typescript
// app/search/page.tsx
import type { Metadata } from 'next'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || 'Search'
  
  return {
    title: `Search: ${query}`,
    description: `Search results for ${query}`,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return <div>Search results</div>
}
```

## 🔧 Advanced Example

### Complete Dynamic Metadata

```typescript
// app/products/[id]/page.tsx
import type { Metadata } from 'next'

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`)
  return res.json()
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  return {
    title: product.name,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  return <div>{product.name}</div>
}
```

### Metadata with Error Handling

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPost(params.slug)
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested post could not be found',
      }
    }
    
    return {
      title: post.title,
      description: post.excerpt,
    }
  } catch (error) {
    return {
      title: 'Error',
      description: 'Failed to load post metadata',
    }
  }
}
```

## 📋 Common Patterns

### Pattern 1: Route Params
```typescript
export async function generateMetadata({ params }) {
  const data = await getData(params.id)
  return { title: data.title }
}
```
**When to use**: Dynamic routes

### Pattern 2: Search Params
```typescript
export async function generateMetadata({ searchParams }) {
  const query = searchParams.q
  return { title: `Search: ${query}` }
}
```
**When to use**: Search pages

### Pattern 3: Data Fetching
```typescript
export async function generateMetadata() {
  const data = await fetchData()
  return { title: data.title }
}
```
**When to use**: Data-driven metadata

## ⚠️ Common Mistakes

### Mistake 1: Not Using Async
```typescript
// ❌ Wrong: Not async
export function generateMetadata({ params }) {
  const post = getPost(params.slug) // Returns Promise
  return { title: post.title } // Error
}
```
**Why**: generateMetadata must be async when fetching data.

```typescript
// ✅ Correct: Use async
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return { title: post.title }
}
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug) // Might fail
  return { title: post.title }
}
```
**Why**: API calls can fail.

```typescript
// ✅ Correct: Handle errors
export async function generateMetadata({ params }) {
  try {
    const post = await getPost(params.slug)
    return { title: post.title }
  } catch {
    return { title: 'Error' }
  }
}
```

### Mistake 3: Not Returning Metadata Type
```typescript
// ❌ Wrong: Wrong return type
export async function generateMetadata({ params }) {
  return { title: 'Page' } // No type
}
```
**Why**: Should return Promise<Metadata>.

```typescript
// ✅ Correct: Return Metadata type
import type { Metadata } from 'next'
export async function generateMetadata({ params }): Promise<Metadata> {
  return { title: 'Page' }
}
```

## ✨ Best Practices

1. **Use async**: When fetching data
2. **Handle errors**: Always handle potential errors
3. **Type safety**: Use Metadata type
4. **Cache data**: Consider caching for performance
5. **Optimize images**: Use optimized images for Open Graph
6. **Test thoroughly**: Test all dynamic routes

## 🔗 Related Concepts

- [Metadata API](./metadata-api.md) - Static metadata
- [Data Fetching](../05-data-fetching/README.md) - Fetching data

## 📚 Resources

### Official Documentation
- [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 🧪 Practice Exercises

### Exercise 1: Dynamic Route Metadata
**Difficulty**: Beginner  
**Goal**: Understand dynamic metadata  
**Instructions**:
1. Create dynamic route
2. Generate metadata from params
3. Test metadata generation
4. Verify SEO tags

### Exercise 2: Data-Driven Metadata
**Difficulty**: Intermediate  
**Goal**: Practice data-driven metadata  
**Instructions**:
1. Fetch data for metadata
2. Generate complete metadata
3. Handle errors
4. Test all scenarios

## 🎓 Key Takeaways

- Use `generateMetadata` for dynamic metadata
- Must be async when fetching data
- Handle errors gracefully
- Use Metadata type for type safety
- Can use route params and search params
- Cache data when possible

## ❓ FAQ

### Q: When should I use generateMetadata?
**A**: When metadata depends on route params, search params, or fetched data.

### Q: Can I use both static and dynamic metadata?
**A**: No, use either static metadata export or generateMetadata function.

### Q: Do I need to await data fetching?
**A**: Yes, always await async operations in generateMetadata.

### Q: Can I use generateMetadata in layouts?
**A**: No, generateMetadata only works in page components.

### Q: How do I handle errors?
**A**: Use try-catch blocks and return fallback metadata.

---

**Next Steps**: 
- Review: [Metadata API](./metadata-api.md) for static metadata
- Practice: Create dynamic metadata
- Build: Optimize SEO with dynamic metadata

