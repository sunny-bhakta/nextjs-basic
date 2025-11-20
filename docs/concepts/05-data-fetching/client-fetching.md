# Client Component Fetching

> **Category**: Core | **Related Concepts**: [Server Component Fetching](./server-fetching.md), [Server Actions](./server-actions.md)  
> **Last Updated**: 2024

## 📖 Overview

Client Component Fetching involves fetching data in the browser using React hooks like `useEffect`. This is useful for user interactions, real-time updates, and data that changes based on user actions. However, prefer Server Component fetching when possible for better performance.

**Key Points:**
- Fetch data in Client Components using `useEffect`
- Runs in the browser after component mounts
- Good for interactive, user-specific, or real-time data
- Requires handling loading and error states
- Increases client-side JavaScript bundle

## 🎯 When to Use

- **User Interactions**: Data fetched based on user actions
- **Real-Time Updates**: Polling, WebSockets, live data
- **Client-Side Filtering**: Data already loaded, filtering on client
- **Progressive Enhancement**: Enhance page with additional data
- **Interactive Features**: Search, infinite scroll, pagination

## 💻 Basic Example

### Simple Client-Side Fetch

```typescript
// app/components/UserProfile.tsx
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
```

### Fetching on User Action

```typescript
// app/components/SearchResults.tsx
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
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Real-Time Polling

```typescript
// app/components/LiveStats.tsx
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
```

## 🔧 Advanced Example

### Debounced Search

```typescript
// app/components/DebouncedSearch.tsx
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
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Infinite Scroll

```typescript
// app/components/InfiniteScroll.tsx
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
        {items.map((item, index) => (
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
```

### Optimistic Updates

```typescript
// app/components/TodoList.tsx
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
```

## 📋 Common Patterns

### Pattern 1: Fetch on Mount
```typescript
'use client'

useEffect(() => {
  fetch('/api/data').then(res => res.json()).then(setData)
}, [])
```
**When to use**: Initial data load

### Pattern 2: Fetch on Action
```typescript
'use client'

const handleClick = async () => {
  const data = await fetch('/api/data').then(res => res.json())
  setData(data)
}
```
**When to use**: User-triggered data fetching

### Pattern 3: Polling
```typescript
'use client'

useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 5000)
  return () => clearInterval(interval)
}, [])
```
**When to use**: Real-time updates

## ⚠️ Common Mistakes

### Mistake 1: Not Handling Loading States
```typescript
// ❌ Wrong: No loading state
'use client'

export default function Component() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data.content}</div> // Error if data is null
}
```
**Why**: Data isn't available immediately.

```typescript
// ✅ Correct: Handle loading state
'use client'

export default function Component() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  return <div>{data.content}</div>
}
```

### Mistake 2: Memory Leaks
```typescript
// ❌ Wrong: Not cleaning up
'use client'

useEffect(() => {
  setInterval(() => {
    fetchData()
  }, 1000)
  // No cleanup - memory leak!
}, [])
```
**Why**: Intervals continue after unmount.

```typescript
// ✅ Correct: Clean up
'use client'

useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval) // Cleanup
}, [])
```

### Mistake 3: Using Client Fetching Unnecessarily
```typescript
// ❌ Wrong: Client fetching when Server Component would work
'use client'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data?.content}</div>
}
```
**Why**: Server Component fetching is better for initial data.

```typescript
// ✅ Correct: Use Server Component
export default async function Page() {
  const data = await fetch('/api/data').then(res => res.json())
  return <div>{data.content}</div>
}
```

## ✨ Best Practices

1. **Prefer Server Components**: Use Server Component fetching when possible
2. **Handle loading states**: Always show loading indicators
3. **Handle errors**: Provide error messages and recovery
4. **Clean up effects**: Clear intervals and cancel requests
5. **Debounce searches**: Prevent excessive API calls
6. **Use SWR/React Query**: Consider libraries for better patterns
7. **Optimistic updates**: Update UI immediately, sync later

## 🔗 Related Concepts

- [Server Component Fetching](./server-fetching.md) - Server-side fetching
- [Server Actions](./server-actions.md) - Server-side mutations
- [State Management](../17-state-management/README.md) - Managing state

## 📚 Resources

### Libraries
- [SWR](https://swr.vercel.app) - Data fetching library
- [React Query](https://tanstack.com/query) - Powerful data synchronization

### Official Documentation
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## 🧪 Practice Exercises

### Exercise 1: Search Component
**Difficulty**: Beginner  
**Goal**: Understand client-side fetching  
**Instructions**:
1. Create a search component
2. Fetch results on user input
3. Add debouncing
4. Handle loading and errors

### Exercise 2: Real-Time Dashboard
**Difficulty**: Intermediate  
**Goal**: Practice polling and real-time updates  
**Instructions**:
1. Create a dashboard component
2. Poll API every 5 seconds
3. Show last update time
4. Handle connection errors

## 🎓 Key Takeaways

- Client fetching uses `useEffect` in Client Components
- Good for interactive, user-specific, or real-time data
- Always handle loading and error states
- Clean up effects to prevent memory leaks
- Prefer Server Component fetching when possible
- Use debouncing for search
- Consider SWR or React Query for better patterns

## ❓ FAQ

### Q: When should I use client fetching vs server fetching?
**A**: Use server fetching for initial page data. Use client fetching for user interactions, real-time updates, or progressive enhancement.

### Q: Do I need to handle loading states?
**A**: Yes, always show loading indicators for better UX.

### Q: How do I prevent memory leaks?
**A**: Always clean up intervals, timeouts, and subscriptions in useEffect cleanup functions.

### Q: Should I use a data fetching library?
**A**: Consider SWR or React Query for better caching, revalidation, and error handling patterns.

### Q: Can I fetch data on user actions?
**A**: Yes, fetch data in event handlers for user-triggered data fetching.

---

**Next Steps**: 
- Review: [Server Actions](./server-actions.md) for mutations
- Practice: Create interactive components with client fetching
- Build: A real-time dashboard with polling

