// Example 7: Complete Rendering Strategies Example
// A comprehensive example showing all rendering strategies in one app

// app/layout.tsx - Root layout (always static)
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

// app/components/Navigation.tsx - Static navigation
export default function Navigation() {
  return (
    <nav>
      <a href="/">Home (Static)</a>
      <a href="/blog">Blog (ISR)</a>
      <a href="/dashboard">Dashboard (SSR)</a>
      <a href="/search">Search (CSR)</a>
      <a href="/products">Products (Hybrid)</a>
    </nav>
  )
}

// app/components/Footer.tsx - Static footer
export default function Footer() {
  return (
    <footer>
      <p>© 2024 My App - Footer is statically generated</p>
    </footer>
  )
}

// app/page.tsx - Static Home Page
export default function HomePage() {
  return (
    <div>
      <h1>Home Page (Static)</h1>
      <p>This page is statically generated at build time.</p>
      <p>It's the fastest and best for SEO.</p>
    </div>
  )
}

// app/blog/page.tsx - ISR Blog Listing
async function getBlogPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 300 } // Revalidate every 5 minutes
  })
  
  return res.json()
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div>
      <h1>Blog (ISR)</h1>
      <p>This page uses Incremental Static Regeneration.</p>
      <p>It's statically generated but regenerated every 5 minutes.</p>
      <ul>
        {posts.map((post: { id: number; title: string; slug: string }) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/[slug]/page.tsx - ISR Individual Post
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

export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
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
      <p><em>ISR - regenerated every 5 minutes</em></p>
    </article>
  )
}

// app/dashboard/page.tsx - SSR Dashboard
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store' // Always fetch fresh data
  })
  
  return res.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard (SSR)</h1>
      <p>This page is server-side rendered on each request.</p>
      <p>Perfect for user-specific, real-time data.</p>
      <div>
        <h2>Stats</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Active Sessions: {data.activeSessions}</p>
        <p>Revenue: ${data.revenue}</p>
        <p>Rendered at: {new Date().toISOString()}</p>
      </div>
    </div>
  )
}

// app/search/page.tsx - CSR Search
'use client'

import { useState } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }
  
  return (
    <div>
      <h1>Search (CSR)</h1>
      <p>This page uses client-side rendering for interactivity.</p>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Searching...</p>}
      {results.length > 0 && (
        <ul>
          {results.map((result: { id: number; title: string }) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// app/products/page.tsx - Hybrid: Static list with client-side filtering
import ProductFilter from './components/ProductFilter'

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // ISR - revalidate hourly
  })
  
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products (Hybrid)</h1>
      <p>Product list is statically generated (ISR).</p>
      <p>Filtering happens on the client side.</p>
      
      <ProductFilter initialProducts={products} />
    </div>
  )
}

// app/products/components/ProductFilter.tsx
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
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  const filtered = useMemo(() => {
    let products = initialProducts
    
    if (category !== 'all') {
      products = products.filter(p => p.category === category)
    }
    
    return [...products].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.price - b.price
    })
  }, [initialProducts, category, sortBy])
  
  const categories = Array.from(new Set(initialProducts.map(p => p.category)))
  
  return (
    <div>
      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      
      <ul>
        {filtered.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  )
}

// Summary of rendering strategies used:
// - Static: Home page, Layout, Navigation, Footer
// - ISR: Blog listing and posts (revalidate every 5 minutes)
// - SSR: Dashboard (fresh data on each request)
// - CSR: Search page (client-side interactivity)
// - Hybrid: Products page (static data + client-side filtering)

