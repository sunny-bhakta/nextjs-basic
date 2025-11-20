# Zustand

> **Category**: Intermediate | **Related Concepts**: [React Context](./react-context.md), [Redux](./redux.md)  
> **Last Updated**: 2024

## 📖 Overview

Zustand is a lightweight state management library for React. It provides a simple API for managing global state without the boilerplate of Redux or Context API.

**Key Points:**
- Lightweight and simple
- No providers needed
- TypeScript support
- Easy to use
- Good performance
- Small bundle size

## 🎯 When to Use

- **Simple State**: When you need simple global state
- **Lightweight**: When you want minimal bundle size
- **Quick Setup**: When you want quick state management
- **No Boilerplate**: When you want less code
- **TypeScript**: When using TypeScript
- **Performance**: When you need good performance

## 💻 Basic Example

### Basic Store

```typescript
// app/store/useStore.ts
import { create } from 'zustand'

interface StoreState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### Using Store

```typescript
// app/components/Counter.tsx
'use client'

import { useStore } from '@/app/store/useStore'

export default function Counter() {
  const { count, increment, decrement, reset } = useStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### Selector Usage

```typescript
// app/components/CountDisplay.tsx
'use client'

import { useStore } from '@/app/store/useStore'

export default function CountDisplay() {
  // Only re-render when count changes
  const count = useStore((state) => state.count)
  
  return <p>Count: {count}</p>
}
```

## 🔧 Advanced Example

### Complex Store

```typescript
// app/store/useCartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)
```

### Multiple Stores

```typescript
// app/store/useAuthStore.ts
import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

// app/store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
)
```

## 📋 Common Patterns

### Pattern 1: Simple Store
```typescript
const useStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}))
```
**When to use**: Simple state

### Pattern 2: With Persist
```typescript
const useStore = create(persist((set) => ({...}), { name: 'storage' }))
```
**When to use**: When you need persistence

### Pattern 3: With Selectors
```typescript
const value = useStore((state) => state.value)
```
**When to use**: Optimize re-renders

## ⚠️ Common Mistakes

### Mistake 1: Not Using Selectors
```typescript
// ❌ Wrong: Re-renders on any state change
const { count, name } = useStore()
```
**Why**: Re-renders when any state changes.

```typescript
// ✅ Correct: Use selectors
const count = useStore((state) => state.count)
const name = useStore((state) => state.name)
```

### Mistake 2: Mutating State
```typescript
// ❌ Wrong: Direct mutation
increment: () => {
  state.count++ // Mutates state
}
```
**Why**: Zustand requires immutable updates.

```typescript
// ✅ Correct: Return new state
increment: () => set((state) => ({ count: state.count + 1 }))
```

### Mistake 3: Not Using Persist
```typescript
// ❌ Wrong: State lost on refresh
const useStore = create((set) => ({...}))
```
**Why**: Use persist middleware for persistence.

```typescript
// ✅ Correct: Use persist
const useStore = create(persist((set) => ({...}), { name: 'storage' }))
```

## ✨ Best Practices

1. **Use selectors**: Optimize re-renders with selectors
2. **Immutable updates**: Always return new state
3. **Split stores**: Create separate stores for different domains
4. **Use persist**: For state that should persist
5. **TypeScript**: Use TypeScript for type safety
6. **Keep stores simple**: Don't overcomplicate stores

## 🔗 Related Concepts

- [React Context](./react-context.md) - Built-in state management
- [Redux](./redux.md) - Complex state management

## 📚 Resources

### Official Documentation
- [Zustand](https://zustand-demo.pmnd.rs)

## 🧪 Practice Exercises

### Exercise 1: Basic Store
**Difficulty**: Beginner  
**Goal**: Understand Zustand basics  
**Instructions**:
1. Install Zustand
2. Create a store
3. Use in components
4. Test state updates

### Exercise 2: Complex Store
**Difficulty**: Intermediate  
**Goal**: Practice complex state  
**Instructions**:
1. Create complex store
2. Add persist middleware
3. Use selectors
4. Test persistence

## 🎓 Key Takeaways

- Zustand is lightweight and simple
- No providers needed
- Use selectors for optimization
- Immutable state updates
- Persist middleware for persistence
- TypeScript support

## ❓ FAQ

### Q: How do I install Zustand?
**A**: Run `npm install zustand`.

### Q: Do I need providers?
**A**: No, Zustand doesn't require providers.

### Q: How do I persist state?
**A**: Use the persist middleware from `zustand/middleware`.

### Q: Can I use with TypeScript?
**A**: Yes, Zustand has excellent TypeScript support.

### Q: How do I optimize re-renders?
**A**: Use selectors to subscribe to specific state slices.

---

**Next Steps**: 
- Review: [React Context](./react-context.md) for built-in solution
- Practice: Create stores with Zustand
- Build: Manage state in your application

