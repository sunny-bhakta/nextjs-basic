// Example 4: Client-Side Rendering (CSR)
// Content is rendered in the browser using JavaScript
// Best for: User-specific, interactive content, real-time updates

'use client'

import { useState, useEffect } from 'react'

// app/user-profile/page.tsx - Client-side data fetching
export default function UserProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Fetch data on the client side
    fetch('/api/user')
      .then(res => res.json())
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
      <h1>User Profile (Client-Side)</h1>
      <p>This content is rendered in the browser</p>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}

// app/dashboard/analytics/page.tsx - Real-time client-side updates
export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  useEffect(() => {
    // Fetch initial data
    fetchAnalytics()
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchAnalytics()
      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const fetchAnalytics = async () => {
    const res = await fetch('/api/analytics')
    const data = await res.json()
    setAnalytics(data)
  }
  
  if (!analytics) return <div>Loading analytics...</div>
  
  return (
    <div>
      <h1>Analytics (Client-Side)</h1>
      <p>Updates every 5 seconds</p>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
      <div>
        <p>Page Views: {analytics.pageViews}</p>
        <p>Unique Visitors: {analytics.uniqueVisitors}</p>
        <p>Bounce Rate: {analytics.bounceRate}%</p>
      </div>
    </div>
  )
}

// app/search/page.tsx - Interactive search with CSR
export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    setLoading(true)
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }
  
  return (
    <div>
      <h1>Search (Client-Side)</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border p-2 rounded w-full"
      />
      
      {loading && <p>Searching...</p>}
      
      {results.length > 0 && (
        <ul>
          {results.map((result: { id: number; title: string }) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
      
      {query && !loading && results.length === 0 && (
        <p>No results found</p>
      )}
    </div>
  )
}

// app/todos/page.tsx - Interactive todo list with CSR
export default function TodosPage() {
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([])
  const [newTodo, setNewTodo] = useState('')
  
  useEffect(() => {
    // Load todos from localStorage or API
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])
  
  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  return (
    <div>
      <h1>Todos (Client-Side)</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

