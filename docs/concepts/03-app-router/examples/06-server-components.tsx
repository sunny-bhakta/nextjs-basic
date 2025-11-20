// Example 6: Server Components
// Demonstrates Server Components with data fetching

// app/products/page.tsx - Server Component with data fetching
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache'
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
      <h1>Products</h1>
      <ul>
        {products.map((product: { id: number; name: string; price: number }) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/page.tsx - Server Component with parallel fetching
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
  })
  return res.json()
}

async function getCategories() {
  const res = await fetch('https://api.example.com/categories', {
    cache: 'force-cache'
  })
  return res.json()
}

export default async function BlogPage() {
  // Fetch in parallel
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])
  
  return (
    <div>
      <h1>Blog</h1>
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((cat: { id: number; name: string }) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// app/dashboard/page.tsx - Server Component with database access
import { db } from '@/lib/db'

export default async function DashboardPage() {
  // Direct database access in Server Component
  const stats = await db.stats.findFirst()
  const recentUsers = await db.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Stats</h2>
        <p>Total Users: {stats?.totalUsers || 0}</p>
        <p>Total Revenue: ${stats?.totalRevenue || 0}</p>
      </div>
      <div>
        <h2>Recent Users</h2>
        <ul>
          {recentUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// app/admin/page.tsx - Server Component with environment variables
export default async function AdminPage() {
  // Access server-side environment variables
  const apiKey = process.env.ADMIN_API_KEY
  
  if (!apiKey) {
    return <div>Admin API key not configured</div>
  }
  
  const data = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    cache: 'no-store'
  }).then(res => res.json())
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}

// app/docs/page.tsx - Server Component with file system access
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

async function getDocs() {
  const docsDir = join(process.cwd(), 'content', 'docs')
  const files = await readdir(docsDir)
  
  const docs = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(join(docsDir, file), 'utf-8')
      return {
        name: file.replace('.md', ''),
        content
      }
    })
  )
  
  return docs
}

export default async function DocsPage() {
  const docs = await getDocs()
  
  return (
    <div>
      <h1>Documentation</h1>
      {docs.map(doc => (
        <div key={doc.name}>
          <h2>{doc.name}</h2>
          <pre>{doc.content}</pre>
        </div>
      ))}
    </div>
  )
}

