// Example 5: Hybrid Rendering
// Combining different rendering strategies in a single application
// Best for: Applications with diverse content needs

// app/page.tsx - Hybrid: Static content with client-side interactivity
// Main content is static, interactive parts are client-side

import InteractiveCounter from './components/InteractiveCounter'

// This part is statically generated
export default function HomePage() {
  return (
    <div>
      <h1>Home Page (Hybrid Rendering)</h1>
      <p>This content is statically generated at build time.</p>
      
      {/* Client component for interactivity */}
      <InteractiveCounter />
      
      <section>
        <h2>Static Content</h2>
        <p>This section is pre-rendered and cached.</p>
      </section>
    </div>
  )
}

// app/components/InteractiveCounter.tsx - Client component
'use client'

import { useState } from 'react'

export default function InteractiveCounter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h3>Interactive Counter (Client-Side)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}

// app/products/page.tsx - Hybrid: Static product list with client-side filtering
import ProductList from './components/ProductList'

async function getProducts() {
  // Static data fetching
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // ISR - revalidate every hour
  })
  
  return res.json()
}

export default async function ProductsPage() {
  // Server component - statically generated with ISR
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products (Hybrid)</h1>
      <p>Product list is statically generated and regenerated hourly.</p>
      
      {/* Client component for filtering */}
      <ProductList initialProducts={products} />
    </div>
  )
}

// app/products/components/ProductList.tsx - Client component for filtering
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
    let filtered = initialProducts
    
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.category === filter)
    }
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.price - b.price
      return 0
    })
  }, [initialProducts, filter, sortBy])
  
  const categories = Array.from(new Set(initialProducts.map(p => p.category)))
  
  return (
    <div>
      <div>
        <label>Filter by category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      
      <ul>
        {filteredAndSorted.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/page.tsx - Hybrid: SSR for latest posts, static for archive
async function getLatestPosts() {
  // SSR - fetch fresh data
  const res = await fetch('https://api.example.com/posts/latest', {
    cache: 'no-store'
  })
  
  return res.json()
}

async function getArchivePosts() {
  // Static - cached at build time
  const res = await fetch('https://api.example.com/posts/archive', {
    next: { revalidate: 86400 } // Revalidate daily
  })
  
  return res.json()
}

export default async function BlogPage() {
  // Fetch both in parallel
  const [latestPosts, archivePosts] = await Promise.all([
    getLatestPosts(),
    getArchivePosts()
  ])
  
  return (
    <div>
      <section>
        <h2>Latest Posts (SSR)</h2>
        <p>Fresh content on every request</p>
        <ul>
          {latestPosts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Archive (Static/ISR)</h2>
        <p>Pre-rendered and cached, regenerated daily</p>
        <ul>
          {archivePosts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// app/dashboard/page.tsx - Hybrid: SSR for data, CSR for interactivity
import DashboardWidgets from './components/DashboardWidgets'

async function getDashboardData() {
  // SSR - user-specific data
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function DashboardPage() {
  // Server component - SSR
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard (Hybrid)</h1>
      <p>Data fetched on server for each request</p>
      
      <div>
        <h2>Server-Rendered Stats</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Revenue: ${data.revenue}</p>
      </div>
      
      {/* Client component for interactive widgets */}
      <DashboardWidgets initialData={data} />
    </div>
  )
}

// app/dashboard/components/DashboardWidgets.tsx
'use client'

import { useState } from 'react'

interface DashboardWidgetsProps {
  initialData: {
    totalUsers: number
    revenue: number
  }
}

export default function DashboardWidgets({ initialData }: DashboardWidgetsProps) {
  const [refreshCount, setRefreshCount] = useState(0)
  
  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1)
    // Could trigger a client-side data refresh here
  }
  
  return (
    <div>
      <h3>Interactive Widgets (Client-Side)</h3>
      <button onClick={handleRefresh}>
        Refresh (Client-side) - Count: {refreshCount}
      </button>
      <p>Initial data from server: {JSON.stringify(initialData)}</p>
    </div>
  )
}

