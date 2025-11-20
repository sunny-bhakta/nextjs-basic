# WebSockets & Real-time

> **Category**: Advanced | **Related Concepts**: [API Routes](../06-api-routes/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Real-time communication in Next.js enables bidirectional data flow between client and server. This is essential for features like chat, live updates, notifications, and collaborative editing.

**Key Points:**
- WebSocket for bidirectional communication
- Socket.io for easier WebSocket management
- Server-Sent Events for one-way server-to-client
- Real-time UI updates
- Connection management

## 🎯 When to Use

- **Chat Applications**: Real-time messaging
- **Live Updates**: Dashboard updates, notifications
- **Collaborative Features**: Real-time collaboration
- **Gaming**: Real-time game state
- **Monitoring**: Live metrics and logs

## 💻 Basic Example

### WebSocket API Route

```typescript
// app/api/ws/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const upgradeHeader = request.headers.get('upgrade')
  
  if (upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 })
  }

  // WebSocket handling would go here
  // Note: Next.js API routes don't directly support WebSockets
  // You'll need a separate WebSocket server or use Socket.io
}
```

### Socket.io Client

```typescript
// app/components/Chat.tsx
'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('message', (message: string) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      newSocket.close()
    }
  }, [])

  const sendMessage = (message: string) => {
    socket?.emit('message', message)
  }

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  )
}
```

## 🔧 Advanced Example

### Server-Sent Events

```typescript
// app/api/events/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      
      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      // Send events periodically
      const interval = setInterval(() => {
        sendEvent(JSON.stringify({ time: new Date().toISOString() }))
      }, 1000)

      // Cleanup on close
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
```

## 📋 Common Patterns

### Pattern 1: Socket.io Connection
```typescript
const socket = io('http://localhost:3001')
socket.on('event', handler)
socket.emit('event', data)
```
**When to use**: Bidirectional real-time communication

### Pattern 2: Server-Sent Events
```typescript
const eventSource = new EventSource('/api/events')
eventSource.onmessage = (event) => { /* handle */ }
```
**When to use**: One-way server-to-client updates

### Pattern 3: WebSocket with Reconnection
```typescript
let ws = new WebSocket(url)
ws.onclose = () => {
  setTimeout(() => { ws = new WebSocket(url) }, 1000)
}
```
**When to use**: Custom WebSocket with auto-reconnect

## ⚠️ Common Mistakes

### Mistake 1: Not Cleaning Up Connections
```typescript
// ❌ Wrong: Connection not closed
useEffect(() => {
  const socket = io()
  socket.on('message', handler)
}, [])
```

```typescript
// ✅ Correct: Clean up on unmount
useEffect(() => {
  const socket = io()
  socket.on('message', handler)
  return () => socket.close()
}, [])
```
**Why**: Open connections consume resources.

### Mistake 2: Multiple Connections
```typescript
// ❌ Wrong: New connection on every render
function Component() {
  const socket = io()
}
```

```typescript
// ✅ Correct: Single connection
useEffect(() => {
  const socket = io()
  return () => socket.close()
}, [])
```
**Why**: Multiple connections waste resources.

## ✨ Best Practices

1. **Use Socket.io**: Easier than raw WebSockets
2. **Clean up connections**: Close on unmount
3. **Handle reconnection**: Auto-reconnect logic
4. **Error handling**: Handle connection errors
5. **Rate limiting**: Prevent message spam
6. **Authentication**: Secure WebSocket connections
7. **Monitor connections**: Track active connections

## 🔗 Related Concepts

- [API Routes](../06-api-routes/README.md) - API route handlers
- [Server Components](../04-server-components/README.md) - Server-side logic

## 📚 Resources

### Official Documentation
- [Real-time Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### Libraries
- [Socket.io](https://socket.io/)
- [ws](https://github.com/websockets/ws)

## 🎓 Key Takeaways

- Use Socket.io for easier WebSocket management
- Clean up connections on component unmount
- Handle reconnection automatically
- Use Server-Sent Events for one-way updates
- Authenticate WebSocket connections
- Monitor and limit connections

