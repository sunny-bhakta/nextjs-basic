// Example 8: Streaming with Suspense
// Demonstrates progressive rendering with Suspense boundaries

// app/dashboard/page.tsx - Multiple Suspense boundaries
import { Suspense } from 'react'
import UserStats from './components/user-stats'
import RecentActivity from './components/recent-activity'
import Notifications from './components/notifications'

function StatsLoading() {
  return (
    <div className="p-4 border rounded animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </div>
  )
}

function ActivityLoading() {
  return (
    <div className="p-4 border rounded animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

function NotificationsLoading() {
  return (
    <div className="p-4 border rounded animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-36 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Content streams in as it becomes available</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<StatsLoading />}>
          <UserStats />
        </Suspense>
        
        <Suspense fallback={<ActivityLoading />}>
          <RecentActivity />
        </Suspense>
      </div>
      
      <Suspense fallback={<NotificationsLoading />}>
        <Notifications />
      </Suspense>
    </div>
  )
}

// app/dashboard/components/user-stats.tsx
async function getStats() {
  // Simulate slow API
  await new Promise(resolve => setTimeout(resolve, 2000))
  
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
      <p>New Users Today: {stats.newUsersToday}</p>
    </div>
  )
}

// app/dashboard/components/recent-activity.tsx
async function getActivity() {
  // Simulate slow API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
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
        {activity.map((item: { id: number; description: string; time: string }) => (
          <li key={item.id}>
            <p>{item.description}</p>
            <p className="text-sm text-gray-500">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/dashboard/components/notifications.tsx
async function getNotifications() {
  // Simulate slow API
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const res = await fetch('https://api.example.com/notifications', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function Notifications() {
  const notifications = await getNotifications()
  
  return (
    <div className="p-4 border rounded">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif: { id: number; message: string; read: boolean }) => (
          <li key={notif.id} className={notif.read ? 'opacity-50' : ''}>
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/page.tsx - Streaming with nested Suspense
import { Suspense } from 'react'
import PostList from './components/post-list'
import Categories from './components/categories'

function PostListLoading() {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
      ))}
    </div>
  )
}

function CategoriesLoading() {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      
      <Suspense fallback={<CategoriesLoading />}>
        <Categories />
      </Suspense>
      
      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </div>
  )
}

// app/blog/components/categories.tsx
async function getCategories() {
  const res = await fetch('https://api.example.com/categories', {
    cache: 'force-cache'
  })
  return res.json()
}

export default async function Categories() {
  const categories = await getCategories()
  
  return (
    <div className="flex gap-2 mb-4">
      {categories.map((cat: { id: number; name: string }) => (
        <span key={cat.id} className="px-3 py-1 bg-blue-100 rounded">
          {cat.name}
        </span>
      ))}
    </div>
  )
}

// app/blog/components/post-list.tsx
async function getPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
  })
  return res.json()
}

export default async function PostList() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map((post: { id: number; title: string; excerpt: string }) => (
        <article key={post.id} className="mb-6 p-4 border rounded">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

