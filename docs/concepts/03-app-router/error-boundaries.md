# Error Boundaries

> **Category**: Core | **Related Concepts**: [Pages](./pages.md), [Loading States](./loading-states.md)  
> **Last Updated**: 2024

## 📖 Overview

Error boundaries in the App Router are created using `error.tsx` files. These files automatically catch errors in the component tree and display a fallback UI, preventing the entire application from crashing.

**Key Points:**
- Created with `error.tsx` files
- Automatically catch errors in route segments
- Display fallback UI instead of crashing
- Can be nested for granular error handling
- Must be Client Components

## 🎯 When to Use

- **Error Handling**: Catch and handle errors gracefully
- **User Experience**: Show friendly error messages
- **Debugging**: Log errors for debugging
- **Recovery**: Allow users to retry failed operations
- **Isolation**: Prevent errors from crashing entire app

## 💻 Basic Example

### Simple Error Boundary

```typescript
// app/error.tsx - Root error boundary
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Error Boundary with Details

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      {error.digest && (
        <p className="text-sm text-gray-400 mb-4">Error ID: {error.digest}</p>
      )}
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}
```

### Nested Error Boundaries

```typescript
// app/blog/error.tsx - Error boundary for blog section
'use client'

export default function BlogError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Error loading blog</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  )
}

// app/blog/[slug]/error.tsx - Error boundary for individual post
'use client'

export default function PostError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Error loading post</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## 🔧 Advanced Example

### Error Boundary with Logging

```typescript
// app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error)
    
    // Send to error tracking service
    if (typeof window !== 'undefined') {
      // Example: Send to error tracking service
      // logErrorToService(error)
    }
  }, [error])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-mono text-red-800">
              {error.message}
            </p>
            {error.stack && (
              <pre className="text-xs text-red-600 mt-2 overflow-auto">
                {error.stack}
              </pre>
            )}
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Route-Specific Error Handling

```typescript
// app/dashboard/error.tsx
'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const isAuthError = error.message.includes('unauthorized')
  
  if (isAuthError) {
    return (
      <div>
        <h2>Authentication Required</h2>
        <p>Please log in to access the dashboard.</p>
        <a href="/login">Go to login</a>
      </div>
    )
  }
  
  return (
    <div>
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  )
}
```

### Error Boundary with Recovery

```typescript
// app/products/error.tsx
'use client'

import { useState } from 'react'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const [retryCount, setRetryCount] = useState(0)
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    reset()
  }
  
  return (
    <div>
      <h2>Failed to load products</h2>
      <p>{error.message}</p>
      
      {retryCount < 3 ? (
        <button onClick={handleRetry}>
          Retry ({retryCount}/3)
        </button>
      ) : (
        <div>
          <p>Multiple retry attempts failed.</p>
          <a href="/contact">Contact support</a>
        </div>
      )}
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Simple Error Display
```typescript
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```
**When to use**: Basic error handling

### Pattern 2: Error with Logging
```typescript
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
    // Log to error service
  }, [error])
  
  return <div>Error occurred</div>
}
```
**When to use**: When you need to track errors

### Pattern 3: Conditional Error Handling
```typescript
'use client'

export default function Error({ error, reset }) {
  if (error.message.includes('404')) {
    return <div>Not found</div>
  }
  
  return <div>Something went wrong</div>
}
```
**When to use**: Different handling for different error types

## ⚠️ Common Mistakes

### Mistake 1: Not Using 'use client'
```typescript
// ❌ Wrong: Error boundaries must be Client Components
export default function Error({ error, reset }) {
  return <div>Error</div>
}
```
**Why**: Error boundaries need client-side features.

```typescript
// ✅ Correct: Use 'use client'
'use client'

export default function Error({ error, reset }) {
  return <div>Error</div>
}
```

### Mistake 2: Not Providing Reset Function
```typescript
// ❌ Wrong: Not using reset function
export default function Error({ error }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      {/* No way to recover */}
    </div>
  )
}
```
**Why**: Users can't recover from errors.

```typescript
// ✅ Correct: Provide reset option
export default function Error({ error, reset }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Mistake 3: Catching All Errors at Root
```typescript
// ❌ Wrong: Only root error boundary
// app/error.tsx handles all errors
```
**Why**: Can't provide specific error handling for different sections.

```typescript
// ✅ Correct: Nested error boundaries
// app/error.tsx - General errors
// app/blog/error.tsx - Blog-specific errors
// app/dashboard/error.tsx - Dashboard-specific errors
```

## ✨ Best Practices

1. **Create error.tsx**: Add error boundaries for all route segments
2. **Use 'use client'**: Error boundaries must be Client Components
3. **Provide reset**: Always include reset functionality
4. **Log errors**: Log errors for debugging and monitoring
5. **Nest boundaries**: Create specific error handling for sections
6. **User-friendly messages**: Show helpful error messages
7. **Recovery options**: Provide ways to recover from errors

## 🔗 Related Concepts

- [Pages](./pages.md) - Creating pages
- [Loading States](./loading-states.md) - Loading UI
- [Error Handling](../26-error-handling/README.md) - General error handling

## 📚 Resources

### Official Documentation
- [Error Handling](https://nextjs.org/docs/app/api-reference/file-conventions/error)
- [Error Boundaries](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

## 🧪 Practice Exercises

### Exercise 1: Add Error Boundaries
**Difficulty**: Beginner  
**Goal**: Understand basic error handling  
**Instructions**:
1. Create root error.tsx
2. Create section-specific error boundaries
3. Add reset functionality
4. Test error handling

### Exercise 2: Advanced Error Handling
**Difficulty**: Intermediate  
**Goal**: Practice error logging and recovery  
**Instructions**:
1. Add error logging
2. Create conditional error handling
3. Add retry logic
4. Test different error scenarios

## 🎓 Key Takeaways

- Error boundaries created with `error.tsx` files
- Must be Client Components (`'use client'`)
- Automatically catch errors in route segments
- Can be nested for granular error handling
- Always provide reset functionality
- Log errors for debugging
- Show user-friendly error messages

## ❓ FAQ

### Q: Do error boundaries need 'use client'?
**A**: Yes, error boundaries must be Client Components.

### Q: Can I have multiple error boundaries?
**A**: Yes, create nested `error.tsx` files for different route segments.

### Q: What errors do error boundaries catch?
**A**: Errors in Server Components, Client Components, and during rendering.

### Q: How does reset work?
**A**: The reset function attempts to re-render the error boundary's children.

### Q: Should I log errors?
**A**: Yes, log errors for debugging and monitoring in production.

---

**Next Steps**: 
- Review: [Pages](./pages.md) for creating pages
- Practice: Add error boundaries to your app
- Build: Create comprehensive error handling system

