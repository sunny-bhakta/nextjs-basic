# Metadata API

> **Category**: Intermediate | **Related Concepts**: [Dynamic Metadata](./dynamic-metadata.md), [Open Graph](./open-graph.md)  
> **Last Updated**: 2024

## 📖 Overview

The Metadata API in Next.js App Router provides a type-safe way to define metadata for your pages. It supports static and dynamic metadata, Open Graph tags, Twitter cards, and more.

**Key Points:**
- Type-safe metadata
- Static and dynamic metadata
- Open Graph support
- Twitter card support
- SEO optimization
- Automatic generation

## 🎯 When to Use

- **All Pages**: Define metadata for all pages
- **SEO**: When SEO is important
- **Social Sharing**: When sharing on social media
- **Dynamic Content**: When metadata depends on data
- **Type Safety**: When using TypeScript

## 💻 Basic Example

### Static Metadata

```typescript
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - My App',
  description: 'Welcome to my Next.js application',
}

export default function HomePage() {
  return <h1>Home</h1>
}
```

### Metadata with Open Graph

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/og-image.jpg'],
  },
}

export default function AboutPage() {
  return <h1>About</h1>
}
```

### Metadata with Twitter Card

```typescript
// app/blog/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Read our latest blog posts',
    images: ['/twitter-image.jpg'],
  },
}

export default function BlogPage() {
  return <h1>Blog</h1>
}
```

## 🔧 Advanced Example

### Complete Metadata

```typescript
// app/products/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - My App',
  description: 'Browse our amazing products',
  keywords: ['products', 'shopping', 'ecommerce'],
  authors: [{ name: 'John Doe' }],
  creator: 'My Company',
  publisher: 'My Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/products',
    languages: {
      'en-US': '/en-US/products',
      'de-DE': '/de-DE/products',
    },
  },
  openGraph: {
    title: 'Products',
    description: 'Browse our amazing products',
    url: 'https://example.com/products',
    siteName: 'My App',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products',
    description: 'Browse our amazing products',
    images: ['/twitter-products.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ProductsPage() {
  return <h1>Products</h1>
}
```

### Metadata in Layout

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'My amazing Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Basic Metadata
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}
```
**When to use**: Simple pages

### Pattern 2: With Open Graph
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  openGraph: {
    title: 'Page Title',
    images: ['/og-image.jpg'],
  },
}
```
**When to use**: Social media sharing

### Pattern 3: Template Title
```typescript
// layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
}
```
**When to use**: Consistent title format

## ⚠️ Common Mistakes

### Mistake 1: Not Exporting Metadata
```typescript
// ❌ Wrong: Not exported
const metadata: Metadata = {
  title: 'Page',
}
```
**Why**: Metadata must be exported.

```typescript
// ✅ Correct: Export metadata
export const metadata: Metadata = {
  title: 'Page',
}
```

### Mistake 2: Wrong Type
```typescript
// ❌ Wrong: Wrong type
export const metadata = {
  title: 'Page',
}
```
**Why**: Should use Metadata type.

```typescript
// ✅ Correct: Use Metadata type
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Page',
}
```

### Mistake 3: Missing Required Fields
```typescript
// ❌ Wrong: Missing description
export const metadata: Metadata = {
  title: 'Page',
  // Missing description
}
```
**Why**: Description is important for SEO.

```typescript
// ✅ Correct: Include description
export const metadata: Metadata = {
  title: 'Page',
  description: 'Page description',
}
```

## ✨ Best Practices

1. **Always include title and description**: Essential for SEO
2. **Use Open Graph**: For social media sharing
3. **Add images**: Visual content improves engagement
4. **Use templates**: For consistent title format
5. **Set metadataBase**: For absolute URLs
6. **Configure robots**: Control search engine indexing

## 🔗 Related Concepts

- [Dynamic Metadata](./dynamic-metadata.md) - Dynamic metadata generation
- [Open Graph](./open-graph.md) - Open Graph tags
- [Structured Data](./structured-data.md) - JSON-LD

## 📚 Resources

### Official Documentation
- [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 🧪 Practice Exercises

### Exercise 1: Basic Metadata
**Difficulty**: Beginner  
**Goal**: Understand metadata basics  
**Instructions**:
1. Add metadata to a page
2. Include title and description
3. Test in browser
4. Verify SEO tags

### Exercise 2: Complete Metadata
**Difficulty**: Intermediate  
**Goal**: Practice complete metadata  
**Instructions**:
1. Add full metadata object
2. Include Open Graph
3. Add Twitter cards
4. Test social sharing

## 🎓 Key Takeaways

- Use Metadata type for type safety
- Always export metadata
- Include title and description
- Use Open Graph for social sharing
- Set metadataBase for absolute URLs
- Configure robots for SEO

## ❓ FAQ

### Q: Where do I define metadata?
**A**: In page.tsx or layout.tsx files, export a metadata object.

### Q: Can I use dynamic metadata?
**A**: Yes, use `generateMetadata` function for dynamic metadata.

### Q: Do I need Open Graph?
**A**: Recommended for social media sharing, but not required.

### Q: Can I use metadata in layouts?
**A**: Yes, metadata in layouts applies to all child pages.

### Q: How do I test metadata?
**A**: Use browser dev tools, SEO tools, or social media debuggers.

---

**Next Steps**: 
- Review: [Dynamic Metadata](./dynamic-metadata.md) for dynamic generation
- Practice: Add metadata to your pages
- Build: Optimize SEO for your application

