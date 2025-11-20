# Progressive Web App (PWA)

> **Category**: Advanced | **Related Concepts**: [Configuration](../31-configuration/README.md), [Plugins & Extensions](../32-plugins-extensions/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Progressive Web Apps (PWAs) combine the best of web and mobile apps, providing offline functionality, installability, and native app-like features in Next.js applications.

**Key Points:**
- Service workers for offline support
- Web app manifest for installability
- Caching strategies for performance
- Push notifications for engagement
- Background sync for data synchronization

## 🎯 When to Use

- **Offline Support**: Apps that need to work offline
- **Installability**: Making web apps installable
- **Performance**: Faster loading with caching
- **Engagement**: Push notifications
- **Mobile Experience**: Native app-like experience
- **Data Sync**: Background synchronization

## 💻 Basic Example

### next-pwa Setup

```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
})
```

### Manifest File

```json
// public/manifest.json
{
  "name": "My PWA",
  "short_name": "PWA",
  "description": "My Progressive Web App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Link Manifest

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🔧 Advanced Example

### Custom Service Worker

```typescript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/styles.css',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

### Install Prompt

```typescript
'use client'
import { useEffect, useState } from 'react'

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted install')
    }
    
    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (!showButton) return null

  return (
    <button onClick={handleInstall}>
      Install App
    </button>
  )
}
```

### Offline Detection

```typescript
'use client'
import { useEffect, useState } from 'react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="offline-banner">
      You are currently offline
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Cache First
```typescript
// Service worker
caches.match(request).then(response => {
  return response || fetch(request)
})
```
**When to use**: Static assets that don't change often

### Pattern 2: Network First
```typescript
// Service worker
fetch(request).catch(() => caches.match(request))
```
**When to use**: Dynamic content that needs to be fresh

### Pattern 3: Stale While Revalidate
```typescript
// Service worker
const cached = await caches.match(request)
const fetchPromise = fetch(request).then(response => {
  caches.open('v1').then(cache => cache.put(request, response.clone()))
  return response
})
return cached || fetchPromise
```
**When to use**: Balance between speed and freshness

## ⚠️ Common Mistakes

### Mistake 1: Not Testing Offline
```typescript
// ❌ Wrong: Not testing offline functionality
// Deploy without testing
```

```typescript
// ✅ Correct: Test offline mode
// Use Chrome DevTools > Application > Service Workers > Offline
```
**Why**: Offline functionality needs testing.

### Mistake 2: Caching Everything
```typescript
// ❌ Wrong: Cache everything
caches.open('v1').then(cache => cache.addAll(['*']))
```

```typescript
// ✅ Correct: Cache selectively
caches.open('v1').then(cache => {
  return cache.addAll([
    '/',
    '/styles.css',
    '/app.js',
  ])
})
```
**Why**: Too much caching uses storage and may serve stale content.

### Mistake 3: Not Updating Service Worker
```typescript
// ❌ Wrong: No update strategy
self.addEventListener('install', () => {
  self.skipWaiting()
})
```

```typescript
// ✅ Correct: Update strategy
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'v2') {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```
**Why**: Old caches can cause issues.

## ✨ Best Practices

1. **Use next-pwa**: Simplifies PWA setup
2. **Test offline**: Always test offline functionality
3. **Cache selectively**: Don't cache everything
4. **Update strategy**: Handle service worker updates
5. **Manifest icons**: Provide all required icon sizes
6. **Theme color**: Match app design
7. **Offline fallback**: Provide offline page
8. **Push notifications**: Get user permission first

## 🔗 Related Concepts

- [Configuration](../31-configuration/README.md) - Next.js configuration
- [Plugins & Extensions](../32-plugins-extensions/README.md) - next-pwa plugin

## 📚 Resources

### Official Documentation
- [PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Tools
- [next-pwa](https://github.com/shadowwalker/next-pwa) - PWA plugin
- [Workbox](https://developers.google.com/web/tools/workbox) - Service worker library

## 🎓 Key Takeaways

- Service workers enable offline functionality
- Manifest file makes apps installable
- Cache strategies balance speed and freshness
- Test offline functionality thoroughly
- Update service workers properly
- Provide offline fallback pages
- Get permission for push notifications

