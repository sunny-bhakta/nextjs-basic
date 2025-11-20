// Example 1: Code Splitting
// Demonstrates automatic and manual code splitting

// app/page.tsx - Automatic code splitting per route
export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>This page is automatically code-split from other routes.</p>
    </div>
  )
}

// app/about/page.tsx - Separate route bundle
export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">About</h1>
      <p>This route has its own bundle.</p>
    </div>
  )
}

// app/components/Header.tsx - Shared component
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1>My App</h1>
    </header>
  )
}

// app/components/Footer.tsx - Shared component
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <p>&copy; 2024 My App</p>
    </footer>
  )
}

// app/layout.tsx - Shared layout (loaded once)
import Header from './components/Header'
import Footer from './components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/dashboard/page.tsx - Route with heavy dependencies
// This route will be code-split automatically
import { Suspense } from 'react'

async function getDashboardData() {
  // Heavy data fetching
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { users: 100, posts: 200 }
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold">{data.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-sm text-gray-600">Posts</p>
          <p className="text-2xl font-bold">{data.posts}</p>
        </div>
      </div>
    </div>
  )
}

