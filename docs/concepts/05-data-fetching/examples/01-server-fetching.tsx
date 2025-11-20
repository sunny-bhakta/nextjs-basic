// Example 1: Server Component Fetching
// Demonstrates fetching data in Server Components

// app/products/page.tsx - Simple Server Component fetch
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Static generation
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

// app/blog/page.tsx - Server Component with error handling
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
    console.error('Error fetching posts:', error)
    return [] // Return empty array on error
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  )
}

// app/blog/[slug]/page.tsx - Dynamic route with data fetching
interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

// app/dashboard/page.tsx - Parallel data fetching
async function getUserData() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store' // Fresh data on each request
  })
  return res.json()
}

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 } // Revalidate every minute
  })
  return res.json()
}

async function getRecentActivity() {
  const res = await fetch('https://api.example.com/activity', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [user, stats, activity] = await Promise.all([
    getUserData(),
    getStats(),
    getRecentActivity()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <div>
        <h2>Stats</h2>
        <p>Total: {stats.total}</p>
      </div>
      <div>
        <h2>Recent Activity</h2>
        <ul>
          {activity.map((item: { id: number; description: string }) => (
            <li key={item.id}>{item.description}</li>
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
  
  const res = await fetch('https://api.example.com/admin', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    cache: 'no-store'
  })
  
  const data = await res.json()
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}

