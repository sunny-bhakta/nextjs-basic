// Example 3: Catch-All Routes
// Demonstrates catch-all and optional catch-all routes

// app/docs/[...slug]/page.tsx - Catch-all route
// Matches: /docs/getting-started, /docs/guides/installation, etc.
// Does NOT match: /docs (use optional catch-all for this)

interface DocsPageProps {
  params: {
    slug: string[] // Array because it can match multiple segments
  }
}

export default function DocsPage({ params }: DocsPageProps) {
  const path = params.slug.join('/')
  
  return (
    <div>
      <h1>Documentation</h1>
      <p>Path: {path}</p>
      <p>Full URL: /docs/{path}</p>
      <ul>
        {params.slug.map((segment, index) => (
          <li key={index}>Segment {index + 1}: {segment}</li>
        ))}
      </ul>
    </div>
  )
}

// app/shop/[[...slug]]/page.tsx - Optional catch-all route
// Matches: /shop, /shop/electronics, /shop/electronics/laptops

interface ShopPageProps {
  params: {
    slug?: string[] // Optional because it can match /shop with no segments
  }
}

export default function ShopPage({ params }: ShopPageProps) {
  // Handle the case when /shop is accessed directly
  if (!params.slug || params.slug.length === 0) {
    return (
      <div>
        <h1>Shop Home</h1>
        <p>Browse all products</p>
      </div>
    )
  }
  
  const path = params.slug.join('/')
  
  return (
    <div>
      <h1>Shop Category</h1>
      <p>Path: {path}</p>
      <p>Full URL: /shop/{path}</p>
    </div>
  )
}

