// Example 5: Programmatic Navigation with useRouter
// Demonstrates how to navigate programmatically using the useRouter hook

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Basic programmatic navigation
export function BasicNavigation() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/about')
  }
  
  return (
    <button onClick={handleClick}>
      Go to About Page
    </button>
  )
}

// Navigation with replace (doesn't add to history)
export function ReplaceNavigation() {
  const router = useRouter()
  
  const handleLogin = () => {
    // After login, replace current route so back button doesn't go to login
    router.replace('/dashboard')
  }
  
  return (
    <button onClick={handleLogin}>
      Login and Go to Dashboard
    </button>
  )
}

// Navigation with query parameters
export function NavigationWithQuery() {
  const router = useRouter()
  
  const handleSearch = (query: string) => {
    router.push(`/search?q=${query}`)
  }
  
  return (
    <button onClick={() => handleSearch('nextjs')}>
      Search for Next.js
    </button>
  )
}

// Back and forward navigation
export function HistoryNavigation() {
  const router = useRouter()
  
  return (
    <div>
      <button onClick={() => router.back()}>
        Go Back
      </button>
      <button onClick={() => router.forward()}>
        Go Forward
      </button>
    </div>
  )
}

// Refresh current page
export function RefreshPage() {
  const router = useRouter()
  
  const handleRefresh = () => {
    router.refresh()
  }
  
  return (
    <button onClick={handleRefresh}>
      Refresh Page
    </button>
  )
}

// Form submission with navigation
export function FormWithNavigation() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${searchTerm}`)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

// Conditional navigation
export function ConditionalNavigation() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }
  
  return (
    <button onClick={handleClick}>
      {isLoggedIn ? 'Go to Dashboard' : 'Go to Login'}
    </button>
  )
}

