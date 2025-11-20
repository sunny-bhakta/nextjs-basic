// Example 2: Socket.io Integration
// Demonstrates Socket.io for real-time communication

'use client'

import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

// ============================================
// Example 1: Basic Socket.io Client
// ============================================

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
}

export default function SocketIOChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Connect to Socket.io server
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to server')
      setConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setConnected(false)
    })

    socket.on('message', (data: { user: string; message: string }) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          user: data.user,
          message: data.message,
          timestamp: new Date()
        }
      ])
    })

    socket.on('userJoined', (data: { user: string }) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          user: 'System',
          message: `${data.user} joined the chat`,
          timestamp: new Date()
        }
      ])
    })

    socket.on('userLeft', (data: { user: string }) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          user: 'System',
          message: `${data.user} left the chat`,
          timestamp: new Date()
        }
      ])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = () => {
    if (socketRef.current && input.trim() && username.trim()) {
      socketRef.current.emit('message', {
        user: username,
        message: input
      })
      setInput('')
    }
  }

  const joinChat = () => {
    if (username.trim() && socketRef.current) {
      socketRef.current.emit('join', { user: username })
    }
  }

  if (!username) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Join Chat</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                joinChat()
              }
            }}
          />
          <button
            onClick={joinChat}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Join
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      <div className="mb-4 flex items-center gap-2">
        <span className={`px-3 py-1 rounded text-sm ${
          connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
        <span className="text-gray-600">User: {username}</span>
      </div>
      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-semibold text-blue-600">{msg.user}:</span>
            <span className="ml-2">{msg.message}</span>
            <span className="ml-2 text-xs text-gray-500">
              {msg.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={sendMessage}
          disabled={!connected || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

// ============================================
// Example 2: Real-time Dashboard Updates
// ============================================

interface DashboardData {
  users: number
  orders: number
  revenue: number
}

export function RealtimeDashboard() {
  const [data, setData] = useState<DashboardData>({
    users: 0,
    orders: 0,
    revenue: 0
  })
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3001')

    socketRef.current = socket

    socket.on('dashboardUpdate', (newData: DashboardData) => {
      setData(newData)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Real-time Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold">{data.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-sm text-gray-600">Orders</p>
          <p className="text-2xl font-bold">{data.orders}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold">${data.revenue}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Socket.io Server Example (Separate Server)
// File: server/socket-server.ts
// ============================================

/*
import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', ({ user }) => {
    socket.data.user = user
    socket.broadcast.emit('userJoined', { user })
  })

  socket.on('message', (data) => {
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    if (socket.data.user) {
      socket.broadcast.emit('userLeft', { user: socket.data.user })
    }
  })
})

httpServer.listen(3001, () => {
  console.log('Socket.io server running on port 3001')
})
*/

