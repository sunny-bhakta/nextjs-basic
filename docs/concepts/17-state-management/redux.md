# Redux

> **Category**: Intermediate | **Related Concepts**: [Zustand](./zustand.md), [React Context](./react-context.md)  
> **Last Updated**: 2024

## 📖 Overview

Redux is a popular state management library for complex applications. It provides predictable state updates through actions and reducers, with excellent DevTools support.

**Key Points:**
- Predictable state updates
- Centralized state
- Time-travel debugging
- Middleware support
- Large ecosystem
- TypeScript support

## 🎯 When to Use

- **Complex State**: When state is complex
- **Large Apps**: When building large applications
- **Predictable Updates**: When you need predictable updates
- **DevTools**: When you need debugging tools
- **Team Standards**: When team uses Redux
- **Middleware**: When you need middleware

## 💻 Basic Example

### Basic Setup

```typescript
// app/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// app/store/slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

### Using Redux

```typescript
// app/providers.tsx
'use client'

import { Provider } from 'react-redux'
import { store } from './store/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

// app/components/Counter.tsx
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/app/store/slices/counterSlice'
import type { RootState } from '@/app/store/store'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}
```

## 🔧 Advanced Example

### Async Actions

```typescript
// app/store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const res = await fetch('/api/users')
    return res.json()
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

export default userSlice.reducer
```

### Typed Hooks

```typescript
// app/store/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Usage
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'

export default function Component() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  // Fully typed
}
```

## 📋 Common Patterns

### Pattern 1: Basic Slice
```typescript
const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: {...}
})
```
**When to use**: Simple state

### Pattern 2: Async Thunk
```typescript
const fetchData = createAsyncThunk('feature/fetch', async () => {...})
```
**When to use**: Async operations

### Pattern 3: Typed Hooks
```typescript
const value = useAppSelector((state) => state.feature.value)
```
**When to use**: TypeScript projects

## ⚠️ Common Mistakes

### Mistake 1: Not Wrapping with Provider
```typescript
// ❌ Wrong: No Provider
function Component() {
  const count = useSelector(...) // Error
}
```
**Why**: Need Redux Provider.

```typescript
// ✅ Correct: Wrap with Provider
<Provider store={store}>
  <Component />
</Provider>
```

### Mistake 2: Mutating State
```typescript
// ❌ Wrong: Direct mutation (without Toolkit)
state.value++ // Mutates
```
**Why**: Redux requires immutable updates.

```typescript
// ✅ Correct: Redux Toolkit allows mutations
// Or return new state: { ...state, value: state.value + 1 }
```

### Mistake 3: Not Using Typed Hooks
```typescript
// ❌ Wrong: Not typed
const count = useSelector((state: any) => state.counter.value)
```
**Why**: Use typed hooks for type safety.

```typescript
// ✅ Correct: Typed hooks
const count = useAppSelector((state) => state.counter.value)
```

## ✨ Best Practices

1. **Use Redux Toolkit**: Modern Redux with less boilerplate
2. **Typed hooks**: Use typed hooks for TypeScript
3. **Slice pattern**: Organize by features
4. **Async thunks**: Use for async operations
5. **DevTools**: Use Redux DevTools
6. **Keep state minimal**: Only global state in Redux

## 🔗 Related Concepts

- [Zustand](./zustand.md) - Lightweight alternative
- [React Context](./react-context.md) - Built-in solution

## 📚 Resources

### Official Documentation
- [Redux Toolkit](https://redux-toolkit.js.org)

## 🧪 Practice Exercises

### Exercise 1: Basic Redux
**Difficulty**: Beginner  
**Goal**: Understand Redux basics  
**Instructions**:
1. Install Redux Toolkit
2. Create store and slice
3. Use in components
4. Test state updates

### Exercise 2: Async Actions
**Difficulty**: Intermediate  
**Goal**: Practice async operations  
**Instructions**:
1. Create async thunk
2. Handle loading/error states
3. Use in components
4. Test all states

## 🎓 Key Takeaways

- Redux is for complex state
- Use Redux Toolkit for less boilerplate
- Predictable state updates
- Excellent DevTools
- TypeScript support
- Large ecosystem

## ❓ FAQ

### Q: How do I install Redux?
**A**: Run `npm install @reduxjs/toolkit react-redux`.

### Q: Do I need Redux for all apps?
**A**: No, use for complex state. Consider simpler solutions first.

### Q: Can I use with TypeScript?
**A**: Yes, Redux Toolkit has excellent TypeScript support.

### Q: How do I handle async?
**A**: Use `createAsyncThunk` for async operations.

### Q: What's Redux Toolkit?
**A**: Modern Redux with less boilerplate and better DX.

---

**Next Steps**: 
- Review: [Zustand](./zustand.md) for simpler alternative
- Practice: Set up Redux
- Build: Manage complex state

