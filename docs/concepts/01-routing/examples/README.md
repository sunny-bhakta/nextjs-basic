# Routing Examples

This directory contains practical code examples demonstrating Next.js routing concepts.

## Examples

### 1. Basic Routing (`01-basic-routing.tsx`)
Demonstrates file-based routing with:
- Root route (`/`)
- Simple routes (`/about`, `/contact`)
- Nested routes (`/products/featured`)

### 2. Dynamic Routes (`02-dynamic-routes.tsx`)
Shows how to create dynamic routes with:
- Single dynamic segment (`[slug]`)
- Multiple dynamic segments (`[category]/[product]`)
- Accessing route parameters

### 3. Catch-All Routes (`03-catch-all-routes.tsx`)
Demonstrates:
- Catch-all routes (`[...slug]`)
- Optional catch-all routes (`[[...slug]]`)
- Handling multiple route segments

### 4. Navigation with Link (`04-navigation-link.tsx`)
Examples of using the `Link` component:
- Basic navigation
- Styled navigation
- Dynamic route navigation
- Query parameters
- Disabling prefetch

### 5. Programmatic Navigation (`05-navigation-userouter.tsx`)
Shows `useRouter` hook usage:
- Basic navigation with `router.push()`
- Replace navigation with `router.replace()`
- Back/forward navigation
- Page refresh
- Form submission with navigation
- Conditional navigation

### 6. Route Groups (`06-route-groups.tsx`)
Demonstrates organizing routes:
- Marketing layout group
- Dashboard layout group
- How route groups don't affect URLs

### 7. Route Handlers (`07-route-handlers.tsx`)
API route examples:
- Basic GET endpoint
- POST endpoint with JSON body
- Dynamic route handlers
- Query parameters
- Form data handling
- Headers and cookies

### 8. Complete Example (`08-complete-example.tsx`)
A comprehensive example combining:
- Multiple routing concepts
- Navigation components
- Dynamic routes
- Search functionality
- Multiple dynamic segments

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Run your Next.js app** and test the routes
4. **Modify and experiment** with the examples

## File Structure

When implementing these examples, your `app/` directory should look like:

```
app/
├── page.tsx                    # Home page (/)
├── about/
│   └── page.tsx                # About page (/about)
├── blog/
│   ├── page.tsx                # Blog listing (/blog)
│   └── [slug]/
│       └── page.tsx            # Blog post (/blog/[slug])
├── products/
│   ├── page.tsx                # Products listing (/products)
│   └── [category]/
│       └── [id]/
│           └── page.tsx        # Product detail (/products/[category]/[id])
└── api/
    ├── hello/
    │   └── route.ts            # GET /api/hello
    └── users/
        ├── route.ts            # GET, POST /api/users
        └── [id]/
            └── route.ts         # GET, PUT, DELETE /api/users/[id]
```

## Testing the Examples

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the routes in your browser:
   - `http://localhost:3000` - Home page
   - `http://localhost:3000/about` - About page
   - `http://localhost:3000/blog/my-post` - Dynamic blog post
   - `http://localhost:3000/api/hello` - API endpoint

3. Test navigation:
   - Click links to see client-side navigation
   - Use browser back/forward buttons
   - Check the network tab to see prefetching

## Next Steps

After trying these examples:
1. Modify them to fit your needs
2. Combine concepts from different examples
3. Create your own routing patterns
4. Explore the [detailed guides](../README.md) for more information

