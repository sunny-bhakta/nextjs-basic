// Example 4: Fetch API with Caching
// Demonstrates different caching strategies with fetch

// app/blog/page.tsx - Static caching (force-cache)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Cache at build time
  })
  
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// app/dashboard/page.tsx - Dynamic fetching (no-store)
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store' // Don't cache, fetch fresh every time
  })
  
  return res.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}

// app/blog/[slug]/page.tsx - Time-based revalidation (ISR)
async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  return res.json()
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

// app/products/[id]/page.tsx - Tag-based revalidation
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['products', `product-${id}`] // Tag for on-demand revalidation
    }
  })
  
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}

// app/api/revalidate/route.ts - On-demand revalidation
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  
  revalidateTag(tag) // Revalidate all requests with this tag
  
  return Response.json({ revalidated: true })
}

// app/admin/page.tsx - Fetch with headers
async function getAdminData() {
  const res = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function AdminPage() {
  const data = await getAdminData()
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}

// app/lib/fetch-with-timeout.ts - Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 5000
) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return res
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

// Usage
async function getData() {
  const res = await fetchWithTimeout('https://api.example.com/data', {}, 5000)
  return res.json()
}

// app/products/page.tsx - Multiple fetch strategies
async function getFeaturedProducts() {
  // Static - cache at build time
  const res = await fetch('https://api.example.com/products/featured', {
    cache: 'force-cache'
  })
  return res.json()
}

async function getRecentProducts() {
  // ISR - revalidate every 5 minutes
  const res = await fetch('https://api.example.com/products/recent', {
    next: { revalidate: 300 }
  })
  return res.json()
}

async function getPopularProducts() {
  // Dynamic - fresh on each request
  const res = await fetch('https://api.example.com/products/popular', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function ProductsPage() {
  const [featured, recent, popular] = await Promise.all([
    getFeaturedProducts(),
    getRecentProducts(),
    getPopularProducts()
  ])
  
  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Featured</h2>
        <ul>
          {featured.map((product: { id: number; name: string }) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Recent</h2>
        <ul>
          {recent.map((product: { id: number; name: string }) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Popular</h2>
        <ul>
          {popular.map((product: { id: number; name: string }) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

