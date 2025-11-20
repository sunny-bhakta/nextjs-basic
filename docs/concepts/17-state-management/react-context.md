# React Context API

> **Category**: Intermediate | **Related Concepts**: [Zustand](./zustand.md), [Client Components](../03-app-router/client-components.md)  
> **Last Updated**: 2024

## 📖 Overview

React Context API is a built-in state management solution that allows you to share state across components without prop drilling. It's perfect for theme, authentication, and other global state.

**Key Points:**
- Built into React
- No external dependencies
- Avoids prop drilling
- Global state sharing
- Provider pattern
- TypeScript support

## 🎯 When to Use

- **Global State**: When you need global state
- **Theme**: Theme management
- **Authentication**: User context
- **Settings**: App-wide settings
- **Avoid Prop Drilling**: When props go through many levels
- **Simple State**: When state is relatively simple

## 💻 Basic Example

### Basic Context

```typescript
// app/contexts/ThemeContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
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
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### Using Context

```typescript
// app/layout.tsx
import { ThemeProvider } from './contexts/ThemeContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

// app/components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/app/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## 🔧 Advanced Example

### Multiple Contexts

```typescript
// app/contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const userData = await response.json()
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }
  
  const logout = () => {
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### Context with Reducer

```typescript
// app/contexts/CartContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id)
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
      const newItems = [...state.items, action.item]
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.id)
      return {
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    case 'UPDATE_QUANTITY':
      const quantityItems = state.items.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      )
      return {
        items: quantityItems,
        total: quantityItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

## 📋 Common Patterns

### Pattern 1: Simple Context
```typescript
const Context = createContext()
export function Provider({ children }) {
  const [value, setValue] = useState()
  return <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
}
```
**When to use**: Simple global state

### Pattern 2: Context with Reducer
```typescript
const [state, dispatch] = useReducer(reducer, initialState)
return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
```
**When to use**: Complex state logic

### Pattern 3: Multiple Contexts
```typescript
<ThemeProvider>
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
</ThemeProvider>
```
**When to use**: Multiple global states

## ⚠️ Common Mistakes

### Mistake 1: Not Providing Context
```typescript
// ❌ Wrong: Using context without provider
function Component() {
  const value = useContext(MyContext) // Error: No provider
}
```
**Why**: Context must be wrapped with Provider.

```typescript
// ✅ Correct: Wrap with provider
<MyProvider>
  <Component />
</MyProvider>
```

### Mistake 2: Creating Context in Component
```typescript
// ❌ Wrong: Context created in component
function Component() {
  const Context = createContext() // Recreated on every render
}
```
**Why**: Context should be created outside component.

```typescript
// ✅ Correct: Create outside component
const Context = createContext()
function Component() {
  // Use context
}
```

### Mistake 3: Not Handling Undefined
```typescript
// ❌ Wrong: No error handling
function useMyContext() {
  return useContext(MyContext) // Might be undefined
}
```
**Why**: Context might be undefined if used outside provider.

```typescript
// ✅ Correct: Handle undefined
function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

## ✨ Best Practices

1. **Create context outside components**: Avoid recreating context
2. **Custom hooks**: Create custom hooks for context
3. **Error handling**: Check if context exists
4. **Split contexts**: Don't put everything in one context
5. **Optimize renders**: Use memo for expensive computations
6. **Type safety**: Use TypeScript for type safety

## 🔗 Related Concepts

- [Zustand](./zustand.md) - Lightweight state management
- [Redux](./redux.md) - Complex state management
- [Client Components](../03-app-router/client-components.md) - Client-side components

## 📚 Resources

### Official Documentation
- [React Context](https://react.dev/reference/react/createContext)

## 🧪 Practice Exercises

### Exercise 1: Basic Context
**Difficulty**: Beginner  
**Goal**: Understand Context API  
**Instructions**:
1. Create a context
2. Set up provider
3. Use context in components
4. Test state sharing

### Exercise 2: Context with Reducer
**Difficulty**: Intermediate  
**Goal**: Practice complex state  
**Instructions**:
1. Create context with reducer
2. Implement actions
3. Use in components
4. Test state updates

## 🎓 Key Takeaways

- Context API is built into React
- Use for global state sharing
- Avoid prop drilling
- Create context outside components
- Use custom hooks for context
- Handle undefined context

## ❓ FAQ

### Q: When should I use Context?
**A**: Use for global state that needs to be shared across many components.

### Q: Can I use Context in Server Components?
**A**: No, Context only works in Client Components.

### Q: How do I avoid re-renders?
**A**: Split contexts, use memo, and optimize provider values.

### Q: Can I have multiple contexts?
**A**: Yes, you can nest multiple context providers.

### Q: Should I use Context for all state?
**A**: No, use local state when possible, Context for global state.

---

**Next Steps**: 
- Review: [Zustand](./zustand.md) for simpler state management
- Practice: Create contexts for your app
- Build: Manage global state with Context

