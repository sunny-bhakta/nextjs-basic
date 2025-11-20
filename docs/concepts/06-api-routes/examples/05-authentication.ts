// Example 5: Authentication
// Demonstrates securing API endpoints

// app/api/protected/route.ts - API Key authentication
function verifyApiKey(apiKey: string): boolean {
  return apiKey === process.env.API_KEY
}

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey || !verifyApiKey(apiKey)) {
    return Response.json(
      { error: 'Invalid API key' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData()
  return Response.json({ data })
}

// app/api/user/route.ts - JWT Token authentication
import { verify } from 'jsonwebtoken'

async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json(
      { error: 'Authorization required' },
      { status: 401 }
    )
  }
  
  const token = authHeader.substring(7)
  const user = await verifyToken(token)
  
  if (!user) {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
  
  const data = await getUserData((user as any).id)
  return Response.json({ data })
}

// app/api/session/route.ts - Cookie-based authentication
import { cookies } from 'next/headers'

async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')?.value
  
  if (!sessionId) {
    return null
  }
  
  const session = await getSessionFromDb(sessionId)
  return session
}

export async function GET(request: Request) {
  const session = await getSession()
  
  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const user = await getUser(session.userId)
  return Response.json({ user })
}

// app/lib/auth.ts - Authentication middleware pattern
export async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'No token provided', user: null }
  }
  
  const token = authHeader.substring(7)
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    const user = await getUserById((decoded as any).userId)
    
    if (!user) {
      return { error: 'User not found', user: null }
    }
    
    return { error: null, user }
  } catch (error) {
    return { error: 'Invalid token', user: null }
  }
}

// app/api/protected/route.ts - Using auth middleware
import { authenticateRequest } from '@/lib/auth'

export async function GET(request: Request) {
  const { error, user } = await authenticateRequest(request)
  
  if (error || !user) {
    return Response.json(
      { error: error || 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(user.id)
  return Response.json({ data })
}

// app/lib/auth.ts - Role-based authorization
export async function requireAuth(request: Request) {
  const { user, error } = await authenticateRequest(request)
  
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export function requireRole(user: any, role: string) {
  if (user.role !== role && user.role !== 'admin') {
    throw new Error('Forbidden')
  }
}

// app/api/admin/users/route.ts - Role-based access
import { requireAuth, requireRole } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request)
    requireRole(user, 'admin')
    
    const users = await getAllUsers()
    return Response.json({ users })
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 403 }
    )
  }
}

// app/lib/rate-limit.ts - Rate limiting with authentication
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  userId: string,
  limit: number = 100,
  window: number = 60000
) {
  const now = Date.now()
  const userLimit = rateLimitMap.get(userId)
  
  if (!userLimit || now > userLimit.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + window })
    return { allowed: true, remaining: limit - 1 }
  }
  
  if (userLimit.count >= limit) {
    return { allowed: false, remaining: 0 }
  }
  
  userLimit.count++
  return { allowed: true, remaining: limit - userLimit.count }
}

// app/api/data/route.ts - Rate limiting
import { authenticateRequest } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

export async function GET(request: Request) {
  const { user, error } = await authenticateRequest(request)
  
  if (error || !user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const rateLimit = checkRateLimit(user.id, 100, 60000)
  
  if (!rateLimit.allowed) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }
  
  const data = await getData()
  return Response.json({ data }, {
    headers: {
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    },
  })
}

