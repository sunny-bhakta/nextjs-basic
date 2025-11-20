// Example 3: Shared Packages
// Demonstrates sharing code between apps in a monorepo

// ============================================
// Example 1: Shared UI Components
// File: packages/ui/components/Button.tsx
// ============================================

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant}`}
    >
      {children}
    </button>
  )
}

// File: packages/ui/index.ts
export { Button } from './components/Button'
export type { ButtonProps } from './components/Button'

// Usage in app:
// import { Button } from '@monorepo/ui'

// ============================================
// Example 2: Shared Utilities
// File: packages/utils/index.ts
// ============================================

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Usage in app:
// import { formatDate, formatCurrency, debounce } from '@monorepo/utils'

// ============================================
// Example 3: Shared Types
// File: packages/types/index.ts
// ============================================

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Usage in app:
// import type { User, Post, ApiResponse } from '@monorepo/types'

// ============================================
// Example 4: Shared Hooks
// File: packages/hooks/useLocalStorage.ts
// ============================================

'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue]
}

// Usage in app:
// import { useLocalStorage } from '@monorepo/hooks'

// ============================================
// Example 5: Shared API Client
// File: packages/api-client/index.ts
// ============================================

export class ApiClient {
  private baseURL: string
  
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
}

// Usage in app:
// import { ApiClient } from '@monorepo/api-client'
// const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '')

// ============================================
// Example 6: Shared Configuration
// File: packages/config/next.config.js
// ============================================

const sharedConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
}

module.exports = sharedConfig

// Usage in app:
// const sharedConfig = require('@monorepo/config/next.config.js')
// module.exports = {
//   ...sharedConfig,
//   // Add app-specific config
// }

