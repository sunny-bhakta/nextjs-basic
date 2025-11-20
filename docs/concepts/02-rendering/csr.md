# Client-Side Rendering (CSR)

> **Category**: Core | **Related Concepts**: [SSR](./ssr.md), [Hybrid Rendering](./hybrid-rendering.md)  
> **Last Updated**: 2024

## 📖 Overview

Client-Side Rendering (CSR) is a rendering strategy where content is rendered in the browser using JavaScript. In Next.js, this is achieved by using Client Components (`'use client'`) and fetching data in `useEffect` or event handlers.

**Key Points:**
- Content is rendered in the browser using JavaScript
- Data is fetched on the client side
- Good for interactive, user-specific features
- Poor SEO since content isn't available initially
- Fast after initial load for user interactions

## 🎯 When to Use

- **User-Specific Content**: User profiles, dashboards, personalized feeds
- **Interactive Features**: Search, filters, real-time updates
- **Real-Time Data**: Live chat, notifications, stock tickers
- **Heavy Interactivity**: Complex forms, drag-and-drop, games
- **Third-Party Widgets**: Embedded content that needs to run in browser

## 💻 Basic Example

### Client Component with Data Fetching

```typescript
// app/user-profile/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function UserProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Fetch data on the client side
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
  
  if (loading) return <div>Loading user profile...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user data</div>
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}
```

### Real-Time Updates

```typescript
// app/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'

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
    
    return () => clearInterval(interval) // Cleanup
  }, [])
  
  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics')
      const data = await res.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }
  
  if (!analytics) return <div>Loading analytics...</div>
  
  return (
    <div>
      <h1>Analytics</h1>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
      <div>
        <p>Page Views: {analytics.pageViews}</p>
        <p>Unique Visitors: {analytics.uniqueVisitors}</p>
      </div>
    </div>
  )
}
```

## 🔧 Advanced Example

### Interactive Search with Debouncing

```typescript
// app/search/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'

export default function SearchPage() {
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
    // Debounce search
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300) // Wait 300ms after user stops typing
    
    return () => clearTimeout(timeoutId)
  }, [query, performSearch])
  
  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded w-full"
      />
      
      {loading && <p>Searching...</p>}
      
      {results.length > 0 && (
        <ul>
          {results.map(result => (
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
```

### Form with Client-Side Validation

```typescript
// app/contact/page.tsx
'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }
  
  if (submitted) {
    return <div>Thank you for your message!</div>
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      
      <div>
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      
      <div>
        <label>Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {errors.message && <span>{errors.message}</span>}
      </div>
      
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Data Fetching on Mount
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function DataPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return <div>{data ? data.content : 'Loading...'}</div>
}
```
**When to use**: Initial data load when component mounts

### Pattern 2: Polling for Updates
```typescript
'use client'

useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 5000)
  
  return () => clearInterval(interval)
}, [])
```
**When to use**: Real-time updates without WebSockets

### Pattern 3: Event-Driven Fetching
```typescript
'use client'

const handleClick = async () => {
  const data = await fetch('/api/data').then(res => res.json())
  setData(data)
}
```
**When to use**: Fetching data based on user actions

## ⚠️ Common Mistakes

### Mistake 1: Using CSR for SEO-Critical Content
```typescript
// ❌ Wrong: Using CSR for content that needs SEO
'use client'

export default function HomePage() {
  const [content, setContent] = useState(null)
  
  useEffect(() => {
    fetch('/api/content').then(res => res.json()).then(setContent)
  }, [])
  
  return <div>{content}</div> // Not available for crawlers
}
```
**Why**: Search engines may not execute JavaScript, so content won't be indexed.

```typescript
// ✅ Correct: Use SSR or SSG for SEO-critical content
export default async function HomePage() {
  const content = await fetch('/api/content').then(res => res.json())
  return <div>{content}</div> // Available for crawlers
}
```

### Mistake 2: Not Handling Loading States
```typescript
// ❌ Wrong: No loading state
'use client'

export default function DataPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data.content}</div> // Error if data is null
}
```
**Why**: Data isn't available immediately, causing errors.

```typescript
// ✅ Correct: Handle loading and error states
'use client'

export default function DataPage() {
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

### Mistake 3: Memory Leaks with Intervals
```typescript
// ❌ Wrong: Not cleaning up intervals
'use client'

useEffect(() => {
  setInterval(() => {
    fetchData()
  }, 1000)
  // No cleanup - memory leak!
}, [])
```
**Why**: Intervals continue running even after component unmounts.

```typescript
// ✅ Correct: Clean up intervals
'use client'

useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval) // Cleanup
}, [])
```

## ✨ Best Practices

1. **Use CSR for interactivity**: Only when you need client-side features
2. **Handle loading states**: Always show loading indicators
3. **Handle errors**: Provide error messages and retry options
4. **Clean up effects**: Clear intervals and cancel requests
5. **Debounce searches**: Prevent excessive API calls
6. **Use SWR or React Query**: For better data fetching patterns
7. **Consider hybrid**: Use SSR/SSG for initial content, CSR for interactivity

## 🔗 Related Concepts

- [Server-Side Rendering](./ssr.md) - Render on server
- [Hybrid Rendering](./hybrid-rendering.md) - Combining strategies
- [State Management](../17-state-management/README.md) - Managing client state

## 📚 Resources

### Official Documentation
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/client-side)

### Libraries
- [SWR](https://swr.vercel.app) - Data fetching library
- [React Query](https://tanstack.com/query) - Powerful data synchronization

### Examples
- [CSR Example](./examples/04-client-side-rendering.tsx)

## 🧪 Practice Exercises

### Exercise 1: Interactive Todo List
**Difficulty**: Beginner  
**Goal**: Understand basic CSR patterns  
**Instructions**:
1. Create a todo list component
2. Fetch todos from API on mount
3. Add ability to create, update, delete todos
4. Handle loading and error states

**Solution**: See [examples/04-client-side-rendering.tsx](./examples/04-client-side-rendering.tsx)

### Exercise 2: Real-Time Dashboard
**Difficulty**: Intermediate  
**Goal**: Practice polling and real-time updates  
**Instructions**:
1. Create a dashboard with multiple metrics
2. Poll API every 5 seconds for updates
3. Show last update time
4. Handle connection errors gracefully

## 🎓 Key Takeaways

- CSR renders content in the browser using JavaScript
- Use `'use client'` directive for Client Components
- Fetch data in `useEffect` or event handlers
- Always handle loading and error states
- Clean up effects to prevent memory leaks
- Poor SEO - use for interactive features, not critical content
- Consider hybrid approach for best of both worlds

## ❓ FAQ

### Q: When should I use CSR instead of SSR?
**A**: Use CSR for interactive features, real-time updates, or user-specific content that doesn't need SEO. Use SSR for SEO-critical or frequently changing content.

### Q: Is CSR bad for SEO?
**A**: Yes, search engines may not execute JavaScript, so CSR content might not be indexed. Use SSR or SSG for SEO-critical pages.

### Q: Can I mix CSR with SSR?
**A**: Yes! This is called hybrid rendering. Use SSR for initial content, CSR for interactive features.

### Q: Should I use a data fetching library?
**A**: Consider using SWR or React Query for better caching, error handling, and revalidation patterns.

### Q: How do I prevent excessive API calls?
**A**: Use debouncing for search, throttling for scroll events, and caching with libraries like SWR.

---

**Next Steps**: 
- Review: [Hybrid Rendering](./hybrid-rendering.md) for combining strategies
- Practice: Create an interactive dashboard with CSR
- Build: A real-time chat application using CSR

