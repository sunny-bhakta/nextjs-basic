// Example 1: Basic WebSocket
// Demonstrates basic WebSocket implementation
//
// NOTE: Next.js API routes don't directly support WebSockets.
// You need a separate WebSocket server or use Socket.io.
// This example shows the pattern for a separate WebSocket server.

// ============================================
// Example 1: WebSocket Server (Separate Server)
// File: server/websocket-server.ts
// ============================================

/*
import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected')

  ws.on('message', (message: string) => {
    console.log('Received:', message)
    
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  // Send welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to server' }))
})
*/

// ============================================
// Example 2: WebSocket Client
// File: app/components/WebSocketClient.tsx
// ============================================

'use client'

import { useEffect, useState, useRef } from 'react'

interface Message {
  type: string
  content: string
  timestamp: Date
}

export default function WebSocketClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:3001')
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      setConnected(true)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages(prev => [
        ...prev,
        {
          type: data.type || 'message',
          content: data.message || data.content,
          timestamp: new Date()
        }
      ])
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setConnected(false)
      
      // Attempt to reconnect after 1 second
      setTimeout(() => {
        if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
          // Reconnect logic would go here
        }
      }, 1000)
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'message', content: message }))
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">WebSocket Client</h2>
      <div className="mb-4">
        <span className={`px-3 py-1 rounded text-sm ${
          connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto border p-4 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            <span className="text-gray-500">
              {msg.timestamp.toLocaleTimeString()}
            </span>
            <span className="ml-2">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              sendMessage(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={(e) => {
            const input = e.currentTarget.previousElementSibling as HTMLInputElement
            if (input.value) {
              sendMessage(input.value)
              input.value = ''
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}

