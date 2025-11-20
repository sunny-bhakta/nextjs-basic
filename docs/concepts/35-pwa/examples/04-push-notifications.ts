// Example 4: Push Notifications
// Demonstrates push notification implementation

'use client'

// ============================================
// Example 1: Request Notification Permission
// File: components/NotificationButton.tsx
// ============================================

import { useState, useEffect } from 'react'

export function NotificationButton() {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications')
      return
    }

    const permission = await Notification.requestPermission()
    setPermission(permission)

    if (permission === 'granted') {
      console.log('Notification permission granted')
    }
  }

  if (permission === 'granted') {
    return <div>Notifications enabled</div>
  }

  return (
    <button onClick={requestPermission}>
      {permission === 'default' ? 'Enable Notifications' : 'Notifications Blocked'}
    </button>
  )
}

// ============================================
// Example 2: Show Local Notification
// File: lib/notifications.ts
// ============================================

export function showNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      ...options,
    })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, {
          icon: '/icon-192x192.png',
          ...options,
        })
      }
    })
  }
}

// Usage:
// showNotification('New message', {
//   body: 'You have a new message',
//   tag: 'message',
// })

// ============================================
// Example 3: Push Subscription
// File: lib/push-subscription.ts
// ============================================

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported')
    return null
  }

  if (!('PushManager' in window)) {
    console.warn('Push messaging not supported')
    return null
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
      ),
    })

    // Send subscription to server
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })

    return subscription
  } catch (error) {
    console.error('Error subscribing to push:', error)
    return null
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

// ============================================
// Example 4: Service Worker Push Handler
// File: public/sw.js
// ============================================

/*
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'New Notification'
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/icon-72x72.png',
    tag: data.tag || 'default',
    data: data.data || {},
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  )
})
*/

// ============================================
// Example 5: Push Notification API Route
// File: app/api/push/subscribe/route.ts
// ============================================

/*
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()

    // Store subscription in database
    // await db.subscriptions.create({ subscription })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
*/

// ============================================
// Example 6: Send Push Notification (Server)
// File: lib/send-push.ts (Server-side)
// ============================================

/*
import webpush from 'web-push'

// Configure VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendPushNotification(
  subscription: PushSubscription,
  payload: { title: string; body: string; data?: any }
) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload))
  } catch (error) {
    console.error('Error sending push notification:', error)
    throw error
  }
}
*/

// ============================================
// Example 7: Notification Actions
// File: public/sw.js
// ============================================

/*
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    )
  } else if (event.action === 'dismiss') {
    // Handle dismiss action
    console.log('Notification dismissed')
  } else {
    // Default action
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})
*/

