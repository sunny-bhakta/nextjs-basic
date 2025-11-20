# Error Handling

> **Category**: Advanced | **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Error handling in Next.js involves managing errors at different levels: client-side with error boundaries, server-side with try-catch, and global error pages. Proper error handling improves user experience and helps with debugging.

**Key Points:**
- Error boundaries for client components
- Error pages for route-level errors
- Server component error handling
- Error logging and monitoring
- Graceful error recovery

## 🎯 When to Use

- **Client Errors**: React component errors
- **Server Errors**: API route and Server Component errors
- **Route Errors**: Page-level error handling
- **Global Errors**: Application-wide error handling
- **Error Logging**: Track and monitor errors

## 💻 Basic Example

### Error Boundary

```typescript
// app/components/ErrorBoundary.tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-600">{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Error Page

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Something went wrong!</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}
```

### Server Component Error Handling

```typescript
// app/products/page.tsx
async function getProducts() {
  try {
    const res = await fetch('https://api.example.com/products')
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export default async function ProductsPage() {
  try {
    const products = await getProducts()
    return (
      <div>
        {products.map((product: { id: string; name: string }) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    )
  } catch (error) {
    return <div>Error loading products. Please try again later.</div>
  }
}
```

## 🔧 Advanced Example

### Global Error Handler

```typescript
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Application Error</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
```

### Not Found Page

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">This page could not be found.</p>
      <a href="/" className="text-blue-600 hover:underline">
        Go back home
      </a>
    </div>
  )
}
```

### API Route Error Handling

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const products = await getProductsFromDb()
    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

## 📋 Common Patterns

### Pattern 1: Error Boundary
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```
**When to use**: Client component errors

### Pattern 2: Try-Catch in Server Components
```typescript
try {
  const data = await fetchData()
  return <Component data={data} />
} catch (error) {
  return <ErrorComponent />
}
```
**When to use**: Server component errors

### Pattern 3: Error Pages
```typescript
// app/error.tsx
export default function Error({ error, reset }) {
  return <ErrorUI error={error} reset={reset} />
}
```
**When to use**: Route-level errors

## ⚠️ Common Mistakes

### Mistake 1: Not Handling Async Errors
```typescript
// ❌ Wrong: Unhandled promise rejection
async function getData() {
  const res = await fetch('/api/data')
  return res.json()
}
```

```typescript
// ✅ Correct: Handle errors
async function getData() {
  try {
    const res = await fetch('/api/data')
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
```
**Why**: Unhandled errors can crash the application.

### Mistake 2: Not Logging Errors
```typescript
// ❌ Wrong: Silent failure
catch (error) {
  // Nothing
}
```

```typescript
// ✅ Correct: Log errors
catch (error) {
  console.error('Error:', error)
  // Send to error tracking service
}
```
**Why**: Errors need to be logged for debugging.

## ✨ Best Practices

1. **Use error boundaries**: For client component errors
2. **Handle server errors**: Try-catch in Server Components
3. **Create error pages**: Custom error and not-found pages
4. **Log errors**: Track errors for debugging
5. **Provide recovery**: Allow users to retry
6. **Show helpful messages**: User-friendly error messages
7. **Monitor errors**: Use error tracking services

## 🔗 Related Concepts

- [App Router](../03-app-router/README.md) - Routing and error pages
- [Server Components](../04-server-components/README.md) - Server-side error handling

## 📚 Resources

### Official Documentation
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

## 🎓 Key Takeaways

- Use error boundaries for client components
- Handle errors in Server Components with try-catch
- Create custom error and not-found pages
- Log errors for debugging
- Provide user-friendly error messages
- Allow users to recover from errors

