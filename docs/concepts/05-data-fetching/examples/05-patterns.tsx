// Example 5: Data Fetching Patterns
// Demonstrates common patterns and best practices

// app/products/page.tsx - Hybrid Pattern: Server Data + Client Interactivity
import ProductFilter from './components/product-filter'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  })
  return res.json()
}

export default async function ProductsPage() {
  // Fetch on server
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      {/* Pass data to client component */}
      <ProductFilter initialProducts={products} />
    </div>
  )
}

// app/products/components/product-filter.tsx - Client Component
'use client'

import { useState, useMemo } from 'react'

export default function ProductFilter({ initialProducts }: { initialProducts: any[] }) {
  const [filter, setFilter] = useState('all')
  
  // Filter on client using server data
  const filtered = useMemo(() => {
    if (filter === 'all') return initialProducts
    return initialProducts.filter(p => p.category === filter)
  }, [initialProducts, filter])
  
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <ul>
        {filtered.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

// app/dashboard/page.tsx - Parallel Fetching Pattern
async function getUserData() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  })
  return res.json()
}

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 }
  })
  return res.json()
}

async function getActivity() {
  const res = await fetch('https://api.example.com/activity', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function DashboardPage() {
  // Fetch all in parallel
  const [user, stats, activity] = await Promise.all([
    getUserData(),
    getStats(),
    getActivity()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo user={user} />
      <StatsDisplay stats={stats} />
      <ActivityFeed activity={activity} />
    </div>
  )
}

// app/blog/page.tsx - Error Boundary Pattern
async function getPosts() {
  try {
    const res = await fetch('https://api.example.com/posts', {
      cache: 'force-cache'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    return res.json()
  } catch (error) {
    // Return empty array instead of throwing
    // Let error boundary handle if needed
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  if (posts.length === 0) {
    return <div>No posts available</div>
  }
  
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

// app/dashboard/page.tsx - Streaming Pattern with Suspense
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'

function StatsLoading() {
  return <div>Loading stats...</div>
}

function ActivityLoading() {
  return <div>Loading activity...</div>
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsLoading />}>
        <UserStats />
      </Suspense>
      
      <Suspense fallback={<ActivityLoading />}>
        <RecentActivity />
      </Suspense>
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
    <div>
      <h2>Stats</h2>
      <p>Total: {stats.total}</p>
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
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {activity.map((item: { id: number; description: string }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  )
}

// app/search/page.tsx - Conditional Fetching Pattern
interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

async function search(query: string, category?: string) {
  const url = new URL('https://api.example.com/search')
  url.searchParams.set('q', query)
  if (category) {
    url.searchParams.set('category', category)
  }
  
  const res = await fetch(url.toString(), {
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const category = searchParams.category
  
  // Conditional fetching
  const results = query ? await search(query, category) : []
  
  return (
    <div>
      <h1>Search</h1>
      {query && (
        <div>
          <p>Results for: {query}</p>
          {category && <p>Category: {category}</p>}
          <ul>
            {results.map((result: { id: number; title: string }) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// app/products/page.tsx - Optimistic Updates Pattern
'use client'

import { useState } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [updating, setUpdating] = useState<number | null>(null)
  
  const toggleFavorite = async (productId: number) => {
    const product = products.find((p: any) => p.id === productId)
    if (!product) return
    
    // Optimistic update
    setUpdating(productId)
    setProducts(prev => prev.map((p: any) =>
      p.id === productId ? { ...p, favorite: !p.favorite } : p
    ))
    
    try {
      const res = await fetch(`/api/products/${productId}/favorite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: !product.favorite })
      })
      
      if (!res.ok) {
        // Revert on error
        setProducts(prev => prev.map((p: any) =>
          p.id === productId ? { ...p, favorite: product.favorite } : p
        ))
        throw new Error('Failed to update')
      }
    } catch (error) {
      // Revert on error
      setProducts(prev => prev.map((p: any) =>
        p.id === productId ? { ...p, favorite: product.favorite } : p
      ))
      alert('Failed to update favorite')
    } finally {
      setUpdating(null)
    }
  }
  
  return (
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>
          {product.name}
          <button
            onClick={() => toggleFavorite(product.id)}
            disabled={updating === product.id}
          >
            {product.favorite ? '❤️' : '🤍'}
          </button>
        </li>
      ))}
    </ul>
  )
}

