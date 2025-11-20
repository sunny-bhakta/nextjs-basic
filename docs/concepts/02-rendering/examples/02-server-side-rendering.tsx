// Example 2: Server-Side Rendering (SSR)
// Pages are rendered on each request on the server
// Best for: Content that changes frequently, user-specific content, real-time data

// app/dashboard/page.tsx - SSR page
// This page is rendered on the server for each request

async function getDashboardData() {
  // This runs on EVERY request, not at build time
  // Use 'no-store' to disable caching
  const res = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store', // Don't cache - fetch fresh data every time
    // Or use: next: { revalidate: 0 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data')
  }
  
  return res.json()
}

export default async function DashboardPage() {
  // This function runs on the server for each request
  const data = await getDashboardData()
  
  return (
    <div>
      <h1>Dashboard (Server-Side Rendered)</h1>
      <p>This page is rendered on the server for each request</p>
      <p>Last updated: {new Date().toLocaleString()}</p>
      <div>
        <h2>Stats</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Active Sessions: {data.activeSessions}</p>
        <p>Revenue: ${data.revenue}</p>
      </div>
    </div>
  )
}

// app/news/page.tsx - SSR for frequently updated content
async function getLatestNews() {
  const res = await fetch('https://api.example.com/news', {
    cache: 'no-store', // Always fetch fresh news
  })
  
  return res.json()
}

export default async function NewsPage() {
  const news = await getLatestNews()
  
  return (
    <div>
      <h1>Latest News (SSR)</h1>
      <p>Content updated on every request</p>
      <ul>
        {news.map((item: { id: number; title: string; date: string }) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/user/[id]/page.tsx - SSR for user-specific content
interface UserPageProps {
  params: {
    id: string
  }
}

async function getUserData(id: string) {
  // Fetch user-specific data on each request
  const res = await fetch(`https://api.example.com/users/${id}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('User not found')
  }
  
  return res.json()
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserData(params.id)
  
  return (
    <div>
      <h1>User Profile (SSR)</h1>
      <p>User ID: {params.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Last login: {user.lastLogin}</p>
      <p><em>Rendered on server at: {new Date().toISOString()}</em></p>
    </div>
  )
}

// Force dynamic rendering
export const dynamic = 'force-dynamic' // Force SSR for this route

