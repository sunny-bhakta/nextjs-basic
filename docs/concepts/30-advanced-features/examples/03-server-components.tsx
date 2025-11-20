// Example 3: Advanced Server Components
// Demonstrates advanced Server Component patterns

// ============================================
// Example 1: Server Component with Data Fetching
// File: app/users/page.tsx
// ============================================

async function getUsers() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
  ]
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// Example 2: Server Component Composition
// File: app/products/[id]/page.tsx
// ============================================

async function getProduct(id: string) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    id,
    name: `Product ${id}`,
    price: 99.99,
    description: 'Product description'
  }
}

async function getRelatedProducts(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [
    { id: '1', name: 'Related Product 1' },
    { id: '2', name: 'Related Product 2' }
  ]
}

async function ProductDetails({ product }: { product: any }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  )
}

async function RelatedProducts({ products }: { products: any[] }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Related Products</h3>
      <ul className="space-y-1">
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default async function ProductPage({
  params
}: {
  params: { id: string }
}) {
  const [product, relatedProducts] = await Promise.all([
    getProduct(params.id),
    getRelatedProducts(params.id)
  ])
  
  return (
    <div className="p-6">
      <ProductDetails product={product} />
      <div className="mt-4">
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}

// ============================================
// Example 3: Server Component with Caching
// File: app/blog/[slug]/page.tsx
// ============================================

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

export default async function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  
  return (
    <article className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose">
        {post.content}
      </div>
    </article>
  )
}

// ============================================
// Example 4: Server Component with Error Handling
// File: app/data/page.tsx
// ============================================

async function fetchData() {
  try {
    const res = await fetch('https://api.example.com/data', {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export default async function DataPage() {
  const data = await fetchData()
  
  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Data</h1>
        <p className="text-red-600">Failed to load data</p>
      </div>
    )
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data</h1>
      <pre className="p-4 bg-gray-100 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

// ============================================
// Example 5: Server Component with Parallel Fetching
// File: app/dashboard/page.tsx
// ============================================

async function getStats() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { users: 1000, orders: 500, revenue: 50000 }
}

async function getRecentActivity() {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [
    { id: '1', action: 'User signed up', time: '2 minutes ago' },
    { id: '2', action: 'Order placed', time: '5 minutes ago' }
  ]
}

export default async function DashboardPage() {
  // Fetch in parallel
  const [stats, activity] = await Promise.all([
    getStats(),
    getRecentActivity()
  ])
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-sm text-gray-600">Orders</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold">${stats.revenue}</p>
        </div>
      </div>
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <ul className="space-y-2">
          {activity.map((item) => (
            <li key={item.id} className="text-sm">
              {item.action} - {item.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

