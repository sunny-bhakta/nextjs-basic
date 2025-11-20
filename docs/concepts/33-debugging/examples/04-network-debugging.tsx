// Example 4: Network Debugging
// Demonstrates debugging API calls and network requests

'use client'

// ============================================
// Example 1: Debug Fetch Wrapper
// File: lib/debug-fetch.ts
// ============================================

export async function debugFetch(url: string, options?: RequestInit) {
  const startTime = Date.now()
  const method = options?.method || 'GET'
  
  console.log(`[FETCH] ${method} ${url}`, {
    headers: options?.headers,
    body: options?.body,
  })
  
  try {
    const response = await fetch(url, options)
    const duration = Date.now() - startTime
    
    console.log(`[FETCH] ${response.status} ${method} ${url} (${duration}ms)`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })
    
    // Clone response to read body without consuming it
    const clonedResponse = response.clone()
    const data = await clonedResponse.json().catch(() => null)
    
    if (data) {
      console.log(`[FETCH] Response data:`, data)
    }
    
    return response
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[FETCH] Error ${method} ${url} (${duration}ms):`, error)
    throw error
  }
}

// ============================================
// Example 2: Network Interceptor Component
// File: components/NetworkDebugger.tsx
// ============================================

import { useEffect } from 'react'

export function NetworkDebugger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    
    // Intercept fetch
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const [url, options] = args
      const startTime = Date.now()
      
      console.log(`[NETWORK] Request:`, {
        url,
        method: options?.method || 'GET',
        headers: options?.headers,
      })
      
      try {
        const response = await originalFetch(...args)
        const duration = Date.now() - startTime
        
        console.log(`[NETWORK] Response:`, {
          url,
          status: response.status,
          duration: `${duration}ms`,
        })
        
        return response
      } catch (error) {
        const duration = Date.now() - startTime
        console.error(`[NETWORK] Error:`, {
          url,
          error,
          duration: `${duration}ms`,
        })
        throw error
      }
    }
    
    return () => {
      window.fetch = originalFetch
    }
  }, [])
  
  return null
}

// ============================================
// Example 3: API Client with Debugging
// File: lib/api-client.ts
// ============================================

class ApiClient {
  private baseURL: string
  private debug: boolean
  
  constructor(baseURL: string, debug = false) {
    this.baseURL = baseURL
    this.debug = debug || process.env.NODE_ENV === 'development'
  }
  
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const startTime = Date.now()
    
    if (this.debug) {
      console.log(`[API] ${options?.method || 'GET'} ${url}`, options)
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })
      
      const duration = Date.now() - startTime
      
      if (this.debug) {
        console.log(`[API] ${response.status} ${url} (${duration}ms)`)
      }
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }
      
      const data = await response.json()
      
      if (this.debug) {
        console.log(`[API] Response:`, data)
      }
      
      return data
    } catch (error) {
      const duration = Date.now() - startTime
      if (this.debug) {
        console.error(`[API] Error ${url} (${duration}ms):`, error)
      }
      throw error
    }
  }
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }
  
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '')

// ============================================
// Example 4: React Hook for API Debugging
// File: hooks/useApiDebug.ts
// ============================================

import { useEffect, useState } from 'react'

interface ApiCall {
  url: string
  method: string
  status?: number
  duration?: number
  error?: string
  timestamp: Date
}

export function useApiDebug() {
  const [calls, setCalls] = useState<ApiCall[]>([])
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const [url, options] = args
      const method = (options?.method || 'GET').toUpperCase()
      const startTime = Date.now()
      
      const call: ApiCall = {
        url: url.toString(),
        method,
        timestamp: new Date(),
      }
      
      setCalls(prev => [...prev, call])
      
      try {
        const response = await originalFetch(...args)
        const duration = Date.now() - startTime
        
        setCalls(prev =>
          prev.map(c =>
            c === call
              ? { ...c, status: response.status, duration }
              : c
          )
        )
        
        return response
      } catch (error) {
        const duration = Date.now() - startTime
        setCalls(prev =>
          prev.map(c =>
            c === call
              ? { ...c, error: (error as Error).message, duration }
              : c
          )
        )
        throw error
      }
    }
    
    return () => {
      window.fetch = originalFetch
    }
  }, [])
  
  return calls
}

// Usage in component:
// const apiCalls = useApiDebug()
// console.log('API calls:', apiCalls)

