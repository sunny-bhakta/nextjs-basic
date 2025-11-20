// Example 1: Service Worker
// Demonstrates service worker implementation for PWA

// ============================================
// Example 1: Basic Service Worker
// File: public/sw.js
// ============================================

/*
// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing')
  
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/styles.css',
        '/app.js',
      ])
    })
  )
  
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'v1') {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  return self.clients.claim()
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
*/

// ============================================
// Example 2: Cache First Strategy
// File: public/sw.js
// ============================================

/*
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) {
          return response
        }
        
        const responseToCache = response.clone()
        
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseToCache)
        })
        
        return response
      })
    })
  )
})
*/

// ============================================
// Example 3: Network First Strategy
// File: public/sw.js
// ============================================

/*
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseToCache = response.clone()
        
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseToCache)
        })
        
        return response
      })
      .catch(() => {
        return caches.match(event.request)
      })
  )
})
*/

// ============================================
// Example 4: Stale While Revalidate
// File: public/sw.js
// ============================================

/*
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('v1').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
        
        return cachedResponse || fetchPromise
      })
    })
  )
})
*/

// ============================================
// Example 5: Offline Fallback
// File: public/sw.js
// ============================================

/*
const CACHE_NAME = 'v1'
const OFFLINE_URL = '/offline'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        '/styles.css',
      ])
    })
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL)
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
  }
})
*/

// ============================================
// Example 6: Background Sync
// File: public/sw.js
// ============================================

/*
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  try {
    const requests = await getStoredRequests()
    
    for (const request of requests) {
      await fetch(request.url, {
        method: request.method,
        body: JSON.stringify(request.body),
        headers: request.headers,
      })
      
      await removeStoredRequest(request.id)
    }
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
*/

// ============================================
// Example 7: Service Worker Registration
// File: app/layout.tsx or app/components/ServiceWorker.tsx
// ============================================

'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}

