// Example 1: REST API Integration
// Demonstrates REST API client setup and usage

// ============================================
// Example 1: Basic API Client
// File: app/lib/api/client.ts
// ============================================

interface ApiClientConfig {
  baseURL: string
  headers?: Record<string, string>
}

class ApiClient {
  private baseURL: string
  private headers: Record<string, string>

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
})

// ============================================
// Example 2: API Client with Authentication
// File: app/lib/api/authenticated-client.ts
// ============================================

class AuthenticatedApiClient extends ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
  }

  private async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.token) {
      throw new Error('No authentication token')
    }

    return this.request<T>(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...options.headers
      }
    })
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.authenticatedRequest<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.authenticatedRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

export const authenticatedClient = new AuthenticatedApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || ''
})

// ============================================
// Example 3: API Service Layer
// File: app/lib/api/users.ts
// ============================================

interface User {
  id: string
  name: string
  email: string
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    return apiClient.get<User[]>('/users')
  },

  getById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`)
  },

  create: async (data: Omit<User, 'id'>): Promise<User> => {
    return apiClient.post<User>('/users', data)
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, data)
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`)
  }
}

// ============================================
// Example 4: Usage in Server Component
// File: app/users/page.tsx
// ============================================

import { usersApi } from '@/app/lib/api/users'

export default async function UsersPage() {
  try {
    const users = await usersApi.getAll()
    
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-4 border rounded">
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <p className="text-red-600">Failed to load users</p>
      </div>
    )
  }
}

// ============================================
// Example 5: Usage in Client Component
// File: app/components/UserList.tsx
// ============================================

'use client'

import { useEffect, useState } from 'react'
import { usersApi } from '@/app/lib/api/users'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await usersApi.getAll()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="p-4 border rounded">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </li>
      ))}
    </ul>
  )
}

