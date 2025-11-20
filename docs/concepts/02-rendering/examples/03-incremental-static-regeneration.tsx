// Example 3: Incremental Static Regeneration (ISR)
// Pages are statically generated but can be regenerated in the background
// Best for: Content that updates periodically but doesn't need to be real-time

// app/blog/[slug]/page.tsx - ISR with revalidation
// Page is statically generated but regenerated every 60 seconds

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Revalidate post list every hour
  }).then(res => res.json())
  
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
      <p><em>This page uses ISR - regenerated every 60 seconds</em></p>
      <p>Last generated: {new Date().toISOString()}</p>
    </article>
  )
}

// app/products/[id]/page.tsx - ISR with longer revalidation
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  return res.json()
}

export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 86400 } // Revalidate product list daily
  }).then(res => res.json())
  
  return products.map((product: { id: string }) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p><em>ISR - regenerated every hour</em></p>
    </div>
  )
}

// app/stats/page.tsx - ISR with on-demand revalidation
// This page can be revalidated manually via API route

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 300 } // Revalidate every 5 minutes
  })
  
  return res.json()
}

export default async function StatsPage() {
  const stats = await getStats()
  
  return (
    <div>
      <h1>Statistics (ISR)</h1>
      <p>This page regenerates every 5 minutes</p>
      <div>
        <p>Total Views: {stats.totalViews}</p>
        <p>Active Users: {stats.activeUsers}</p>
        <p>Last Updated: {new Date(stats.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  )
}

// app/api/revalidate/route.ts - On-demand revalidation endpoint
// Call this to manually revalidate a page
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { path } = await request.json()
  
  revalidatePath(path) // Revalidate the specified path
  
  return Response.json({ revalidated: true, path })
}

// Usage: POST /api/revalidate with body: { "path": "/stats" }

