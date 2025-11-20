# Caching Examples

This directory contains practical code examples demonstrating caching strategies in Next.js.

## Examples

### 1. Static Caching (`01-static-caching.tsx`)
Demonstrates static caching:
- Force cache strategy
- Build-time caching
- Static page generation

### 2. ISR Caching (`02-isr-caching.tsx`)
Shows ISR with revalidation:
- Time-based revalidation
- Incremental Static Regeneration
- Revalidation intervals

### 3. Cache Revalidation (`03-cache-revalidation.tsx`)
Demonstrates cache revalidation:
- On-demand revalidation
- Tag-based revalidation
- Path revalidation

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Run your Next.js app**: `npm run dev`
4. **Test caching behavior**:
   - Build the app to see static caching
   - Check revalidation timing
   - Test on-demand revalidation

## Key Concepts

### Static Caching
- Cache at build time
- Use `cache: 'force-cache'`
- Best for static content

### ISR (Incremental Static Regeneration)
- Revalidate on a schedule
- Use `next: { revalidate: 60 }`
- Best for periodically updated content

### Dynamic Fetching
- Fetch fresh every time
- Use `cache: 'no-store'`
- Best for real-time data

### On-Demand Revalidation
- Revalidate when needed
- Use `revalidateTag` or `revalidatePath`
- Best for content updates

## Best Practices

1. **Specify cache strategy**: Always be explicit
2. **Match strategy to data**: Static for static, dynamic for dynamic
3. **Set reasonable revalidation**: Not too frequent, not too rare
4. **Use tags**: For flexible revalidation
5. **Revalidate after mutations**: Keep cache in sync

