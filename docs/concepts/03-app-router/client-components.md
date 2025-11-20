# Client Components

> **Category**: Core | **Related Concepts**: [Server Components](./server-components.md), [Pages](./pages.md)  
> **Last Updated**: 2024

## 📖 Overview

Client Components in the App Router are React components that run in the browser. They enable interactivity, use React hooks, access browser APIs, and handle user events. Use the `'use client'` directive to create Client Components.

**Key Points:**
- Created with `'use client'` directive
- Run in the browser
- Can use React hooks and browser APIs
- Enable interactivity and user events
- Sent to the client (increases bundle size)
- Use when you need client-side features

## 🎯 When to Use

- **Interactivity**: Buttons, forms, user interactions
- **React Hooks**: useState, useEffect, useContext, etc.
- **Browser APIs**: window, document, localStorage, etc.
- **Event Handlers**: onClick, onChange, onSubmit, etc.
- **Third-Party Libraries**: Libraries that need client-side execution
- **State Management**: Client-side state management

## 💻 Basic Example

### Simple Client Component

```typescript
// app/components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
```

### Client Component with useEffect

```typescript
// app/components/UserProfile.tsx
'use client'

import { useState, useEffect } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user data</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### Client Component with Browser APIs

```typescript
// app/components/WindowSize.tsx
'use client'

import { useState, useEffect } from 'react'

export default function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return (
    <div>
      <p>Window Size: {size.width} x {size.height}</p>
    </div>
  )
}
```

## 🔧 Advanced Example

### Form with Client-Side Validation

```typescript
// app/components/ContactForm.tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  
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
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        alert('Message sent!')
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
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

### Client Component with Context

```typescript
// app/providers/ThemeProvider.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setTheme(saved)
  }, [])
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

// app/components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/providers/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

### Client Component with Real-Time Updates

```typescript
// app/components/LiveStats.tsx
'use client'

import { useState, useEffect } from 'react'

export default function LiveStats() {
  const [stats, setStats] = useState({ views: 0, users: 0 })
  
  useEffect(() => {
    // Initial fetch
    fetchStats()
    
    // Poll every 5 seconds
    const interval = setInterval(fetchStats, 5000)
    
    return () => clearInterval(interval)
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
  
  return (
    <div>
      <h2>Live Stats</h2>
      <p>Views: {stats.views}</p>
      <p>Users: {stats.users}</p>
      <p className="text-sm text-gray-500">Updates every 5 seconds</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Interactive Component
```typescript
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [state, setState] = useState(0)
  return <button onClick={() => setState(state + 1)}>Count: {state}</button>
}
```
**When to use**: Simple interactivity

### Pattern 2: Data Fetching
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function DataComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data ? data.content : 'Loading...'}</div>
}
```
**When to use**: Client-side data fetching

### Pattern 3: Event Handlers
```typescript
'use client'

export default function FormComponent() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```
**When to use**: Forms and user interactions

## ⚠️ Common Mistakes

### Mistake 1: Using 'use client' Unnecessarily
```typescript
// ❌ Wrong: Using client component when not needed
'use client'

export default function StaticPage() {
  return <div>Static content</div> // No interactivity needed
}
```
**Why**: Increases bundle size unnecessarily.

```typescript
// ✅ Correct: Use Server Component for static content
export default function StaticPage() {
  return <div>Static content</div>
}
```

### Mistake 2: Not Handling Loading States
```typescript
// ❌ Wrong: No loading state
'use client'

export default function DataComponent() {
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

export default function DataComponent() {
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

### Mistake 3: Memory Leaks
```typescript
// ❌ Wrong: Not cleaning up effects
'use client'

useEffect(() => {
  setInterval(() => {
    fetchData()
  }, 1000)
  // No cleanup - memory leak!
}, [])
```
**Why**: Intervals continue running after unmount.

```typescript
// ✅ Correct: Clean up effects
'use client'

useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval) // Cleanup
}, [])
```

## ✨ Best Practices

1. **Use sparingly**: Only use Client Components when you need client features
2. **Keep boundaries small**: Mark only interactive parts as client components
3. **Handle loading states**: Always show loading indicators
4. **Handle errors**: Provide error messages and recovery options
5. **Clean up effects**: Always clean up subscriptions and intervals
6. **Optimize re-renders**: Use React.memo, useMemo, useCallback when needed
7. **Pass data from server**: Receive initial data from Server Components

## 🔗 Related Concepts

- [Server Components](./server-components.md) - Default component type
- [Pages](./pages.md) - Creating pages
- [State Management](../17-state-management/README.md) - Managing state

## 📚 Resources

### Official Documentation
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

## 🧪 Practice Exercises

### Exercise 1: Interactive Counter
**Difficulty**: Beginner  
**Goal**: Understand Client Components  
**Instructions**:
1. Create a counter component
2. Add increment/decrement buttons
3. Use useState for state
4. Test interactivity

### Exercise 2: Form with Validation
**Difficulty**: Intermediate  
**Goal**: Practice client-side forms  
**Instructions**:
1. Create a contact form
2. Add client-side validation
3. Handle form submission
4. Show success/error messages

## 🎓 Key Takeaways

- Client Components use `'use client'` directive
- Run in the browser, enable interactivity
- Can use React hooks and browser APIs
- Increase bundle size (sent to client)
- Use only when you need client-side features
- Always handle loading and error states
- Clean up effects to prevent memory leaks

## ❓ FAQ

### Q: When should I use Client Components?
**A**: Use Client Components when you need interactivity, hooks, browser APIs, or event handlers.

### Q: Can I mix Server and Client Components?
**A**: Yes! Server Components can import and render Client Components.

### Q: Do Client Components increase bundle size?
**A**: Yes, Client Components are sent to the browser, increasing JavaScript bundle size.

### Q: Can I use hooks in Client Components?
**A**: Yes, Client Components can use all React hooks.

### Q: Should I use Client Components for data fetching?
**A**: Prefer Server Components for data fetching. Use Client Components only when you need client-side fetching (e.g., real-time updates).

---

**Next Steps**: 
- Review: [Server Components](./server-components.md) for comparison
- Practice: Create interactive components
- Build: A form with client-side validation

