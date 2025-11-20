// Example 2: Client Component Fetching
// Demonstrates fetching data in Client Components

// app/components/UserProfile.tsx - Simple client-side fetch
'use client'

import { useState, useEffect } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user data</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// app/components/SearchResults.tsx - Fetching on user action
'use client'

import { useState } from 'react'

export default function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <p>Searching...</p>}
      
      {results.length > 0 && (
        <ul>
          {results.map((result: { id: number; title: string }) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// app/components/LiveStats.tsx - Real-time polling
'use client'

import { useState, useEffect } from 'react'

export default function LiveStats() {
  const [stats, setStats] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  useEffect(() => {
    // Initial fetch
    fetchStats()
    
    // Poll every 5 seconds
    const interval = setInterval(() => {
      fetchStats()
      setLastUpdate(new Date())
    }, 5000)
    
    return () => clearInterval(interval) // Cleanup
  }, [])
  
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }
  
  if (!stats) return <div>Loading stats...</div>
  
  return (
    <div>
      <h2>Live Stats</h2>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
      <p>Views: {stats.views}</p>
      <p>Users: {stats.users}</p>
    </div>
  )
}

// app/components/DebouncedSearch.tsx - Debounced search
'use client'

import { useState, useEffect, useCallback } from 'react'

export default function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    setLoading(true)
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  useEffect(() => {
    // Debounce search - wait 300ms after user stops typing
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [query, performSearch])
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <p>Searching...</p>}
      
      {results.length > 0 && (
        <ul>
          {results.map((result: { id: number; title: string }) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// app/components/InfiniteScroll.tsx - Infinite scroll
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function InfiniteScroll() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  const lastItemRef = useCallback((node: HTMLElement | null) => {
    if (loading) return
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    
    if (node) observerRef.current.observe(node)
  }, [loading, hasMore])
  
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      
      try {
        const res = await fetch(`/api/items?page=${page}`)
        const data = await res.json()
        
        setItems(prev => [...prev, ...data.items])
        setHasMore(data.hasMore)
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchItems()
  }, [page])
  
  return (
    <div>
      <ul>
        {items.map((item: { id: number; title: string }, index: number) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more items</p>}
    </div>
  )
}

// app/components/TodoList.tsx - Optimistic updates
'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  
  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return
    
    // Optimistic update - update UI immediately
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
    
    try {
      // Then sync with server
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      })
      
      if (!res.ok) {
        // Revert on error
        setTodos(prev => prev.map(t =>
          t.id === id ? { ...t, completed: todo.completed } : t
        ))
        throw new Error('Failed to update')
      }
    } catch (error) {
      console.error('Error updating todo:', error)
      // Revert optimistic update
      setTodos(prev => prev.map(t =>
        t.id === id ? { ...t, completed: todo.completed } : t
      ))
    }
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

