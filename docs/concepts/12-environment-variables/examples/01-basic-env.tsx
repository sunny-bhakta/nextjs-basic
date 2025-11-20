// Example 1: Basic Environment Variables
// Demonstrates using environment variables

// .env.local
// DATABASE_URL=postgresql://localhost:5432/mydb
// API_KEY=your-api-key-here
// NEXT_PUBLIC_APP_URL=http://localhost:3000

// app/api/data/route.ts - Server variables
export async function GET() {
  const apiKey = process.env.API_KEY
  const dbUrl = process.env.DATABASE_URL
  
  // Use server-only variables
  const data = await fetchData(apiKey, dbUrl)
  return Response.json({ data })
}

// app/components/ClientComponent.tsx - Client variables
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL
  
  return <div>API URL: {apiUrl}</div>
}

// lib/config.ts - Type-safe environment
export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL!,
  apiKey: process.env.API_KEY!,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Usage
import { config } from '@/lib/config'
const dbUrl = config.databaseUrl

