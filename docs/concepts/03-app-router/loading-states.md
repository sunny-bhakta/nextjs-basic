# Loading States

> **Category**: Core | **Related Concepts**: [Pages](./pages.md), [Streaming](./streaming.md)  
> **Last Updated**: 2024

## 📖 Overview

Loading states in the App Router are created using `loading.tsx` files. These files automatically show loading UI while page content is being fetched, providing instant feedback to users and improving perceived performance.

**Key Points:**
- Created with `loading.tsx` files
- Automatically shown during data fetching
- Instant loading feedback
- Can be nested for granular control
- Works with Suspense boundaries

## 🎯 When to Use

- **Data Fetching**: Show loading while fetching data
- **Route Transitions**: Display during navigation
- **Better UX**: Provide instant feedback
- **Nested Loading**: Different loading states for different sections
- **Streaming**: Works with React Suspense

## 💻 Basic Example

### Simple Loading State

```typescript
// app/loading.tsx - Root loading state
export default function Loading() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}
```

### Styled Loading Component

```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-4">Loading...</p>
    </div>
  )
}
```

### Nested Loading States

```typescript
// app/blog/loading.tsx - Loading for blog section
export default function BlogLoading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  )
}

// app/blog/[slug]/loading.tsx - Loading for individual post
export default function PostLoading() {
  return (
    <div>
      <div className="h-12 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  )
}
```

## 🔧 Advanced Example

### Skeleton Loading

```typescript
// app/products/loading.tsx
export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="border rounded-lg p-4">
          <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}
```

### Loading with Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'

function StatsLoading() {
  return <div>Loading stats...</div>
}

function ActivityLoading() {
  return <div>Loading activity...</div>
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
    </div>
  )
}
```

### Route-Specific Loading

```typescript
// app/shop/loading.tsx - Loading for /shop
export default function ShopLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading shop...</p>
      </div>
    </div>
  )
}

// app/shop/products/loading.tsx - Loading for /shop/products
export default function ProductsLoading() {
  return (
    <div>
      <div className="h-10 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Simple Spinner
```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```
**When to use**: Basic loading indicator

### Pattern 2: Skeleton UI
```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
}
```
**When to use**: Better UX with content placeholders

### Pattern 3: Nested Loading
```typescript
// app/blog/loading.tsx
export default function BlogLoading() {
  return <div>Loading blog...</div>
}

// app/blog/[slug]/loading.tsx
export default function PostLoading() {
  return <div>Loading post...</div>
}
```
**When to use**: Different loading states for nested routes

## ⚠️ Common Mistakes

### Mistake 1: Not Creating loading.tsx
```typescript
// ❌ Wrong: No loading state
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await getPosts() // No loading UI shown
  return <div>{posts.map(...)}</div>
}
```
**Why**: Users see blank screen during data fetching.

```typescript
// ✅ Correct: Add loading.tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>
}
```

### Mistake 2: Complex Loading Logic
```typescript
// ❌ Wrong: Complex logic in loading component
export default function Loading() {
  const [progress, setProgress] = useState(0)
  // Loading components should be simple
}
```
**Why**: Loading components should be simple and fast.

```typescript
// ✅ Correct: Keep loading simple
export default function Loading() {
  return <div>Loading...</div>
}
```

### Mistake 3: Not Matching Page Structure
```typescript
// ❌ Wrong: Loading doesn't match page layout
// app/products/loading.tsx
export default function Loading() {
  return <div>Loading...</div> // Simple text
}

// app/products/page.tsx
export default function ProductsPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Complex grid layout */}
    </div>
  )
}
```
**Why**: Layout shift when page loads.

```typescript
// ✅ Correct: Match page structure
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-64 bg-gray-200 animate-pulse"></div>
      ))}
    </div>
  )
}
```

## ✨ Best Practices

1. **Create loading.tsx**: Add loading states for all data-fetching pages
2. **Match structure**: Loading UI should match page layout
3. **Use skeletons**: Skeleton UI provides better UX
4. **Nest loading states**: Create specific loading for nested routes
5. **Keep it simple**: Loading components should be fast and simple
6. **Use Suspense**: Combine with Suspense for granular control
7. **Add animations**: Use CSS animations for better visual feedback

## 🔗 Related Concepts

- [Pages](./pages.md) - Creating pages
- [Streaming](./streaming.md) - Progressive rendering
- [Error Boundaries](./error-boundaries.md) - Error handling

## 📚 Resources

### Official Documentation
- [Loading UI](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
- [Streaming and Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## 🧪 Practice Exercises

### Exercise 1: Add Loading States
**Difficulty**: Beginner  
**Goal**: Understand basic loading states  
**Instructions**:
1. Create loading.tsx for home page
2. Create loading.tsx for blog section
3. Add skeleton UI
4. Test loading states

### Exercise 2: Nested Loading with Suspense
**Difficulty**: Intermediate  
**Goal**: Practice nested loading and Suspense  
**Instructions**:
1. Create dashboard page with multiple data sources
2. Add Suspense boundaries
3. Create specific loading components
4. Test progressive loading

## 🎓 Key Takeaways

- Loading states created with `loading.tsx` files
- Automatically shown during data fetching
- Can be nested for granular control
- Should match page structure
- Use skeleton UI for better UX
- Works with Suspense boundaries

## ❓ FAQ

### Q: When is loading.tsx shown?
**A**: Automatically shown while the page or route segment is loading.

### Q: Can I have multiple loading states?
**A**: Yes, create nested `loading.tsx` files for different route segments.

### Q: Do loading states work with Suspense?
**A**: Yes, they work together for granular loading control.

### Q: Should loading match page layout?
**A**: Yes, matching the layout prevents layout shift and provides better UX.

### Q: Can loading components be client components?
**A**: Yes, but usually not necessary. Keep them simple Server Components.

---

**Next Steps**: 
- Review: [Streaming](./streaming.md) for progressive rendering
- Practice: Add loading states to your app
- Build: Create skeleton loading UI for complex pages

