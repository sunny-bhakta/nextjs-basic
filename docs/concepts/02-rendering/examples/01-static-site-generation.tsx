// Example 1: Static Site Generation (SSG)
// Pages are pre-rendered at build time and served as static HTML
// Best for: Content that doesn't change often (blog posts, documentation, landing pages)

// app/products/page.tsx - Static page (default behavior in App Router)
// This page is statically generated at build time

async function getProducts() {
  // Simulate fetching products from a database or API
  // This runs at BUILD TIME, not request time
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Cache the response
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products (Static)</h1>
      <p>This page was generated at build time</p>
      <ul>
        {products.map((product: { id: number; name: string }) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/[slug]/page.tsx - Static page with dynamic routes
// Use generateStaticParams to pre-render all possible paths

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><em>This page was statically generated at build time</em></p>
    </article>
  )
}

// app/about/page.tsx - Simple static page
// No data fetching needed, just static content

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a static page with no data fetching.</p>
      <p>It's generated at build time and served as static HTML.</p>
    </div>
  )
}

// Metadata for static pages
export const metadata = {
  title: 'Products - Static Page',
  description: 'Our product catalog, statically generated',
}

