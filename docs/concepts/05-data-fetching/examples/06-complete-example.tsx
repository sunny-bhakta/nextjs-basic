// Example 6: Complete Data Fetching Example
// A comprehensive example combining all data fetching concepts

// app/products/page.tsx - Server Component with data fetching
import ProductList from './components/product-list'
import ProductSearch from './components/product-search'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  return res.json()
}

export default async function ProductsPage() {
  // Fetch on server
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      <p>Products fetched on server, cached for 1 hour</p>
      
      {/* Client component for search */}
      <ProductSearch initialProducts={products} />
      
      {/* Client component for list with filtering */}
      <ProductList initialProducts={products} />
    </div>
  )
}

// app/products/components/product-list.tsx - Client Component with filtering
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
  
  const filteredAndSorted = useMemo(() => {
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
        {filteredAndSorted.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// app/products/components/product-card.tsx - Client Component with Server Action
'use client'

import { addToCart } from '@/app/actions'
import { useState, useTransition } from 'react'

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isPending, startTransition] = useTransition()
  const [quantity, setQuantity] = useState(1)
  
  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(async () => {
      await addToCart(product.id, quantity)
      alert('Added to cart!')
      setQuantity(1)
    })
  }
  
  return (
    <div className="border rounded p-4">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-lg">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      
      <form onSubmit={handleAddToCart} className="mt-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="border p-1 rounded w-20"
        />
        <button
          type="submit"
          disabled={isPending}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add to Cart'}
        </button>
      </form>
    </div>
  )
}

// app/products/components/product-search.tsx - Client Component with debounced search
'use client'

import { useState, useEffect, useCallback } from 'react'

interface ProductSearchProps {
  initialProducts: any[]
}

export default function ProductSearch({ initialProducts }: ProductSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    setLoading(true)
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [query, performSearch])
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded w-full"
      />
      
      {loading && <p>Searching...</p>}
      
      {results.length > 0 && (
        <div className="mt-2 border rounded p-2">
          <p className="font-bold">Search Results:</p>
          <ul>
            {results.map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// app/actions.ts - Server Actions
'use server'

import { revalidatePath } from 'next/cache'

export async function addToCart(productId: number, quantity: number) {
  // Add to cart logic
  await addItemToCart(productId, quantity)
  
  // Revalidate cart page
  revalidatePath('/cart')
  
  return { success: true }
}

export async function createProduct(data: {
  name: string
  price: number
  category: string
}) {
  // Validate
  if (!data.name || !data.price || !data.category) {
    return { error: 'All fields are required' }
  }
  
  // Create product
  const product = await createProductInDb(data)
  
  // Revalidate products page
  revalidatePath('/products')
  
  return { success: true, product }
}

// app/dashboard/page.tsx - Dashboard with streaming
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'
import LiveMetrics from './components/live-metrics'

function StatsLoading() {
  return <div className="p-4 border rounded animate-pulse">Loading stats...</div>
}

function ActivityLoading() {
  return <div className="p-4 border rounded animate-pulse">Loading activity...</div>
}

function MetricsLoading() {
  return <div className="p-4 border rounded animate-pulse">Loading metrics...</div>
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Data streams in as it becomes available</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<StatsLoading />}>
          <UserStats />
        </Suspense>
        
        <Suspense fallback={<ActivityLoading />}>
          <RecentActivity />
        </Suspense>
      </div>
      
      <Suspense fallback={<MetricsLoading />}>
        <LiveMetrics />
      </Suspense>
    </div>
  )
}

// app/dashboard/components/user-stats.tsx - Server Component
async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store' // Fresh data
  })
  return res.json()
}

export default async function UserStats() {
  const stats = await getStats()
  
  return (
    <div className="p-4 border rounded">
      <h2>User Stats</h2>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Active Users: {stats.activeUsers}</p>
    </div>
  )
}

// app/dashboard/components/recent-activity.tsx - Server Component
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
      <h2>Recent Activity</h2>
      <ul>
        {activity.map((item: { id: number; description: string }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  )
}

// app/dashboard/components/live-metrics.tsx - Client Component with polling
'use client'

import { useState, useEffect } from 'react'

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics')
        const data = await res.json()
        setMetrics(data)
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      }
    }
    
    // Initial fetch
    fetchMetrics()
    
    // Poll every 5 seconds
    const interval = setInterval(fetchMetrics, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  if (!metrics) return <div>Loading metrics...</div>
  
  return (
    <div className="p-4 border rounded">
      <h2>Live Metrics</h2>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
      <p>Requests: {metrics.requests}</p>
      <p>Errors: {metrics.errors}</p>
      <p>Response Time: {metrics.responseTime}ms</p>
    </div>
  )
}

// Summary:
// - Server Component fetching for initial data
// - Client Component fetching for interactivity
// - Server Actions for mutations
// - Different caching strategies
// - Streaming with Suspense
// - Real-time updates with polling
// - Optimistic updates
// - Error handling

