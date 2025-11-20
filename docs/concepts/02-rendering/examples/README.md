# Rendering Strategies Examples

This directory contains practical code examples demonstrating Next.js rendering strategies.

## Examples

### 1. Static Site Generation (`01-static-site-generation.tsx`)
Demonstrates SSG with:
- Basic static pages
- Static pages with data fetching
- Dynamic routes with `generateStaticParams`
- Metadata for static pages

**When to use**: Content that doesn't change often (blog posts, documentation, landing pages)

### 2. Server-Side Rendering (`02-server-side-rendering.tsx`)
Shows SSR with:
- Pages rendered on each request
- User-specific content
- Real-time data
- Using `cache: 'no-store'` to force SSR

**When to use**: Content that changes frequently, user-specific data, real-time information

### 3. Incremental Static Regeneration (`03-incremental-static-regeneration.tsx`)
Demonstrates ISR with:
- Time-based revalidation
- On-demand revalidation
- Different revalidation intervals
- `generateStaticParams` with ISR

**When to use**: Content that updates periodically but doesn't need to be real-time

### 4. Client-Side Rendering (`04-client-side-rendering.tsx`)
Shows CSR with:
- Data fetching in `useEffect`
- Real-time updates with polling
- Interactive search
- Local state management

**When to use**: User-specific, interactive content, real-time updates

### 5. Hybrid Rendering (`05-hybrid-rendering.tsx`)
Demonstrates combining strategies:
- Static content with client-side interactivity
- SSR for some data, static for others
- ISR with client-side filtering
- Server components + client components

**When to use**: Applications with diverse content needs

### 6. Pages Router Examples (`06-pages-router-examples.tsx`)
Legacy Pages Router patterns:
- `getStaticProps` for SSG
- `getServerSideProps` for SSR
- `getStaticPaths` for dynamic routes
- Comparison with App Router

**Note**: App Router is recommended for new projects

### 7. Complete Example (`07-complete-example.tsx`)
A comprehensive example combining:
- Static pages
- ISR blog
- SSR dashboard
- CSR search
- Hybrid products page

## Rendering Strategy Comparison

| Strategy | When to Use | Performance | SEO | Data Freshness |
|----------|-------------|-------------|-----|----------------|
| **Static (SSG)** | Content doesn't change | ⚡⚡⚡ Fastest | ✅ Best | Build time |
| **ISR** | Periodic updates | ⚡⚡ Fast | ✅ Good | Configurable |
| **SSR** | Frequent changes | ⚡ Medium | ✅ Good | Every request |
| **CSR** | Interactive, user-specific | ⚡⚡ Fast | ❌ Poor | On demand |

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Run your Next.js app**: `npm run dev`
4. **Test different strategies**:
   - Check build output for static pages
   - Monitor network tab for SSR requests
   - Observe client-side updates for CSR

## Testing Different Strategies

### Test Static Generation
```bash
npm run build
# Check .next/server/app for static HTML files
```

### Test SSR
- Visit the page and check the response headers
- Look for `Cache-Control: no-store` or similar
- Check that data updates on each request

### Test ISR
- Build the app
- Visit a page
- Wait for revalidation time
- Check if content updates

### Test CSR
- Open browser DevTools
- Check Network tab for client-side requests
- Verify JavaScript is handling the rendering

## Key Concepts

### App Router (Recommended)
- **Default**: Static (SSG)
- **Force SSR**: `cache: 'no-store'` or `dynamic = 'force-dynamic'`
- **ISR**: `next: { revalidate: 60 }`
- **CSR**: Use `'use client'` and fetch in `useEffect`

### Pages Router (Legacy)
- **SSG**: `getStaticProps`
- **SSR**: `getServerSideProps`
- **ISR**: `revalidate` in `getStaticProps`
- **CSR**: No data fetching functions, use `useEffect`

## Best Practices

1. **Use Static by default** - Fastest and best for SEO
2. **Use ISR for periodic updates** - Balance between performance and freshness
3. **Use SSR sparingly** - Only when you need fresh data on every request
4. **Use CSR for interactivity** - User-specific, interactive features
5. **Combine strategies** - Use hybrid rendering for optimal performance

## Next Steps

After trying these examples:
1. Measure performance with Lighthouse
2. Compare build times and bundle sizes
3. Test SEO with different strategies
4. Experiment with revalidation intervals
5. Explore the [detailed guides](../README.md) for more information

