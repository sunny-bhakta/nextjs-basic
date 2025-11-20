// Example 4: Custom Server Setup
// Demonstrates custom Node.js server for Next.js

// ============================================
// Example 1: Basic Custom Server
// File: server.js
// ============================================

/*
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

// ============================================
// Example 2: Express Custom Server
// File: server.js
// ============================================

/*
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Custom API route
  server.get('/api/custom', (req, res) => {
    res.json({ message: 'Custom API route' })
  })

  // Custom middleware
  server.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`)
    next()
  })

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

// ============================================
// Example 3: Custom Server with WebSocket
// File: server.js
// ============================================

/*
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { WebSocketServer } = require('ws')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // WebSocket server
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected')
    
    ws.on('message', (message) => {
      console.log('Received:', message.toString())
      // Broadcast to all clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(message)
        }
      })
    })

    ws.on('close', () => {
      console.log('WebSocket client disconnected')
    })
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

// ============================================
// Example 4: TypeScript Custom Server
// File: server.ts
// ============================================

/*
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

// ============================================
// Example 5: Custom Server with Authentication
// File: server.js
// ============================================

/*
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const cookie = require('cookie')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Simple authentication check
function isAuthenticated(req) {
  const cookies = cookie.parse(req.headers.cookie || '')
  return !!cookies.authToken
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      
      // Protect /admin routes
      if (parsedUrl.pathname?.startsWith('/admin')) {
        if (!isAuthenticated(req)) {
          res.writeHead(302, { Location: '/login' })
          res.end()
          return
        }
      }
      
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

// ============================================
// Example 6: Custom Server with Rate Limiting
// File: server.js
// ============================================

/*
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Simple rate limiting
const rateLimit = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  const limit = rateLimit.get(ip)
  
  if (now > limit.resetTime) {
    limit.count = 1
    limit.resetTime = now + windowMs
    return true
  }
  
  if (limit.count >= maxRequests) {
    return false
  }
  
  limit.count++
  return true
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      
      // Check rate limit
      if (!checkRateLimit(ip)) {
        res.writeHead(429, { 'Content-Type': 'text/plain' })
        res.end('Too Many Requests')
        return
      }
      
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
*/

