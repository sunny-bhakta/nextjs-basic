// Example 3: Offline Support
// Demonstrates offline functionality in PWA

'use client'

// ============================================
// Example 1: Offline Detection
// File: components/OfflineIndicator.tsx
// ============================================

import { useEffect, useState } from 'react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center">
      You are currently offline. Some features may be unavailable.
    </div>
  )
}

// ============================================
// Example 2: Offline Page
// File: app/offline/page.tsx
// ============================================

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">You are offline</h1>
      <p className="text-gray-600 mb-4">
        Please check your internet connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  )
}

// ============================================
// Example 3: Offline Data Storage
// File: lib/offline-storage.ts
// ============================================

export class OfflineStorage {
  private dbName = 'offlineDB'
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('requests')) {
          db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true })
        }
      }
    })
  }

  async storeRequest(request: any): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['requests'], 'readwrite')
      const store = transaction.objectStore('requests')
      const requestStore = store.add({
        ...request,
        timestamp: Date.now(),
      })

      requestStore.onsuccess = () => resolve()
      requestStore.onerror = () => reject(requestStore.error)
    })
  }

  async getStoredRequests(): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['requests'], 'readonly')
      const store = transaction.objectStore('requests')
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async clearStoredRequests(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['requests'], 'readwrite')
      const store = transaction.objectStore('requests')
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const offlineStorage = new OfflineStorage()

// ============================================
// Example 4: Offline-Aware API Client
// File: lib/offline-api.ts
// ============================================

import { offlineStorage } from './offline-storage'

export class OfflineApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    if (!navigator.onLine) {
      // Store request for later
      await offlineStorage.storeRequest({
        url: `${this.baseURL}${endpoint}`,
        method: options.method || 'GET',
        body: options.body,
        headers: options.headers,
      })

      throw new Error('Offline: Request queued for sync')
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options)
      return response
    } catch (error) {
      // Store request if network fails
      await offlineStorage.storeRequest({
        url: `${this.baseURL}${endpoint}`,
        method: options.method || 'GET',
        body: options.body,
        headers: options.headers,
      })

      throw error
    }
  }

  async syncStoredRequests(): Promise<void> {
    if (!navigator.onLine) return

    const requests = await offlineStorage.getStoredRequests()

    for (const request of requests) {
      try {
        await fetch(request.url, {
          method: request.method,
          body: request.body,
          headers: request.headers,
        })
        // Remove successful request
        // Implementation depends on your storage solution
      } catch (error) {
        console.error('Failed to sync request:', error)
      }
    }
  }
}

export const offlineApi = new OfflineApiClient(process.env.NEXT_PUBLIC_API_URL || '')

// ============================================
// Example 5: Offline Hook
// File: hooks/useOffline.ts
// ============================================

import { useEffect, useState } from 'react'

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// Usage:
// const isOnline = useOffline()
// if (!isOnline) {
//   return <OfflineMessage />
// }

