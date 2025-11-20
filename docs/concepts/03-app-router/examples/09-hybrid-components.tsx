// Example 9: Hybrid - Server + Client Components
// Demonstrates combining Server and Client Components

// app/products/page.tsx - Server Component fetching data
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
      <p>Product list fetched on server, filtering happens on client</p>
      
      {/* Pass server data to client component */}
      <ProductFilter initialProducts={products} />
    </div>
  )
}

// app/products/components/product-filter.tsx - Client Component for interactivity
'use client'

import { useState, useMemo } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

interface ProductFilterProps {
  initialProducts: Product[]
}

export default function ProductFilter({ initialProducts }: ProductFilterProps) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredAndSorted = useMemo(() => {
    let products = initialProducts
    
    // Filter by category
    if (filter !== 'all') {
      products = products.filter(p => p.category === filter)
    }
    
    // Search filter
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Sort
    return [...products].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.price - b.price
      return 0
    })
  }, [initialProducts, filter, sortBy, searchQuery])
  
  const categories = Array.from(new Set(initialProducts.map(p => p.category)))
  
  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="flex gap-4 mb-4">
        <div>
          <label>Category: </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Sort by: </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAndSorted.map(product => (
          <div key={product.id} className="border rounded p-4">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      
      {filteredAndSorted.length === 0 && (
        <p>No products found</p>
      )}
    </div>
  )
}

// app/dashboard/page.tsx - Server data + Client interactivity
import DashboardWidgets from './components/dashboard-widgets'

async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function DashboardPage() {
  // Server Component - fetch data
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard</h1>
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

// app/dashboard/components/dashboard-widgets.tsx
'use client'

import { useState, useEffect } from 'react'

interface DashboardWidgetsProps {
  initialData: {
    totalUsers: number
    revenue: number
  }
}

export default function DashboardWidgets({ initialData }: DashboardWidgetsProps) {
  const [realTimeData, setRealTimeData] = useState(initialData)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  useEffect(() => {
    // Poll for real-time updates
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/dashboard/realtime')
        const data = await res.json()
        setRealTimeData(data)
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Failed to fetch real-time data:', error)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="mt-4 p-4 border rounded">
      <h3>Interactive Widgets (Client-Side)</h3>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
      <div>
        <p>Real-time Users: {realTimeData.totalUsers}</p>
        <p>Real-time Revenue: ${realTimeData.revenue}</p>
      </div>
    </div>
  )
}

// app/blog/page.tsx - Static content + Client search
import BlogSearch from './components/blog-search'

async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 300 }
  })
  return res.json()
}

export default async function BlogPage() {
  // Server Component - fetch posts
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      <p>Posts are statically generated and regenerated every 5 minutes</p>
      
      {/* Client component for search */}
      <BlogSearch initialPosts={posts} />
    </div>
  )
}

// app/blog/components/blog-search.tsx
'use client'

import { useState, useMemo } from 'react'

interface Post {
  id: number
  title: string
  excerpt: string
  category: string
}

interface BlogSearchProps {
  initialPosts: Post[]
}

export default function BlogSearch({ initialPosts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const filteredPosts = useMemo(() => {
    let posts = initialPosts
    
    if (selectedCategory !== 'all') {
      posts = posts.filter(p => p.category === selectedCategory)
    }
    
    if (searchQuery) {
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return posts
  }, [initialPosts, searchQuery, selectedCategory])
  
  const categories = Array.from(new Set(initialPosts.map(p => p.category)))
  
  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div>
        <p className="mb-2">Found {filteredPosts.length} posts</p>
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id} className="mb-4 p-4 border rounded">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="text-sm text-gray-500">{post.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

