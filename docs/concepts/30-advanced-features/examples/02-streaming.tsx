// Example 2: Streaming
// Demonstrates streaming with Suspense

import { Suspense } from 'react'

// ============================================
// Example 1: Basic Streaming
// File: app/dashboard/page.tsx
// ============================================

async function UserProfile() {
  // Simulate slow data fetch
  await new Promise(resolve => setTimeout(resolve, 2000))
  const user = { name: 'John Doe', email: 'john@example.com' }
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

async function UserStats() {
  // Simulate slow data fetch
  await new Promise(resolve => setTimeout(resolve, 1500))
  const stats = { posts: 42, followers: 1234 }
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Stats</h2>
      <p>Posts: {stats.posts}</p>
      <p>Followers: {stats.followers}</p>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        <Suspense fallback={<div className="p-4 border rounded">Loading profile...</div>}>
          <UserProfile />
        </Suspense>
        <Suspense fallback={<div className="p-4 border rounded">Loading stats...</div>}>
          <UserStats />
        </Suspense>
      </div>
    </div>
  )
}

// ============================================
// Example 2: Streaming with Error Boundaries
// File: app/products/page.tsx
// ============================================

async function ProductList() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  const products = await res.json()
  
  return (
    <ul className="space-y-2">
      {products.map((product: { id: string; name: string }) => (
        <li key={product.id} className="p-2 border rounded">
          {product.name}
        </li>
      ))}
    </ul>
  )
}

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  )
}

// ============================================
// Example 3: Progressive Loading
// File: app/blog/page.tsx
// ============================================

async function BlogPosts() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const posts = [
    { id: '1', title: 'Post 1', excerpt: 'Excerpt 1' },
    { id: '2', title: 'Post 2', excerpt: 'Excerpt 2' }
  ]
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

async function BlogSidebar() {
  await new Promise(resolve => setTimeout(resolve, 500))
  const categories = ['Tech', 'Design', 'Business']
  
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Categories</h3>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        <Suspense fallback={<div>Loading posts...</div>}>
          <BlogPosts />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <BlogSidebar />
        </Suspense>
      </div>
    </div>
  )
}

// ============================================
// Example 4: Streaming with Loading States
// File: app/components/StreamingCard.tsx
// ============================================

function LoadingCard() {
  return (
    <div className="p-4 border rounded animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}

async function DataCard({ delay }: { delay: number }) {
  await new Promise(resolve => setTimeout(resolve, delay))
  const data = { title: 'Card Title', content: 'Card content' }
  
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">{data.title}</h3>
      <p className="text-gray-600">{data.content}</p>
    </div>
  )
}

export function StreamingCards() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<LoadingCard />}>
        <DataCard delay={1000} />
      </Suspense>
      <Suspense fallback={<LoadingCard />}>
        <DataCard delay={1500} />
      </Suspense>
      <Suspense fallback={<LoadingCard />}>
        <DataCard delay={2000} />
      </Suspense>
    </div>
  )
}

