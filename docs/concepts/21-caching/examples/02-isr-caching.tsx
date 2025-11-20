// Example 2: ISR Caching
// Demonstrates Incremental Static Regeneration with time-based revalidation

// app/blog/[slug]/page.tsx - ISR with time-based revalidation
async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 } // Revalidate every hour (3600 seconds)
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return (
    <article className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        Published: {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="prose">
        {post.content}
      </div>
    </article>
  )
}

// app/products/[id]/page.tsx - ISR with shorter revalidation
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 60 } // Revalidate every minute
  })
  
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {new Date().toLocaleTimeString()}
      </p>
    </div>
  )
}

// app/news/page.tsx - ISR with longer revalidation
async function getNews() {
  const res = await fetch('https://api.example.com/news', {
    next: { revalidate: 86400 } // Revalidate once per day (24 hours)
  })
  
  return res.json()
}

export default async function NewsPage() {
  const news = await getNews()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">News</h1>
      <div className="space-y-4">
        {news.map((item: { id: number; title: string; date: string }) => (
          <div key={item.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// app/stats/page.tsx - ISR with very short revalidation
async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  })
  
  return res.json()
}

export default async function StatsPage() {
  const stats = await getStats()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-sm text-gray-600">Posts</p>
          <p className="text-2xl font-bold">{stats.posts}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <p className="text-sm text-gray-600">Views</p>
          <p className="text-2xl font-bold">{stats.views}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Updates every 10 seconds
      </p>
    </div>
  )
}

