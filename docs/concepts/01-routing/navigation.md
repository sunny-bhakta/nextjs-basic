# Navigation

## Overview

Next.js provides multiple ways to navigate between pages: the `Link` component for declarative navigation and the `useRouter` hook for programmatic navigation.

## Link Component

The `Link` component is the primary way to navigate between pages in Next.js.

### Basic Usage

```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  )
}
```

### With Styling

```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link 
        href="/about" 
        style={{ color: 'blue', textDecoration: 'none' }}
      >
        About
      </Link>
    </nav>
  )
}
```

### Dynamic Routes

```typescript
import Link from 'next/link'

export default function BlogList({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

### Prefetching

Links automatically prefetch in the background. Disable if needed:

```typescript
<Link href="/about" prefetch={false}>
  About
</Link>
```

## useRouter Hook

Use `useRouter` for programmatic navigation.

### App Router

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/about')
  }
  
  return <button onClick={handleClick}>Go to About</button>
}
```

### Pages Router

```typescript
import { useRouter } from 'next/router'

export default function MyComponent() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/about')
  }
  
  return <button onClick={handleClick}>Go to About</button>
}
```

## Navigation Methods

### router.push()

Navigate to a new route (adds to history):

```typescript
router.push('/about')
router.push('/blog/post-1')
router.push({ pathname: '/about', query: { id: '1' } })
```

### router.replace()

Replace current route (doesn't add to history):

```typescript
router.replace('/login') // After login, back button won't go to login page
```

### router.back()

Go back in history:

```typescript
router.back()
```

### router.forward()

Go forward in history:

```typescript
router.forward()
```

### router.refresh()

Refresh current route:

```typescript
router.refresh()
```

## Shallow Routing

Update URL without running data fetching methods (Pages Router only):

```typescript
router.push('/about?counter=10', undefined, { shallow: true })
```

## Reading Query Parameters

### App Router

```typescript
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  
  return <div>Search: {query}</div>
}
```

### Pages Router

```typescript
import { useRouter } from 'next/router'

export default function SearchPage() {
  const router = useRouter()
  const query = router.query.q
  
  return <div>Search: {query}</div>
}
```

## Best Practices

1. **Use Link for navigation**: Prefer `Link` over `router.push()` for better UX
2. **Handle loading states**: Show loading indicators during navigation
3. **Validate routes**: Check if route exists before navigating
4. **Use replace for redirects**: Use `router.replace()` for login/logout flows

## Common Mistakes

### ❌ Wrong: Using anchor tags

```typescript
<a href="/about">About</a> // Causes full page reload
```

### ✅ Correct: Use Link component

```typescript
<Link href="/about">About</Link> // Client-side navigation
```

### ❌ Wrong: Using router in Server Components

```typescript
// app/page.tsx (Server Component)
import { useRouter } from 'next/navigation' // Error!

export default function Page() {
  const router = useRouter() // Can't use hooks in Server Components
}
```

### ✅ Correct: Use in Client Components

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter() // Works in Client Components
}
```

## Related Topics

- [File-based Routing](./file-based-routing.md)
- [Dynamic Routes](./dynamic-routes.md)
- [App Router](../03-app-router/README.md)

