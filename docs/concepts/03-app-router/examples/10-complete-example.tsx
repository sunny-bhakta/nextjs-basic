// Example 10: Complete App Router Example
// A comprehensive example combining all App Router concepts

// app/layout.tsx - Root layout with metadata
import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/navigation'
import Footer from './components/footer'

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A complete Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/components/navigation.tsx - Server Component
export default function Navigation() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="flex gap-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/blog" className="hover:underline">Blog</a>
        <a href="/products" className="hover:underline">Products</a>
        <a href="/dashboard" className="hover:underline">Dashboard</a>
      </div>
    </nav>
  )
}

// app/components/footer.tsx - Server Component
export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p>© 2024 My App. All rights reserved.</p>
    </footer>
  )
}

// app/page.tsx - Home page
import type { Metadata } from 'next'
import Counter from './components/counter'

export const metadata: Metadata = {
  title: 'Home - My App',
  description: 'Welcome to my Next.js app',
}

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg mb-4">This is the home page</p>
      
      {/* Client component for interactivity */}
      <Counter />
    </div>
  )
}

// app/components/counter.tsx - Client Component
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">Interactive Counter</h2>
      <p className="text-3xl mb-4">{count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

// app/blog/layout.tsx - Blog section layout
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="blog-layout">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-2">Categories</h2>
        <ul>
          <li><a href="/blog/tech">Tech</a></li>
          <li><a href="/blog/design">Design</a></li>
          <li><a href="/blog/business">Business</a></li>
        </ul>
      </aside>
      <article className="flex-1 p-4">{children}</article>
    </div>
  )
}

// app/blog/loading.tsx - Blog loading state
export default function BlogLoading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

// app/blog/page.tsx - Blog listing with Suspense
import { Suspense } from 'react'
import PostList from './components/post-list'

function PostListLoading() {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      
      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </div>
  )
}

// app/blog/components/post-list.tsx - Server Component
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 300 }
  })
  return res.json()
}

export default async function PostList() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map((post: { id: number; title: string; excerpt: string; slug: string }) => (
        <article key={post.id} className="mb-6 p-4 border rounded">
          <h2 className="text-2xl font-bold mb-2">
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

// app/blog/[slug]/loading.tsx - Post loading
export default function PostLoading() {
  return (
    <div>
      <div className="h-12 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  )
}

// app/blog/[slug]/error.tsx - Post error boundary
'use client'

export default function PostError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Error loading post</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
        <a
          href="/blog"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back to Blog
        </a>
      </div>
    </div>
  )
}

// app/blog/[slug]/page.tsx - Blog post page
import type { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 300 }
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article className="p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose">
        <p>{post.content}</p>
      </div>
      <a href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
        ← Back to Blog
      </a>
    </article>
  )
}

// app/products/page.tsx - Products with hybrid approach
import ProductList from './components/product-list'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <p>Products fetched on server, filtering on client</p>
      
      <ProductList initialProducts={products} />
    </div>
  )
}

// app/products/components/product-list.tsx - Client Component
'use client'

import { useState, useMemo } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

interface ProductListProps {
  initialProducts: Product[]
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  const filtered = useMemo(() => {
    let products = initialProducts
    
    if (filter !== 'all') {
      products = products.filter(p => p.category === filter)
    }
    
    return [...products].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.price - b.price
    })
  }, [initialProducts, filter, sortBy])
  
  const categories = Array.from(new Set(initialProducts.map(p => p.category)))
  
  return (
    <div>
      <div className="mb-4 flex gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="border rounded p-4">
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// app/dashboard/page.tsx - Dashboard with streaming
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'

function StatsLoading() {
  return <div className="p-4 border rounded animate-pulse">Loading stats...</div>
}

function ActivityLoading() {
  return <div className="p-4 border rounded animate-pulse">Loading activity...</div>
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Suspense fallback={<StatsLoading />}>
          <UserStats />
        </Suspense>
        
        <Suspense fallback={<ActivityLoading />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  )
}

// app/dashboard/components/user-stats.tsx
async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function UserStats() {
  const stats = await getStats()
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">User Stats</h2>
      <p>Total: {stats.total}</p>
      <p>Active: {stats.active}</p>
    </div>
  )
}

// app/dashboard/components/recent-activity.tsx
async function getActivity() {
  const res = await fetch('https://api.example.com/activity', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function RecentActivity() {
  const activity = await getActivity()
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
      <ul>
        {activity.map((item: { id: number; description: string }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  )
}

// Summary:
// - Root layout with navigation and footer
// - Home page with client-side counter
// - Blog section with layout, loading, error boundaries
// - Products page with hybrid approach (server data + client filtering)
// - Dashboard with streaming (Suspense)
// - All using App Router patterns

