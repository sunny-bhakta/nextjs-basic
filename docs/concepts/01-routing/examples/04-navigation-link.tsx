// Example 4: Navigation with Link Component
// Demonstrates how to use the Link component for client-side navigation

import Link from 'next/link'

// Basic navigation component
export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  )
}

// Navigation with styling
export function StyledNavigation() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800"
      >
        Home
      </Link>
      <Link 
        href="/about"
        className="text-blue-600 hover:text-blue-800"
      >
        About
      </Link>
      <Link 
        href="/contact"
        className="text-blue-600 hover:text-blue-800"
      >
        Contact
      </Link>
    </nav>
  )
}

// Navigation with dynamic routes
interface BlogListProps {
  posts: Array<{ id: number; slug: string; title: string }>
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Navigation with query parameters
export function SearchNavigation() {
  return (
    <div>
      <Link href="/search?q=nextjs&category=tutorial">
        Search Next.js Tutorials
      </Link>
      <Link href={{ pathname: '/search', query: { q: 'react', page: '1' } }}>
        Search React (Page 1)
      </Link>
    </div>
  )
}

// Disabling prefetch
export function NavigationWithoutPrefetch() {
  return (
    <nav>
      <Link href="/about" prefetch={false}>
        About (No Prefetch)
      </Link>
    </nav>
  )
}

