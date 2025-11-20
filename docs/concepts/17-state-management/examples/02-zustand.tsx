// Example 2: Zustand
// Demonstrates using Zustand for state management

// app/store/useCounterStore.ts - Counter store
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// app/store/useCartStore.ts - Cart store with persist
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
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

// app/components/Counter.tsx - Using counter store
'use client'

import { useCounterStore } from '@/app/store/useCounterStore'

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// app/components/Cart.tsx - Using cart store
'use client'

import { useCartStore } from '@/app/store/useCartStore'

export default function Cart() {
  const { items, removeItem, clearCart, getTotal } = useCartStore()
  
  return (
    <div>
      <h2>Cart</h2>
      <p>Total: ${getTotal()}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

// app/components/CountDisplay.tsx - Using selector
'use client'

import { useCounterStore } from '@/app/store/useCounterStore'

export default function CountDisplay() {
  // Only re-renders when count changes
  const count = useCounterStore((state) => state.count)
  
  return <p>Count: {count}</p>
}

