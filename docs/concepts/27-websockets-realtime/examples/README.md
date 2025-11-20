# WebSockets & Real-time Examples

This directory contains practical code examples demonstrating real-time communication in Next.js.

## Examples

### 1. Basic WebSocket (`01-websocket-basic.ts`)
Demonstrates basic WebSocket:
- WebSocket server setup
- Client connection
- Message handling

### 2. Socket.io Integration (`02-socketio-integration.tsx`)
Shows Socket.io integration:
- Socket.io client
- Real-time chat
- Connection management

### 3. Server-Sent Events (`03-server-sent-events.ts`)
Demonstrates Server-Sent Events:
- SSE API route
- Client EventSource
- Real-time updates

## How to Use

1. **Install dependencies**:
   ```bash
   npm install socket.io socket.io-client
   ```

2. **Set up WebSocket server**: Create separate server or use Socket.io

3. **Copy example code**: Adapt to your use case

4. **Test real-time features**: Open multiple clients

## Key Concepts

### WebSockets
- Bidirectional communication
- Full-duplex connection
- Low latency

### Socket.io
- Easier WebSocket management
- Auto-reconnection
- Room support

### Server-Sent Events
- One-way communication
- Server to client
- Simpler than WebSockets

## Best Practices

1. **Use Socket.io**: Easier management
2. **Clean up connections**: Close on unmount
3. **Handle reconnection**: Auto-reconnect
4. **Authenticate**: Secure connections
5. **Rate limit**: Prevent abuse

