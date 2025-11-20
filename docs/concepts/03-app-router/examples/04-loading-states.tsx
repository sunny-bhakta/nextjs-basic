// Example 4: Loading States
// Demonstrates loading.tsx files and Suspense

// app/loading.tsx - Root loading state
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-4">Loading...</p>
    </div>
  )
}

// app/blog/loading.tsx - Blog section loading
export default function BlogLoading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  )
}

// app/blog/[slug]/loading.tsx - Individual post loading
export default function PostLoading() {
  return (
    <div>
      <div className="h-12 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

// app/products/loading.tsx - Products skeleton
export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="border rounded-lg p-4">
          <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

// app/dashboard/page.tsx - Using Suspense for streaming
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'

function StatsLoading() {
  return (
    <div className="p-4 border rounded">
      <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
    </div>
  )
}

function ActivityLoading() {
  return (
    <div className="p-4 border rounded">
      <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsLoading />}>
        <UserStats />
      </Suspense>
      
      <Suspense fallback={<ActivityLoading />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}

// app/dashboard/components/user-stats.tsx
async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store'
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

// app/dashboard/components/recent-activity.tsx
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

