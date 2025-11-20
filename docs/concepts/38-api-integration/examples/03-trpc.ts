// Example 3: tRPC Integration
// Demonstrates tRPC setup and usage

// ============================================
// Example 1: tRPC Router Setup
// File: server/routers/_app.ts
// ============================================

/*
import { router } from '../trpc'
import { usersRouter } from './users'
import { productsRouter } from './products'

export const appRouter = router({
  users: usersRouter,
  products: productsRouter
})

export type AppRouter = typeof appRouter
*/

// ============================================
// Example 2: tRPC Client Setup
// File: app/lib/trpc/client.ts
// ============================================

/*
import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@/server/routers/_app'

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc'
        })
      ]
    }
  }
})
*/

// ============================================
// Example 3: Using tRPC in Component
// File: app/components/UserListTRPC.tsx
// ============================================

/*
'use client'

import { trpc } from '@/app/lib/trpc/client'

export function UserListTRPC() {
  const { data, isLoading, error } = trpc.users.getAll.useQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  )
}
*/

