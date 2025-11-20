// Example 3: Server-Sent Events
// Demonstrates Server-Sent Events for one-way real-time communication

// ============================================
// Example 1: SSE API Route
// File: app/api/events/route.ts
// ============================================

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"Connected to server"}\n\n'))

      // Send periodic updates
      const interval = setInterval(() => {
        const data = {
          type: 'update',
          timestamp: new Date().toISOString(),
          data: {
            users: Math.floor(Math.random() * 1000),
            orders: Math.floor(Math.random() * 100)
          }
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }, 2000)

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering in nginx
    },
  })
}

// ============================================
// Example 2: SSE Client Component
// File: app/components/SSEClient.tsx
// ============================================

'use client'

import { useEffect, useState } from 'react'

interface EventData {
  type: string
  timestamp?: string
  data?: any
  message?: string
}

export default function SSEClient() {
  const [events, setEvents] = useState<EventData[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const eventSource = new EventSource('/api/events')

    eventSource.onopen = () => {
      console.log('SSE connection opened')
      setConnected(true)
    }

    eventSource.onmessage = (event) => {
      try {
        const data: EventData = JSON.parse(event.data)
        setEvents(prev => [...prev, data])
      } catch (error) {
        console.error('Error parsing SSE data:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      setConnected(false)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Server-Sent Events</h2>
      <div className="mb-4">
        <span className={`px-3 py-1 rounded text-sm ${
          connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto border p-4 rounded bg-gray-50">
        {events.map((event, i) => (
          <div key={i} className="text-sm">
            <span className="font-semibold text-blue-600">{event.type}:</span>
            <span className="ml-2">
              {event.message || JSON.stringify(event.data)}
            </span>
            {event.timestamp && (
              <span className="ml-2 text-gray-500">
                ({new Date(event.timestamp).toLocaleTimeString()})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Example 3: Real-time Notifications
// File: app/api/notifications/route.ts
// ============================================

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Simulate notifications
      const notifications = [
        'New order received',
        'User signed up',
        'Payment processed',
        'Product updated'
      ]

      let notificationIndex = 0

      const interval = setInterval(() => {
        const notification = {
          type: 'notification',
          id: Date.now().toString(),
          message: notifications[notificationIndex % notifications.length],
          timestamp: new Date().toISOString()
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(notification)}\n\n`)
        )

        notificationIndex++
      }, 5000)

      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

// ============================================
// Example 4: Notification Component
// File: app/components/Notifications.tsx
// ============================================

'use client'

import { useEffect, useState } from 'react'

interface Notification {
  id: string
  message: string
  timestamp: string
}

export function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications')

    eventSource.onmessage = (event) => {
      const notification: Notification = JSON.parse(event.data)
      setNotifications(prev => [notification, ...prev].slice(0, 10)) // Keep last 10
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 w-80 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="p-4 bg-blue-600 text-white rounded shadow-lg"
        >
          <p>{notification.message}</p>
          <p className="text-xs text-blue-200 mt-1">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  )
}

