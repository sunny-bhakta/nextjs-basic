# State Management Examples

This directory contains practical code examples demonstrating state management in Next.js.

## Examples

### 1. React Context (`01-react-context.tsx`)
Demonstrates React Context API:
- Theme context
- Cart context with reducer
- Using contexts in components

### 2. Zustand (`02-zustand.tsx`)
Shows Zustand state management:
- Counter store
- Cart store with persist
- Using stores in components
- Selectors for optimization

### 3. React Query (`03-react-query.tsx`)
Demonstrates React Query:
- Query setup
- Basic queries
- Mutations
- Cache invalidation

### 4. SWR (`04-swr.tsx`)
Shows SWR data fetching:
- SWR config
- Basic queries
- Mutations
- Cache revalidation

### 5. Redux (`05-redux.tsx`)
Demonstrates Redux:
- Store setup
- Slices
- Typed hooks
- Using in components

## How to Use

1. **Install dependencies**:
   - Zustand: `npm install zustand`
   - React Query: `npm install @tanstack/react-query`
   - SWR: `npm install swr`
   - Redux: `npm install @reduxjs/toolkit react-redux`

2. **Copy code** from example files
3. **Create corresponding files** in your app
4. **Set up providers** in layout
5. **Test state management**

## Key Concepts

- React Context: Built-in, no dependencies
- Zustand: Lightweight, simple API
- React Query: Server state management
- SWR: Lightweight data fetching
- Redux: Complex state management

## Next Steps

- Review detailed guides in parent directory
- Choose appropriate solution for your needs
- Practice implementing state management

