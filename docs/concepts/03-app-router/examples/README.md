# App Router Examples

This directory contains practical code examples demonstrating Next.js App Router concepts.

## Examples

### 1. Basic Structure (`01-basic-structure.tsx`)
Demonstrates fundamental App Router structure:
- Root layout (`app/layout.tsx`)
- Home page (`app/page.tsx`)
- Simple routes (`/about`, `/contact`)

### 2. Layouts (`02-layouts.tsx`)
Shows layout patterns:
- Root layout
- Nested layouts
- Route group layouts
- Layout persistence

### 3. Pages (`03-pages.tsx`)
Demonstrates page creation:
- Pages with metadata
- Pages with data fetching
- Dynamic routes
- Search params

### 4. Loading States (`04-loading-states.tsx`)
Shows loading UI:
- Root loading state
- Section-specific loading
- Skeleton loaders
- Suspense boundaries

### 5. Error Boundaries (`05-error-boundaries.tsx`)
Demonstrates error handling:
- Root error boundary
- Section-specific errors
- Error recovery
- Retry logic

### 6. Server Components (`06-server-components.tsx`)
Shows Server Component patterns:
- Data fetching
- Parallel fetching
- Database access
- File system access
- Environment variables

### 7. Client Components (`07-client-components.tsx`)
Demonstrates Client Component patterns:
- Interactive components
- Data fetching with useEffect
- Context providers
- Local state management
- Real-time updates

### 8. Streaming (`08-streaming.tsx`)
Shows streaming with Suspense:
- Multiple Suspense boundaries
- Nested Suspense
- Progressive rendering
- Loading states per component

### 9. Hybrid Components (`09-hybrid-components.tsx`)
Demonstrates combining Server and Client:
- Server data + Client filtering
- Server data + Client interactivity
- Real-time updates with server data

### 10. Complete Example (`10-complete-example.tsx`)
A comprehensive example combining:
- All App Router concepts
- Layouts, pages, loading, errors
- Server and Client Components
- Streaming
- Hybrid patterns

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Run your Next.js app**: `npm run dev`
4. **Test different features**:
   - Navigate between pages
   - Test loading states
   - Trigger errors
   - Test interactivity

## File Structure

When implementing these examples, your `app/` directory should look like:

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page (/)
├── loading.tsx                  # Root loading
├── error.tsx                     # Root error boundary
├── components/
│   ├── navigation.tsx           # Navigation component
│   ├── counter.tsx              # Client component
│   └── ...
├── about/
│   └── page.tsx                 # /about
├── blog/
│   ├── layout.tsx               # Blog layout
│   ├── page.tsx                 # /blog
│   ├── loading.tsx              # Blog loading
│   ├── error.tsx                # Blog error
│   ├── [slug]/
│   │   ├── page.tsx             # /blog/[slug]
│   │   ├── loading.tsx          # Post loading
│   │   └── error.tsx            # Post error
│   └── components/
│       └── post-list.tsx        # Server component
├── products/
│   ├── page.tsx                 # /products
│   └── components/
│       └── product-filter.tsx   # Client component
└── dashboard/
    ├── page.tsx                 # /dashboard
    └── components/
        ├── user-stats.tsx       # Server component
        └── dashboard-widgets.tsx # Client component
```

## Key Concepts Demonstrated

### Server Components (Default)
- Fetch data directly with async/await
- Access databases and file system
- No client-side JavaScript
- Better performance and SEO

### Client Components (`'use client'`)
- Interactive features
- React hooks (useState, useEffect)
- Browser APIs
- Event handlers

### Layouts
- Shared UI across pages
- Persist across navigation
- Can be nested
- Must render `children`

### Loading States
- Created with `loading.tsx`
- Automatically shown during data fetching
- Can be nested
- Should match page structure

### Error Boundaries
- Created with `error.tsx`
- Must be Client Components
- Catch errors in route segments
- Provide reset functionality

### Streaming
- Use Suspense boundaries
- Progressive rendering
- Show content as it becomes available
- Better perceived performance

## Testing the Examples

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit routes in your browser:
   - `http://localhost:3000` - Home page
   - `http://localhost:3000/blog` - Blog listing
   - `http://localhost:3000/products` - Products with filtering
   - `http://localhost:3000/dashboard` - Dashboard with streaming

3. Test features:
   - Navigate between pages (layouts persist)
   - Wait for loading states
   - Trigger errors to see error boundaries
   - Test interactive components

## Next Steps

After trying these examples:
1. Modify them to fit your needs
2. Combine concepts from different examples
3. Create your own patterns
4. Explore the [detailed guides](../README.md) for more information

