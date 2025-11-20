// Example 1: Static Caching
// Demonstrates static caching strategies

// ============================================
// Example 1: Products Page with Static Caching
// File: app/products/page.tsx
// ============================================

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Cache at build time, never revalidate
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  return res.json()
}

export async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {products.map((product: { id: number; name: string; price: number }) => (
          <li key={product.id} className="p-4 border rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// Example 2: Blog Page with Default Caching
// File: app/blog/page.tsx
// ============================================

async function getPosts() {
  // Default behavior: cache is enabled for GET requests
  const res = await fetch('https://api.example.com/posts')
  
  return res.json()
}

export async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <div className="space-y-4">
        {posts.map((post: { id: number; title: string; excerpt: string }) => (
          <article key={post.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Example 3: Static Page (No Data Fetching)
// File: app/about/page.tsx
// ============================================

export function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700">
        This page is statically generated at build time.
      </p>
    </div>
  )
}

// ============================================
// Example 4: Multiple Static Fetches
// File: app/static-data/page.tsx
// ============================================

async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
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

export async function StaticDataPage() {
  // Fetch in parallel
  const [users, categories] = await Promise.all([
    getUsers(),
    getCategories()
  ])
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Static Data</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <ul className="space-y-1">
            {users.map((user: { id: number; name: string }) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul className="space-y-1">
            {categories.map((cat: { id: number; name: string }) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

