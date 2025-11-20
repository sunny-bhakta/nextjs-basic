# Data Fetching Examples

This directory contains practical code examples demonstrating Next.js data fetching concepts.

## Examples

### 1. Server Fetching (`01-server-fetching.tsx`)
Demonstrates Server Component data fetching:
- Basic data fetching
- Error handling
- Dynamic routes
- Parallel fetching
- Environment variables

### 2. Client Fetching (`02-client-fetching.tsx`)
Shows Client Component data fetching:
- Fetching on mount
- Fetching on user action
- Real-time polling
- Debounced search
- Infinite scroll
- Optimistic updates

### 3. Server Actions (`03-server-actions.tsx`)
Demonstrates Server Actions:
- Simple Server Actions
- Form handling with FormData
- Revalidation
- Validation with Zod
- Progressive enhancement
- useTransition hook

### 4. Fetch API (`04-fetch-api.tsx`)
Shows different caching strategies:
- Static caching (`force-cache`)
- Dynamic fetching (`no-store`)
- Time-based revalidation (ISR)
- Tag-based revalidation
- On-demand revalidation
- Fetch with headers
- Fetch with timeout

### 5. Patterns (`05-patterns.tsx`)
Demonstrates common patterns:
- Hybrid pattern (Server + Client)
- Parallel fetching
- Error boundary pattern
- Streaming with Suspense
- Conditional fetching
- Optimistic updates

### 6. Complete Example (`06-complete-example.tsx`)
A comprehensive example combining:
- All data fetching methods
- Server and Client Components
- Server Actions
- Different caching strategies
- Streaming
- Real-time updates

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Set up API routes** if needed (for client fetching examples)
4. **Run your Next.js app**: `npm run dev`
5. **Test different features**:
   - Navigate to pages with server fetching
   - Test client-side fetching
   - Submit forms with Server Actions
   - Test caching behavior

## File Structure

When implementing these examples, your `app/` directory should look like:

```
app/
├── products/
│   ├── page.tsx                 # Server Component fetching
│   └── components/
│       ├── product-list.tsx     # Client Component
│       ├── product-search.tsx   # Client Component with search
│       └── product-card.tsx     # Client Component with Server Action
├── blog/
│   ├── page.tsx                 # Server Component fetching
│   └── [slug]/
│       └── page.tsx             # Dynamic route fetching
├── dashboard/
│   ├── page.tsx                 # Streaming with Suspense
│   └── components/
│       ├── user-stats.tsx       # Server Component
│       ├── recent-activity.tsx  # Server Component
│       └── live-metrics.tsx     # Client Component with polling
├── components/
│   ├── user-profile.tsx         # Client Component fetching
│   ├── search-results.tsx       # Client Component with search
│   └── todo-list.tsx            # Client Component with optimistic updates
├── actions.ts                    # Server Actions
└── api/
    ├── user/
    │   └── route.ts             # API route for client fetching
    ├── search/
    │   └── route.ts             # Search API
    └── revalidate/
        └── route.ts             # On-demand revalidation
```

## Key Concepts Demonstrated

### Server Component Fetching
- Fetch data directly with async/await
- Runs on the server (build or request time)
- Better performance and SEO
- Can access databases, file system, APIs
- Use `cache: 'force-cache'` for static
- Use `cache: 'no-store'` for dynamic
- Use `next: { revalidate: 60 }` for ISR

### Client Component Fetching
- Use `useEffect` for data fetching
- Runs in the browser
- Good for user interactions
- Handle loading and error states
- Clean up effects to prevent memory leaks
- Use debouncing for search
- Use polling for real-time updates

### Server Actions
- Functions that run on the server
- Use `'use server'` directive
- Perfect for mutations and form submissions
- Use `revalidatePath` after mutations
- Support progressive enhancement
- Use `useTransition` for loading states

### Fetch API Caching
- `force-cache`: Cache at build time (SSG)
- `no-store`: Fetch fresh every time (SSR)
- `next: { revalidate: 60 }`: ISR (revalidate every 60 seconds)
- `next: { tags: ['tag'] }`: Tag-based revalidation
- Use `revalidateTag` for on-demand revalidation

## Testing the Examples

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit routes in your browser:
   - `http://localhost:3000/products` - Server fetching
   - `http://localhost:3000/dashboard` - Streaming
   - `http://localhost:3000/blog` - Server fetching with error handling

3. Test features:
   - Submit forms (Server Actions)
   - Search products (Client fetching)
   - Check caching behavior
   - Test real-time updates

## API Routes Needed

Some examples require API routes. Create these:

### `/api/user/route.ts`
```typescript
export async function GET() {
  return Response.json({ name: 'John', email: 'john@example.com' })
}
```

### `/api/search/route.ts`
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  
  // Search logic
  const results = await searchDatabase(q)
  
  return Response.json({ results })
}
```

### `/api/stats/route.ts`
```typescript
export async function GET() {
  return Response.json({ views: 1000, users: 500 })
}
```

## Best Practices

1. **Prefer Server Components**: Use Server Component fetching when possible
2. **Fetch in parallel**: Use `Promise.all` for independent data
3. **Choose appropriate caching**: Match cache strategy to data type
4. **Handle errors**: Always wrap in try-catch
5. **Loading states**: Show loading indicators
6. **Clean up effects**: Clear intervals and cancel requests
7. **Revalidate after mutations**: Use `revalidatePath` or `revalidateTag`

## Next Steps

After trying these examples:
1. Modify them to fit your needs
2. Combine different patterns
3. Create your own data fetching patterns
4. Explore the [detailed guides](../README.md) for more information

